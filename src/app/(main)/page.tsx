"use client";

import { useDataFetch } from "@/hooks/useDataFetch";
import PostCard from "./_components/PostCard";
import { Post } from "@/types";

function Home() {
  const { data: posts, loading } = useDataFetch<Post[]>(`/posts`);

  if (loading) {
    return "読み込み中...";
  }

  if (!loading && !posts) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
