# 🚀 从这里开始

欢迎使用菜谱分享平台！这是你的第一步指南。

## 📋 准备清单

在开始之前，确保你有：

- [ ] GitHub 账号
- [ ] Vercel 账号（用 GitHub 登录即可）
- [ ] Supabase 账号（免费）

**预计时间：10-15 分钟完成部署**

---

## 🎯 三种使用方式

### 方式 1：本地开发测试（最快）⚡

```bash
# 1. 去 Supabase 创建项目并运行 supabase/schema.sql

# 2. 创建环境变量文件
cp .env.local.example .env.local

# 3. 编辑 .env.local，填入你的 Supabase 信息
# 在 Supabase Dashboard → Settings → API 获取

# 4. 安装并运行（依赖已安装）
npm run dev
```

打开 http://localhost:3000 即可看到你的网站！

---

### 方式 2：部署到 Vercel（推荐）🌐

#### Step 1: 配置 Supabase（3分钟）

1. 访问 https://supabase.com
2. 创建新项目（选择离你最近的区域）
3. 进入 SQL Editor，点击 "+ New query"
4. 复制粘贴 `supabase/schema.sql` 的全部内容
5. 点击 Run
6. 去 Settings → API 复制：
   - **Project URL**
   - **anon public key**

#### Step 2: 推送到 GitHub（2分钟）

```bash
# 1. 在 GitHub 创建新仓库（不要初始化任何文件）
# 访问 https://github.com/new

# 2. 运行以下命令（替换你的用户名）
git remote add origin https://github.com/你的用户名/recipe-sharing-app.git
git push -u origin main
```

#### Step 3: 部署到 Vercel（3分钟）

1. 访问 https://vercel.com
2. 点击 "Add New..." → "Project"
3. 选择你的 GitHub 仓库 `recipe-sharing-app`
4. 添加环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL` = 你的 Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = 你的 anon key
5. 点击 "Deploy"
6. 等待 2-3 分钟
7. 访问生成的 URL

**🎉 完成！你的网站已上线！**

---

### 方式 3：查看详细文档 📚

如果遇到问题或需要更详细的说明：

- **DEPLOYMENT.md** - 完整部署指南（含截图说明）
- **QUICK_START.md** - 5分钟快速上手
- **README.md** - 项目功能介绍

---

## ✅ 部署后测试清单

1. [ ] 注册新账号
2. [ ] 发布一个菜谱（带图片）
3. [ ] 测试点赞功能
4. [ ] 添加评论
5. [ ] 收藏菜谱
6. [ ] 查看个人主页
7. [ ] 尝试随机推荐

---

## 🔧 常用命令

```bash
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run start     # 运行生产服务器
npm run lint      # 代码检查
```

---

## 🆘 遇到问题？

### 图片上传失败
→ 检查 Supabase Storage 中的 bucket 是否已创建
→ 确认 schema.sql 已完整运行

### 登录/注册失败
→ 检查环境变量是否正确设置
→ 查看浏览器控制台的错误信息

### 数据库操作失败
→ 确认所有表已创建（在 Supabase Table Editor 查看）
→ 检查 RLS policies 是否启用

### Vercel 部署失败
→ 确认环境变量名称正确（区分大小写）
→ 查看 Vercel 部署日志

---

## 🎨 自定义你的网站

### 修改品牌
- 编辑 `app/page.tsx` 修改首页内容
- 修改 `components/Navbar.tsx` 中的 logo 和名称

### 修改颜色
- Tailwind 配置在 `tailwind.config.ts`
- 主色调为 orange-600，可全局替换

### 添加功能
- 数据库表定义在 `supabase/schema.sql`
- 页面组件在 `app/` 目录
- 可重用组件在 `components/` 目录

---

## 📞 技术支持

- **Supabase 文档**: https://supabase.com/docs
- **Next.js 文档**: https://nextjs.org/docs
- **Vercel 文档**: https://vercel.com/docs
- **Tailwind 文档**: https://tailwindcss.com/docs

---

## 🌟 下一步

项目已经可以运行，现在你可以：

1. 部署到生产环境
2. 邀请朋友使用
3. 收集用户反馈
4. 添加新功能
5. 分享你的成果！

**祝你的菜谱网站大获成功！** 🍳👨‍🍳👩‍🍳
