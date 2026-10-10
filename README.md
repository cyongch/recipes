# 小池的食谱 🍳

个人食谱库 H5——手机随时翻看、随时加菜，多台设备实时同步。

**在线访问**：https://cyongch.github.io/recipes/

## 功能

- 📱 移动端优先：手机浏览器 / 微信内打开即用
- ➕ 手机直接加菜：表单录入（分类 / 时长 / 难度 / 食材 / 步骤 / 小贴士 / 来源链接）
- 🖼️ 步骤配图：每一步可单独配图，封面支持上传（手机照片自动压缩后存入仓库，jsDelivr CDN 加速）
- 🔍 按食材搜索：输入"鸡翅""番茄"就能找到能做的菜
- 🏷️ 分类筛选 + "常做"标记置顶
- ✅ 食材清单可逐项勾选，买菜时当清单用
- ☁️ 多端同步：GitHub 仓库即数据库，手机 / 电脑任一端增删改，其余端刷新即见
- 🔌 双模式容灾：云端未配置或连接失败时自动回退本机模式（localStorage），数据不丢

## 技术形态

零构建纯前端：`index.html` + `style.css` + `recipes.js`（种子数据）+ `config.js`（云端配置）。
无框架、无打包，双击 `index.html` 即可本地运行，直接托管在 GitHub Pages。

## 数据与后端

数据不依赖第三方 BaaS——**GitHub 仓库本身就是数据库**：

- 菜谱数据存 `data/recipes.json`，读写走 GitHub Contents API（`api.github.com` 国内可直连）
- 图片压缩后提交进 `images/` 目录，展示走 jsDelivr CDN
- 多端并发写入冲突时自动重读合并重试
- 每次改动都有 Git 提交历史，天然版本备份

| 组件 | 说明 |
|---|---|
| config.js | 填入 fine-grained token（仅授权本仓库 Contents 读写）即启用云端 |
| 本机模式 | 未配置云端时的兜底，新增数据存 localStorage（key: `recipe_added` / `recipe_overrides`），配好后自动迁移上云 |

## 配置步骤（新环境复刻用）

1. GitHub → Settings → Personal access tokens → Fine-grained tokens → 新建：
   Repository access 选 "Only select repositories" 勾选本仓库；Permissions → Contents 设 "Read and write"
2. 把 token 填入 `config.js` 的 `token` 字段
3. 推送到 GitHub 并开启 Pages（Settings → Pages → main 分支 / 根目录）

## 数据结构

一道菜 = 一个对象，字段结构见 `recipes.js` 头部注释：

```js
{
  id: "hongshaorou",          // GitHub 后端为 "r"+时间戳随机串，本机模式为 "u" 前缀
  name: "红烧肉",
  category: "家常菜",          // 自由文本，页面自动生成分类按钮
  cover: "",                   // 网络链接 / images/xx.jpg / jsDelivr CDN URL
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
