"use client";

import PostCard from "./_components/PostCard";
import { Post } from "@/types";
import { usePosts } from "./_hooks/usePosts";

function Home() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return "読み込み中...";
  }

  if (!posts) {
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
