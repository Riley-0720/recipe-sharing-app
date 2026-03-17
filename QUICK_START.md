# 快速开始指南

## 🚀 5 分钟快速部署

### 第一步：Supabase（2 分钟）

1. 访问 [supabase.com](https://supabase.com) 创建项目
2. 在 SQL Editor 中运行 `supabase/schema.sql` 的内容
3. 复制 **Project URL** 和 **anon key**（Settings → API）

### 第二步：环境变量（30 秒）

创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_supabase_key
```

### 第三步：本地运行（1 分钟）

```bash
npm install
npm run dev
```

访问 http://localhost:3000

### 第四步：部署到 Vercel（2 分钟）

1. 推送到 GitHub:
   ```bash
   git remote add origin https://github.com/你的用户名/recipe-sharing-app.git
   git push -u origin main
   ```

2. 在 [vercel.com](https://vercel.com) 导入项目
3. 添加环境变量（同第二步）
4. 点击 Deploy

**完成！** 🎉

---

## 📱 核心功能

✅ 用户注册/登录
✅ 发布菜谱（图片+食材+步骤）
✅ 浏览所有菜谱
✅ 随机推荐
✅ 点赞 ❤️
✅ 评论 💬
✅ 收藏 ⭐
✅ 个人主页

---

## 🛠️ 技术栈

- **框架**: Next.js 16
- **数据库**: Supabase PostgreSQL
- **认证**: Supabase Auth
- **存储**: Supabase Storage
- **样式**: Tailwind CSS
- **部署**: Vercel
- **语言**: TypeScript

---

## 📖 详细文档

完整部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
