"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [myRecipes, setMyRecipes] = useState<any[]>([]);
  const [myFavorites, setMyFavorites] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">("recipes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUser(user);

      // 获取用户资料
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      // 获取我的菜谱
      const { data: recipesData } = await supabase
        .from("recipes")
        .select(`
          *,
          likes (id),
          comments (id)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setMyRecipes(recipesData || []);

      // 获取我的收藏
      const { data: favoritesData } = await supabase
        .from("favorites")
        .select(`
          *,
          recipes (
            *,
            profiles:user_id (username),
            likes (id),
            comments (id)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setMyFavorites(favoritesData || []);
      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-500">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.username || "用户"}
                </h1>
                <p className="text-gray-500">{user?.email}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>📝 {myRecipes.length} 个菜谱</span>
                  <span>⭐ {myFavorites.length} 个收藏</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 标签页 */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab("recipes")}
                className={`py-4 px-2 font-medium border-b-2 transition ${
                  activeTab === "recipes"
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                我的菜谱 ({myRecipes.length})
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-2 font-medium border-b-2 transition ${
                  activeTab === "favorites"
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                我的收藏 ({myFavorites.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "recipes" && (
              <div>
                {myRecipes.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🍳</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      还没有发布菜谱
                    </h3>
                    <p className="text-gray-600 mb-6">分享你的拿手好菜吧！</p>
                    <Link
                      href="/recipes/new"
                      className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
                    >
                      发布菜谱
                    </Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRecipes.map((recipe) => (
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
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
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                            {recipe.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {recipe.description}
                          </p>

                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>❤️ {recipe.likes?.length || 0}</span>
                            <span>💬 {recipe.comments?.length || 0}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                {myFavorites.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">⭐</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      还没有收藏
                    </h3>
                    <p className="text-gray-600 mb-6">
                      收藏你喜欢的菜谱，方便随时查看
                    </p>
                    <Link
                      href="/recipes"
                      className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
                    >
                      浏览菜谱
                    </Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myFavorites.map((favorite) => {
                      const recipe = favorite.recipes;
                      if (!recipe) return null;

                      return (
                        <Link
                          key={favorite.id}
                          href={`/recipes/${recipe.id}`}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                              {recipe.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {recipe.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>
                                作者: {recipe.profiles?.username || "匿名"}
                              </span>
                              <div className="flex gap-4">
                                <span>❤️ {recipe.likes?.length || 0}</span>
                                <span>💬 {recipe.comments?.length || 0}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
