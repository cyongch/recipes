-- ============================================================
-- 食谱库 Supabase 建表脚本
-- 用法：Supabase 控制台 → SQL Editor → 粘贴全部 → Run
-- 执行一次即可，重复执行会报"已存在"，无副作用
-- ============================================================

create table if not exists public.recipes (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null default '其他',
  cover       text default '',
  time        text default '',
  difficulty  text default '',
  ingredients jsonb default '[]'::jsonb,   -- [{name, amount}, ...]
  steps       jsonb default '[]'::jsonb,   -- [步骤1, 步骤2, ...]
  tips        text default '',
  source      jsonb,                        -- {name, url} 或 null
  favorite    boolean default false,
  date        text default '',
  created_at  timestamptz default now()
);

-- ── 行级安全（RLS）──────────────────────────────
-- 家庭食谱库：放开匿名读写。anon key 前端公开是官方设计，
-- 若日后担心被人扫到 key 恶意写入，可再收紧（如要求登录）
alter table public.recipes enable row level security;

drop policy if exists "recipes_public_read"  on public.recipes;
drop policy if exists "recipes_public_write" on public.recipes;
drop policy if exists "recipes_public_delete" on public.recipes;

create policy "recipes_public_read"
  on public.recipes for select to anon using (true);

create policy "recipes_public_write"
  on public.recipes for insert to anon with check (true);

create policy "recipes_public_write"
  on public.recipes for update to anon using (true) with check (true);

create policy "recipes_public_delete"
  on public.recipes for delete to anon using (true);

-- ── 图片存储桶（步骤配图 / 封面上传）──────────────────
-- 公开桶：图片可直接通过 URL 访问
insert into storage.buckets (id, name, public)
values ('recipe-img', 'recipe-img', true)
on conflict (id) do nothing;

drop policy if exists "recipe_img_read"   on storage.objects;
drop policy if exists "recipe_img_insert" on storage.objects;
drop policy if exists "recipe_img_update" on storage.objects;
drop policy if exists "recipe_img_delete" on storage.objects;

create policy "recipe_img_read"
  on storage.objects for select to anon using (bucket_id = 'recipe-img');

create policy "recipe_img_insert"
  on storage.objects for insert to anon with check (bucket_id = 'recipe-img');

create policy "recipe_img_update"
  on storage.objects for update to anon using (bucket_id = 'recipe-img');

create policy "recipe_img_delete"
  on storage.objects for delete to anon using (bucket_id = 'recipe-img');
