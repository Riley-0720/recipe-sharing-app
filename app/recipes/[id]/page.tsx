"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;

  const [recipe, setRecipe] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // 获取菜谱详情
      const { data: recipeData, error: recipeError } = await supabase
        .from("recipes")
        .select(`
          *,
          profiles:user_id (username, avatar_url)
        `)
        .eq("id", recipeId)
        .single();

      if (recipeError || !recipeData) {
        console.error("Error fetching recipe:", recipeError);
        setLoading(false);
        return;
      }

      setRecipe(recipeData);

      // 获取点赞数
      const { data: likesData } = await supabase
        .from("likes")
        .select("id")
        .eq("recipe_id", recipeId);

      setLikesCount(likesData?.length || 0);

      // 检查当前用户是否点赞
      if (user) {
        const { data: userLike } = await supabase
          .from("likes")
          .select("id")
          .eq("recipe_id", recipeId)
          .eq("user_id", user.id)
          .single();

        setLiked(!!userLike);

        // 检查是否收藏
        const { data: userFavorite } = await supabase
          .from("favorites")
          .select("id")
          .eq("recipe_id", recipeId)
          .eq("user_id", user.id)
          .single();

        setFavorited(!!userFavorite);
      }

      // 获取评论
      const { data: commentsData } = await supabase
        .from("comments")
        .select(`
          *,
          profiles:user_id (username, avatar_url)
        `)
        .eq("recipe_id", recipeId)
        .order("created_at", { ascending: false });

      setComments(commentsData || []);
      setLoading(false);
    };

    fetchData();
  }, [recipeId]);

  const handleLike = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (liked) {
      // 取消点赞
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", user.id);

      if (!error) {
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    } else {
      // 点赞
      const { error } = await supabase
        .from("likes")
        .insert([{ recipe_id: recipeId, user_id: user.id }]);

      if (!error) {
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (favorited) {
      // 取消收藏
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", user.id);

      if (!error) {
        setFavorited(false);
      }
    } else {
      // 收藏
      const { error } = await supabase
        .from("favorites")
        .insert([{ recipe_id: recipeId, user_id: user.id }]);

      if (!error) {
        setFavorited(true);
      }
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!newComment.trim()) return;

    setSubmittingComment(true);

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            content: newComment,
            recipe_id: recipeId,
            user_id: user.id,
          },
        ])
        .select(`
          *,
          profiles:user_id (username, avatar_url)
        `)
        .single();

      if (!error && data) {
        setComments([data, ...comments]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

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

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">菜谱不存在</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          ← 返回
        </button>

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
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {recipe.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium">
                    作者: {recipe.profiles?.username || "匿名用户"}
                  </span>
                  <span>
                    {new Date(recipe.created_at).toLocaleDateString("zh-CN")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleLike}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    liked
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {liked ? "❤️" : "🤍"} {likesCount}
                </button>
                <button
                  onClick={handleFavorite}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    favorited
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {favorited ? "⭐" : "☆"} 收藏
                </button>
              </div>
            </div>

            <p className="text-gray-700 mb-8 text-lg">{recipe.description}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 食材</h2>
              <ul className="space-y-2 bg-orange-50 p-4 rounded-lg">
                {recipe.ingredients?.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                👨‍🍳 制作步骤
              </h2>
              <ol className="space-y-6">
                {recipe.steps?.map((step: string, index: number) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-600 text-white rounded-full font-bold text-lg">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-2 text-gray-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* 评论区 */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                💬 评论 ({comments.length})
              </h2>

              {user ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="写下你的评论..."
                  />
                  <button
                    type="submit"
                    disabled={submittingComment || !newComment.trim()}
                    className="mt-2 bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {submittingComment ? "发送中..." : "发送评论"}
                  </button>
                </form>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600">
                    <button
                      onClick={() => router.push("/auth/login")}
                      className="text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      登录
                    </button>
                    后可以发表评论
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">
                        {comment.profiles?.username || "匿名用户"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleString("zh-CN")}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    还没有评论，来发表第一条吧！
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
