"use client";

import usePosts from "@/app/(main)/_hooks/usePosts";
import { Post } from "@/app/(main)/_types/index";
import PostCard from "@/app/(main)/_components/PostCard";

function Home() {
  const { posts, loading } = usePosts();

  if (loading) {
    return "読み込み中...";
  }

  if (!loading && !posts) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post: Post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
