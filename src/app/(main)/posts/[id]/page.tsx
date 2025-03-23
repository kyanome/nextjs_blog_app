"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Post } from "@/types";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: post, loading } = useDataFetch<Post>(`/posts/${id}`);

  if (loading) {
    return "読み込み中...";
  }
  if (!post) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <article>
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        width={640}
        height={480}
        className="w-full h-auto"
      />
      <div className="mt-4 mb-2 mx-4">
        <div className="flex justify-between items-center">
          <time className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {post.PostCategory.map((pc) => (
              <span
                key={pc.category.id}
                className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded"
              >
                {pc.category.name}
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
