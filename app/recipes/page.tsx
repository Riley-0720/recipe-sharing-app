import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

// 禁用缓存，确保每次都获取最新数据
export const dynamic = 'force-dynamic';

async function getRecipes() {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles:user_id (username, avatar_url),
      likes (id),
      comments (id)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  return recipes || [];
}

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">所有菜谱</h1>
          <p className="text-gray-600 mt-2">探索美味佳肴</p>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🍳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              还没有菜谱
            </h3>
            <p className="text-gray-600 mb-6">成为第一个分享菜谱的人！</p>
            <Link
              href="/recipes/new"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
              发布菜谱
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe: any) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {recipe.image_url ? (
                  <div className="relative h-48 w-full bg-gray-200">
                    <Image
                      src={recipe.image_url}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                    <span className="text-6xl">🍽️</span>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {recipe.profiles?.username || "匿名用户"}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>❤️ {recipe.likes?.length || 0}</span>
                      <span>💬 {recipe.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
