/* ============================================================
 * 云端配置文件 —— GitHub 仓库即数据库
 * ------------------------------------------------------------
 * 数据存放在本仓库 data/recipes.json，读写走 GitHub API，
 * 国内可直连（api.github.com）。
 *
 * 需要一个"精细权限 token"（fine-grained PAT），创建步骤：
 *   1. 打开 https://github.com/settings/personal-access-tokens
 *      → Generate new token → Fine-grained
 *   2. Repository access 选 "Only select repositories" → 勾选 recipes
 *   3. Permissions → Repository permissions → Contents 设为
 *      "Read and write"（其它全部保持 No access）
 *   4. 生成后把 token（github_pat_ 开头）填到下面 token 的引号里
 *
 * 安全说明：该 token 只能读写 recipes 这一个仓库的内容，即使
 * 被人看到，最多也只能改你的菜谱，不影响任何其它仓库和账号。
 * 担心的话随时可在 GitHub 上吊销重生成。
 * ============================================================ */

var GH_CONFIG = {
  owner: 'cyongch',
  repo: 'recipes',
  branch: 'main',
  dataPath: 'data/recipes.json',   // 菜谱数据文件
  imgDir: 'images',                // 步骤/封面图片目录
  token: ''    // token 不入库！每台设备在网页上点击"📴 仅本机"角标输入一次即可
};
