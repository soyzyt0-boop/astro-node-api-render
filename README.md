# astro-node-api-render

这是占星 Node API 和 `mingxian-pages-app` Pages 前端的部署仓库。

## 目录

- 根目录：Render 上运行的 Node API
- `mingxian-pages-app/`：Cloudflare Pages 静态站点和 Functions

## Render API 需要的文件

- `package.json`
- `package-lock.json`
- `Dockerfile`
- `.dockerignore`
- `.env.example`
- `render.yaml`
- `src/`
- `ephe/`

## 本地测试 Render API

```bash
cd "/Users/yutong/Desktop/工作区/命理网站/命理分析网站/astro-node-api-render"
npm install
npm run test:chart
HOST=127.0.0.1 PORT=4318 npm start
```

## Render 部署

把整个仓库推到 GitHub，然后在 Render 里用 `render.yaml` 创建 Web Service。

默认接口路径：

- `POST /chart`
- `POST /bazi`
- `POST /geocode`
- `GET /health`

## Cloudflare Pages 部署

`mingxian-pages-app/` 目录用于 Pages。

至少确认这些配置：

- `ASTRO_API_BASE`：你的 Render 服务根地址，例如 `https://astro-node-api.onrender.com`
- `OPENAI_API_KEY`：如果要启用 OpenAI
- `OPENAI_MODEL`：默认是 `gpt-5.5-mini`
- `CF_AI_MODEL`：如果要走 Cloudflare AI
- `MINGXIAN_STORE`：KV 绑定
- `AI`：Cloudflare AI 绑定

`functions/api/astrochart.js` 会优先转发到 `ASTRO_API_BASE + /chart`。

如果前端需要绕过 Pages Functions，也可以直接带查询参数：

```text
https://你的-pages-域名/astrology/?astroApi=https://你的-render-域名
```
