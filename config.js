/* ============================================================
 * 云端配置文件 —— 注册 Supabase 后填这里
 * ------------------------------------------------------------
 * 步骤：
 *   1. 打开 https://supabase.com 注册账号（邮箱注册即可）
 *   2. 新建项目（名字随意，如 recipe，区域选 Singapore/东京均可，
 *      密码自己设并记牢）
 *   3. 项目建好后，左侧 SQL Editor，把本目录 supabase-setup.sql
 *      的内容整段粘贴进去，点 Run 执行
 *   4. 左下角 Project Settings → API，找到两个值：
 *        Project URL       → 填到下面 url
 *        anon public key   → 填到下面 anonKey
 *   5. 保存本文件，刷新页面，顶栏出现"☁ 已同步"即成功
 *
 * 说明：
 *   - anon key 是设计为放在前端公开使用的，配合 SQL 里的行级
 *     权限(RLS)控制访问，不存在泄密问题。
 *   - 填好之前页面自动运行"仅本机"模式，不影响使用。
 *   - 免费版闲置 7 天会暂停，配套的 GitHub Actions 定时任务
 *     （.github/workflows/keepalive.yml）会自动保活。
 * ============================================================ */

var SB_CONFIG = {
  url: 'https://xmleosqnzeqrpdqfmhuq.supabase.co/rest/v1/',        // 形如 https://abcdefgh.supabase.co
  anonKey: 'sb_publishable_0C2wunx2l-TH4Iv0Za15og_FUDav52L'
};
