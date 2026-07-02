# astro-node-api-render

这是给 Render 免费部署准备的干净目录。

它只保留公网部署需要的文件，不包含：

- 本机 `launchd` 常驻文件
- 本机日志
- 本机启动脚本

## 需要的文件

- `package.json`
- `Dockerfile`
- `.dockerignore`
- `.env.example`
- `render.yaml`
- `src/`

## 本地测试

```bash
cd "/Users/yutong/Desktop/最珍贵的/命理报告/astro-node-api-render"
npm install
npm run test:chart
HOST=127.0.0.1 PORT=4318 npm start
```

## Render

把整个目录放进单独 Git 仓库，然后在 Render 里创建 Web Service 或 Blueprint。

部署成功后，把前端地址改成：

```text
https://mingli-app.yutongzhao.pages.dev/astrology/?astroApi=https://你的-render-域名
```
