# Zeabur 部署指南

本文档将指导您如何将此 Next.js 项目部署到 Zeabur 平台。

## 前置条件

1. 确保您有一个 [Zeabur](https://zeabur.com) 账户
2. 项目代码已推送到 GitHub 仓库
3. 已配置必要的环境变量

## 部署步骤

### 1. 准备项目

确保您的项目包含以下文件：
- `package.json` - 包含构建和启动脚本
- `next.config.mjs` - Next.js 配置文件
- `.env.example` - 环境变量示例文件

### 2. 推送代码到 GitHub

```bash
git add .
git commit -m "准备部署到 Zeabur"
git push origin main
```

### 3. 在 Zeabur 创建项目

1. 登录 [Zeabur Dashboard](https://dash.zeabur.com)
2. 点击 "New Project" 创建新项目
3. 选择 "Deploy from GitHub"
4. 授权 Zeabur 访问您的 GitHub 仓库
5. 选择您的项目仓库

### 4. 配置服务

1. Zeabur 会自动检测到这是一个 Next.js 项目
2. 确认以下配置：
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Port**: 3000

### 5. 配置环境变量

在 Zeabur 项目设置中添加以下环境变量：

#### 必需的环境变量：
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
```

#### 可选的环境变量：
```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
LOOPS_API_KEY=your_loops_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id
POSTGRES_URL=your_postgres_url
```

### 6. 部署

1. 点击 "Deploy" 按钮开始部署
2. Zeabur 将自动：
   - 安装依赖 (`npm install`)
   - 构建项目 (`npm run build`)
   - 启动应用 (`npm start`)

### 7. 访问应用

部署完成后，Zeabur 会提供一个公共 URL，您可以通过该 URL 访问您的应用。

## 自动部署

配置完成后，每次您向 GitHub 仓库推送代码时，Zeabur 都会自动重新部署您的应用。

## 故障排除

### 常见问题：

1. **构建失败**
   - 检查 `package.json` 中的脚本是否正确
   - 确保所有依赖都已正确安装

2. **环境变量问题**
   - 确保所有必需的环境变量都已设置
   - 检查环境变量的值是否正确

3. **启动失败**
   - 检查端口配置是否为 3000
   - 确保启动命令为 `npm start`

### 查看日志

在 Zeabur Dashboard 中，您可以查看：
- 构建日志
- 运行时日志
- 错误信息

## 域名配置

部署成功后，您可以：
1. 使用 Zeabur 提供的默认域名
2. 配置自定义域名（在项目设置中）

## 性能优化

为了获得最佳性能，建议：
1. 启用 Next.js 的图片优化
2. 配置适当的缓存策略
3. 使用 CDN 加速静态资源

## 监控和维护

- 定期检查应用性能
- 监控错误日志
- 及时更新依赖包

---

如果您在部署过程中遇到任何问题，请参考 [Zeabur 官方文档](https://zeabur.com/docs) 或联系技术支持。