# 部署指南

本指南将帮助你一步步将菜谱分享平台部署到 Vercel。

## 📋 前置准备

1. **GitHub 账号** - 用于托管代码
2. **Vercel 账号** - 用于部署应用（可以用 GitHub 登录）
3. **Supabase 账号** - 用于数据库和存储

---

## 🗄️ 第一步：配置 Supabase

### 1.1 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 创建新组织（如果还没有）
4. 点击 "New Project"
5. 填写项目信息：
   - **Name**: recipe-sharing-app（或任意名称）
   - **Database Password**: 设置一个强密码（请记住！）
   - **Region**: 选择离你最近的区域（如 Singapore）
6. 点击 "Create new project"（等待 1-2 分钟）

### 1.2 获取 API 密钥

项目创建完成后：

1. 进入项目仪表板
2. 点击左侧菜单的 ⚙️ **Settings**
3. 点击 **API**
4. 复制以下信息：
   - **Project URL** (类似 https://xxx.supabase.co)
   - **anon public** key（一长串字符）

**保存这两个值，稍后会用到！**

### 1.3 创建数据库表

1. 点击左侧菜单的 **SQL Editor**
2. 点击 "+ New query"
3. 打开项目中的 `supabase/schema.sql` 文件
4. 复制所有内容
5. 粘贴到 SQL Editor
6. 点击右下角的 **Run** 按钮
7. 等待执行完成（应该显示 "Success"）

### 1.4 配置存储桶

SQL 已经自动创建了存储桶，但我们需要验证：

1. 点击左侧菜单的 **Storage**
2. 应该看到两个 bucket：
   - `recipe-images` - 菜谱图片
   - `avatars` - 用户头像
3. 如果没有，请重新运行 SQL 脚本

### 1.5 启用邮箱认证

1. 点击左侧菜单的 **Authentication**
2. 点击 **Providers**
3. 确保 **Email** 已启用
4. （可选）配置 SMTP 以发送确认邮件，或使用默认设置

**🎉 Supabase 配置完成！**

---

## 📦 第二步：推送代码到 GitHub

### 2.1 初始化 Git 仓库

在项目目录下运行：

```bash
cd recipe-sharing-app
git init
git add .
git commit -m "Initial commit: Recipe Sharing Platform"
```

### 2.2 创建 GitHub 仓库

1. 访问 [https://github.com/new](https://github.com/new)
2. 填写仓库信息：
   - **Repository name**: recipe-sharing-app
   - **Description**: A recipe sharing platform with social features
   - **Visibility**: Public 或 Private（根据需要选择）
3. **不要**勾选 "Initialize this repository with"（保持空白）
4. 点击 "Create repository"

### 2.3 推送代码

复制页面上显示的命令（类似下面）：

```bash
git remote add origin https://github.com/你的用户名/recipe-sharing-app.git
git branch -M main
git push -u origin main
```

**✅ 代码已上传到 GitHub！**

---

## 🚀 第三步：部署到 Vercel

### 3.1 导入项目

1. 访问 [https://vercel.com](https://vercel.com)
2. 使用 GitHub 登录
3. 点击 "Add New..." → "Project"
4. 在列表中找到 `recipe-sharing-app`
5. 点击 "Import"

### 3.2 配置环境变量

在 "Configure Project" 页面：

1. 展开 **Environment Variables**
2. 添加以下两个变量：

   **变量 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: 你的 Supabase Project URL（第一步保存的）

   **变量 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: 你的 Supabase anon key（第一步保存的）

3. 点击 "Add" 添加每个变量

### 3.3 部署

1. 保持其他设置为默认值
2. 点击 **Deploy**
3. 等待 2-3 分钟，Vercel 会：
   - 安装依赖
   - 构建应用
   - 部署到全球 CDN

### 3.4 访问你的应用

部署完成后：

1. 你会看到庆祝动画 🎉
2. 点击 **Visit** 或访问提供的 URL（类似 https://recipe-sharing-app-xxx.vercel.app）
3. **你的应用已经上线了！**

---

## ✅ 第四步：测试功能

### 4.1 注册账号

1. 访问你的应用
2. 点击 "注册"
3. 填写：
   - 用户名
   - 邮箱
   - 密码（至少 6 位）
4. 点击 "注册"

### 4.2 发布菜谱

1. 登录后点击 "+ 发布菜谱"
2. 填写菜谱信息：
   - 标题：例如 "宫保鸡丁"
   - 描述：简单介绍
   - 上传图片（可选）
   - 添加食材：例如 "鸡胸肉 300g"
   - 添加步骤：详细步骤
3. 点击 "发布菜谱"

### 4.3 测试社交功能

- ❤️ 点赞菜谱
- ⭐ 收藏菜谱
- 💬 发表评论
- 🎲 尝试随机推荐
- 👤 查看个人主页

---

## 🔄 更新应用

如果你修改了代码，只需：

```bash
git add .
git commit -m "你的更新说明"
git push
```

Vercel 会自动检测更新并重新部署！

---

## 🐛 常见问题

### 问题 1: 图片上传失败

**解决方案**:
- 检查 Supabase Storage 中的 bucket 是否已创建
- 确认 storage policies 已正确设置（运行 schema.sql）

### 问题 2: 数据库操作失败

**解决方案**:
- 检查所有数据库表是否已创建
- 在 Supabase 的 Table Editor 中验证
- 确认 Row Level Security (RLS) policies 已启用

### 问题 3: 登录/注册失败

**解决方案**:
- 检查 Supabase Authentication 是否启用
- 确认环境变量在 Vercel 中正确设置
- 检查浏览器控制台的错误信息

### 问题 4: 环境变量未生效

**解决方案**:
- 在 Vercel 项目设置中重新检查环境变量
- 确保变量名完全匹配（区分大小写）
- 重新部署项目（Vercel Dashboard → Deployments → 重新部署最新版本）

---

## 📚 相关链接

- **Supabase 文档**: https://supabase.com/docs
- **Vercel 文档**: https://vercel.com/docs
- **Next.js 文档**: https://nextjs.org/docs

---

## 🎉 完成！

恭喜你成功部署了菜谱分享平台！

现在你可以：
- 分享链接给朋友
- 收集用户反馈
- 添加更多功能
- 自定义样式和品牌

享受你的美食社区吧！ 🍳👨‍🍳👩‍🍳
