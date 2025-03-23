"use client";

import PostCard from "./_components/PostCard";
import usePosts from "./_hooks/usePosts";
import { Post } from "./_types";

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
