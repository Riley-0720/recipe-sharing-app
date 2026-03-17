"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function RandomRecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomRecipe = async () => {
    setLoading(true);
    try {
      // 获取所有菜谱的 ID
      const { data: recipes, error } = await supabase
        .from("recipes")
        .select("id");

      if (error || !recipes || recipes.length === 0) {
        setRecipe(null);
        return;
      }

      // 随机选择一个
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const randomId = recipes[randomIndex].id;

      // 获取完整数据
      const { data: fullRecipe, error: fullError } = await supabase
        .from("recipes")
        .select(`
          *,
          profiles:user_id (username, avatar_url),
          likes (id),
          comments (id)
        `)
        .eq("id", randomId)
        .single();

      if (!fullError && fullRecipe) {
        setRecipe(fullRecipe);
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-500">🎲 正在随机推荐...</div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            还没有菜谱
          </h2>
          <p className="text-gray-600 mb-6">快来发布第一个菜谱吧！</p>
          <button
            onClick={() => router.push("/recipes/new")}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            发布菜谱
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">🎲 随机推荐</h1>
          <button
            onClick={fetchRandomRecipe}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700"
          >
            再来一个
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {recipe.image_url ? (
            <div className="relative h-96 w-full">
              <Image
                src={recipe.image_url}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-96 w-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              <span className="text-9xl">🍽️</span>
            </div>
          )}

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h2>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="font-medium">
                作者: {recipe.profiles?.username || "匿名用户"}
              </span>
              <span>❤️ {recipe.likes?.length || 0} 赞</span>
              <span>💬 {recipe.comments?.length || 0} 评论</span>
            </div>

            <p className="text-gray-700 mb-6">{recipe.description}</p>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📝 食材</h3>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">👨‍🍳 制作步骤</h3>
              <ol className="space-y-4">
                {recipe.steps?.map((step: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-600 text-white rounded-full font-semibold">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => router.push(`/recipes/${recipe.id}`)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
              >
                查看详情
              </button>
              <button
                onClick={fetchRandomRecipe}
                className="border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50"
              >
                换一个
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
