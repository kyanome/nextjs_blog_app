"use client";

import usePosts from "@/app/_hooks/usePosts";
import { Post } from "@/app/_types/index";
import PostCard from "@/app/_components/PostCard";

function PostList() {
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

export default PostList;
