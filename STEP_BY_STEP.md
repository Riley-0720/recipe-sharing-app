# 🎯 一步步部署指南（GitHub + Vercel + Supabase）

按照这个顺序操作，10-15 分钟完成部署！

---

## 📋 准备工作

### 需要的账号（都是免费的）：
- [ ] GitHub 账号 → https://github.com
- [ ] Vercel 账号 → https://vercel.com（用 GitHub 登录）
- [ ] Supabase 账号 → https://supabase.com

---

## 第 1 步：配置 Supabase（5 分钟）⭐ 最重要

### 1.1 创建 Supabase 项目

1. 访问 https://supabase.com
2. 点击右上角 **"Start your project"** 或 **"New project"**
3. 如果是第一次使用，需要先创建一个 Organization（组织名随意）
4. 填写项目信息：
   ```
   Name: recipe-sharing-app（或你喜欢的名字）
   Database Password: 设置一个强密码（记住它！）
   Region: 选择 Northeast Asia (Tokyo) 或 Southeast Asia (Singapore)
   ```
5. 点击 **"Create new project"**
6. 等待 1-2 分钟，项目创建完成

### 1.2 运行数据库 SQL（⚠️ 必须做）

这是最关键的一步！

1. 在 Supabase 项目页面，点击左侧菜单的 **"SQL Editor"**（看起来像 </> 图标）
2. 点击 **"+ New query"**
3. 打开本地项目的 `supabase/schema.sql` 文件
4. **复制全部内容**（大约 200 多行）
5. **粘贴到 Supabase 的 SQL Editor**
6. 点击右下角绿色的 **"Run"** 按钮
7. 等待几秒钟，应该显示 **"Success. No rows returned"**

✅ 成功后，数据库的 5 个表和 2 个存储桶都创建好了！

### 1.3 获取 API 密钥

1. 点击左侧菜单的 ⚙️ **"Settings"**
2. 点击 **"API"**
3. 找到并复制以下两个值（⚠️ 保存到记事本，待会要用）：

   ```
   Project URL:
   https://xxxxxxxxxxxxx.supabase.co

   anon public key:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...（一长串字符）
   ```

**✅ Supabase 配置完成！**

---

## 第 2 步：推送到 GitHub（2 分钟）

### 2.1 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   ```
   Repository name: recipe-sharing-app
   Description: A recipe sharing platform（可选）
   Visibility: Public 或 Private（都可以）
   ```
3. ⚠️ **不要勾选**以下选项（保持仓库为空）：
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
4. 点击 **"Create repository"**

### 2.2 推送代码

GitHub 会显示一个页面，找到 **"...or push an existing repository from the command line"** 部分。

在本地项目目录运行以下命令：

```bash
cd /Users/oneandatwo/recipe-sharing-app

# 添加远程仓库（替换你的用户名）
git remote add origin https://github.com/你的GitHub用户名/recipe-sharing-app.git

# 推送代码
git branch -M main
git push -u origin main
```

刷新 GitHub 页面，应该能看到所有文件了！

**✅ 代码已上传到 GitHub！**

---

## 第 3 步：部署到 Vercel（5 分钟）

### 3.1 导入项目

1. 访问 https://vercel.com
2. 点击右上角 **"Add New..."** → **"Project"**
3. 选择 **"Import Git Repository"**
4. 如果是第一次使用，需要授权 Vercel 访问你的 GitHub
5. 在列表中找到 **recipe-sharing-app**
6. 点击 **"Import"**

### 3.2 配置项目（重要！）

在配置页面：

1. **Framework Preset**: 应该自动识别为 "Next.js"
2. **Root Directory**: 保持默认 `./`
3. **Build and Output Settings**: 保持默认

### 3.3 添加环境变量（⚠️ 必须做）

找到 **"Environment Variables"** 部分，展开它。

添加以下两个环境变量（用第 1 步保存的值）：

**变量 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxxxxxxxxxx.supabase.co
```
点击 **"Add"**

**变量 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...（你的 anon key）
```
点击 **"Add"**

⚠️ 确保：
- 变量名**完全一致**（包括大小写）
- 值**没有多余的空格**

### 3.4 开始部署

1. 点击底部的 **"Deploy"** 按钮
2. Vercel 会开始构建和部署（2-3 分钟）
3. 你会看到构建日志实时滚动
4. 等待出现庆祝动画 🎉

### 3.5 访问你的网站

1. 点击 **"Visit"** 或直接访问 Vercel 提供的 URL
2. URL 类似：`https://recipe-sharing-app-xxx.vercel.app`

**✅ 网站已上线！**

---

## 第 4 步：测试功能（3 分钟）

### 4.1 注册账号

1. 点击右上角 **"注册"**
2. 填写信息：
   ```
   用户名: 至少 3 个字符
   邮箱: 你的邮箱
   密码: 至少 6 个字符
   ```
3. 点击 **"注册"**
4. 应该跳转到登录页面，显示 "注册成功"

### 4.2 登录

1. 用刚才的邮箱和密码登录
2. 成功后会跳转到菜谱列表页

### 4.3 发布第一个菜谱

1. 点击右上角 **"+ 发布菜谱"**
2. 填写菜谱信息：
   ```
   标题: 宫保鸡丁
   描述: 经典川菜，香辣可口
   食材:
   - 鸡胸肉 300g
   - 花生米 100g
   - 干辣椒 适量
   步骤:
   1. 鸡肉切丁，腌制 10 分钟
   2. 热油炒花生米
   3. 炒鸡丁至变色
   ```
3. （可选）上传一张图片
4. 点击 **"发布菜谱"**

### 4.4 测试社交功能

- ❤️ 点赞菜谱
- ⭐ 收藏菜谱
- 💬 发表评论
- 🎲 尝试"随机推荐"
- 👤 查看"我的主页"

**✅ 所有功能都正常工作！**

---

## 🎉 完成！

你的菜谱分享平台已经上线了！

### 你的网站地址：
```
https://你的项目名.vercel.app
```

### 现在你可以：
- ✅ 分享链接给朋友
- ✅ 收集用户反馈
- ✅ 继续添加功能
- ✅ 自定义样式

---

## 🔄 后续更新

### 如果你修改了代码

1. 提交更改：
   ```bash
   git add .
   git commit -m "你的更新说明"
   git push
   ```

2. Vercel 会**自动检测并重新部署**
3. 等待 2-3 分钟，新版本就上线了

### 如果需要修改环境变量

1. 访问 Vercel Dashboard
2. 进入你的项目
3. 点击 **"Settings"** → **"Environment Variables"**
4. 修改或添加变量
5. 重新部署（Deployments → Redeploy）

---

## 🐛 遇到问题？

### 问题 1: SQL 执行失败

**症状**: Supabase SQL Editor 显示错误

**解决方案**:
- 确保复制了完整的 schema.sql 内容
- 分段执行（先执行表创建部分，再执行 policies 部分）
- 检查是否有语法错误

### 问题 2: Vercel 构建失败

**症状**: 部署时显示 "Build failed"

**解决方案**:
- 检查环境变量是否正确添加
- 变量名是否完全一致（区分大小写）
- 查看构建日志定位具体错误

### 问题 3: 登录/注册失败

**症状**: 点击注册或登录后报错

**解决方案**:
- 打开浏览器控制台（F12）查看错误
- 检查 Supabase 中的 profiles 表是否创建
- 确认 schema.sql 完整运行

### 问题 4: 图片上传失败

**症状**: 上传图片时报错

**解决方案**:
- 检查 Supabase Storage 中是否有 recipe-images bucket
- 确认 storage policies 已创建
- 在 Supabase Storage 页面查看错误日志

### 问题 5: 环境变量未生效

**症状**: 网站无法连接数据库

**解决方案**:
- 在 Vercel 项目设置中再次检查环境变量
- 确保变量名以 `NEXT_PUBLIC_` 开头
- 重新部署项目

### 问题 6: 数据库操作失败

**症状**: 无法创建、读取或更新数据

**解决方案**:
- 在 Supabase Table Editor 中检查表是否存在
- 查看 RLS (Row Level Security) 是否启用
- 在 Supabase Logs 中查看具体错误

---

## 📞 获取帮助

### 检查日志
- **Vercel**: 项目 → Deployments → 点击最新部署 → 查看日志
- **Supabase**: 项目 → Logs & Analytics
- **浏览器**: F12 → Console（控制台）

### 官方文档
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs

---

## ✅ 检查清单

部署完成后，确认以下项目：

- [ ] Supabase 项目已创建
- [ ] schema.sql 已完整运行
- [ ] API 密钥已获取
- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] Vercel 项目已创建
- [ ] 环境变量已正确配置
- [ ] 网站已成功部署
- [ ] 可以注册新账号
- [ ] 可以发布菜谱
- [ ] 可以上传图片
- [ ] 点赞功能正常
- [ ] 评论功能正常
- [ ] 收藏功能正常

全部打勾？**恭喜你，部署成功！** 🎉

---

## 🎁 额外提示

### 自定义域名（可选）

1. 在 Vercel 项目设置中
2. 点击 **"Domains"**
3. 添加你的自定义域名
4. 按照提示配置 DNS

### 监控和分析

Vercel 提供免费的：
- 访问统计
- 性能监控
- 错误跟踪

在 Vercel Dashboard 中查看

### 定期备份

Supabase 自动备份数据库，但建议：
- 定期导出重要数据
- 保存 schema.sql 文件
- 版本控制所有代码

---

**祝你部署顺利！** 🚀
