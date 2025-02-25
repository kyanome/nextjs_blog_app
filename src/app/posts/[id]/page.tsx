"use client";
import { useParams } from "next/navigation";
import usePost from "@/app/_hooks/usePost";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { post, loading } = usePost(id);

  if (loading) {
    return "読み込み中...";
  }
  if (!post) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <article>
      <img src={post.thumbnailUrl} alt={post.title} />
      <div className="mt-4 mb-2 mx-4">
        <div className="flex justify-between items-center">
          <time className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {post.categories.map((category) => (
              <span
                key={category}
                className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-2xl mt-2 mb-4">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}

export default PostDetail;
