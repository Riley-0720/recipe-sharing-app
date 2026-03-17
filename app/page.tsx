import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">🍳 Recipe Hub</h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                登录
              </Link>
              <Link
                href="/auth/signup"
                className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
              >
                注册
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            发现并分享美味菜谱
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            加入我们的美食社区，探索来自世界各地的精彩食谱
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/recipes"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
            >
              浏览菜谱
            </Link>
            <Link
              href="/recipes/random"
              className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition"
            >
              随机推荐
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">分享菜谱</h3>
            <p className="text-gray-600">
              上传你的拿手好菜，与全世界分享你的烹饪技巧
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold mb-2">社交互动</h3>
            <p className="text-gray-600">
              点赞、评论、收藏你喜欢的菜谱，与其他美食爱好者交流
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎲</div>
            <h3 className="text-xl font-bold mb-2">随机发现</h3>
            <p className="text-gray-600">
              不知道做什么？让我们为你推荐一道随机菜谱
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">即将上线的功能</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>用户认证与个人资料</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>上传菜谱图片</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>详细的食材和步骤</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>点赞和评论系统</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>收藏夹功能</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>随机菜谱推荐</span>
            </li>
          </ul>
        </div>
      </main>

      <footer className="bg-white mt-16 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2026 Recipe Sharing Platform. Built with Next.js, Supabase & Vercel</p>
        </div>
      </footer>
    </div>
  );
}
