# Recipe Sharing Platform - 菜谱分享平台

一个功能完整的菜谱分享社区平台，使用 Next.js + Supabase + Vercel 构建。

## 功能特性

- ✅ 用户认证（注册、登录、登出）
- ✅ 发布菜谱（标题、描述、食材、步骤、图片）
- ✅ 浏览所有菜谱
- ✅ 随机推荐菜谱
- ✅ 收藏菜谱
- ✅ 点赞功能
- ✅ 评论系统
- ✅ 个人资料页面

## 技术栈

- **前端框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS
- **后端服务**: Supabase
  - PostgreSQL 数据库
  - Authentication
  - Storage (图片存储)
- **部署**: Vercel
- **语言**: TypeScript

## 快速开始

### 1. 克隆仓库

```bash
git clone <your-repo-url>
cd recipe-sharing-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Supabase

1. 访问 [Supabase](https://supabase.com) 创建项目
2. 复制 `.env.local.example` 为 `.env.local`
3. 填入你的 Supabase URL 和 Anon Key

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. 设置数据库

在 Supabase SQL Editor 中运行以下 SQL：

```sql
-- 见下方"数据库架构"部分
```

### 5. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 数据库架构

详见 `supabase/schema.sql` 文件。

主要表：
- `profiles` - 用户资料
- `recipes` - 菜谱
- `likes` - 点赞
- `favorites` - 收藏
- `comments` - 评论

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量（Supabase URL 和 Key）
4. 部署！

## 项目结构

```
recipe-sharing-app/
├── app/                  # Next.js App Router
│   ├── api/             # API 路由
│   ├── auth/            # 认证页面
│   ├── recipes/         # 菜谱相关页面
│   └── profile/         # 个人资料页面
├── components/          # React 组件
├── lib/                 # 工具函数和配置
├── public/              # 静态资源
└── supabase/            # Supabase 配置
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

ISC
