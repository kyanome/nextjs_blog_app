"use client";

import usePosts from "@/features/blog/hooks/usePosts";
import { Post } from "@/features/blog/types/types";
import PostCard from "@/features/blog/components/PostCard";

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
