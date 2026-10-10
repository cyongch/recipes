# 小池的食谱 🍳

个人食谱库 H5——手机随时翻看、随时加菜，多台设备实时同步。

**在线访问**：https://cyongch.github.io/recipes/

## 功能

- 📱 移动端优先：手机浏览器 / 微信内打开即用
- ➕ 手机直接加菜：表单录入（分类 / 时长 / 难度 / 食材 / 步骤 / 小贴士 / 来源链接）
- 🖼️ 步骤配图：每一步可单独配图，封面支持上传（存 Supabase Storage）
- 🔍 按食材搜索：输入"鸡翅""番茄"就能找到能做的菜
- 🏷️ 分类筛选 + "常做"标记置顶
- ✅ 食材清单可逐项勾选，买菜时当清单用
- ☁️ 多端同步：Supabase 云数据库，手机 / 电脑任一端增删改，其余端刷新即见
- 🔌 双模式容灾：云端未配置或连接失败时自动回退本机模式（localStorage），数据不丢

## 技术形态

零构建纯前端：`index.html` + `style.css` + `recipes.js`（种子数据）+ `config.js`（云端配置）。
无框架、无打包，双击 `index.html` 即可本地运行，直接托管在 GitHub Pages。

## 数据与后端

| 组件 | 说明 |
|---|---|
| Supabase 项目 | 数据库表 `recipes` + 图片存储桶 `recipe-img`，建表 SQL 见 `supabase-setup.sql` |
| config.js | 填入 `url` 和 `anonKey` 即启用云端（anon key 为前端公开设计，权限靠 RLS 控制） |
| 本机模式 | 未配置云端时的兜底，新增数据存 localStorage（key: `recipe_added` / `recipe_overrides`） |
| 保活任务 | `.github/workflows/keepalive.yml` 每 5 天 ping 一次 REST，防免费版闲置暂停（本地已备，待推） |

## 配置步骤（新环境复刻用）

1. 注册 [supabase.com](https://supabase.com)，新建项目（区域选 Singapore）
2. SQL Editor 中执行 `supabase-setup.sql` 全部内容
3. Project Settings → API，把 Project URL 和 anon key 填入 `config.js`
4. 推送到 GitHub 仓库并开启 Pages（Settings → Pages → main 分支 / 根目录）

## 数据结构

一道菜 = 一个对象，字段结构见 `recipes.js` 头部注释：

```js
{
  id: "hongshaorou",          // 云端模式为 uuid，本机模式为 "u" + 时间戳
  name: "红烧肉",
  category: "家常菜",          // 自由文本，页面自动生成分类按钮
  cover: "",                   // 网络链接 / images/xx.jpg / Storage URL
  time: "90分钟",
  difficulty: "中等",
  ingredients: [{ name: "五花肉", amount: "500g" }],
  steps: [                     // 纯文字字符串，或带图对象
    "切块焯水……",
    { text: "炒糖色……", img: "https://…/img_xxx.jpg" }
  ],
  tips: "宁欠勿过……",
  source: { name: "下厨房", url: "https://…" } | null,
  favorite: true,
  date: "2026-10-10"
}
```

## 更新方式

- 日常加菜：手机 / 电脑打开网页直接操作，无需碰代码
- 批量录入：把截图 / 链接 / 文字交给 AI 助手批量写入
- 改代码：提交到 main 分支后 Pages 自动重新发布
