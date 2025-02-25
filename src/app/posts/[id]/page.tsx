"use client";
import { useParams } from "next/navigation";
import usePost from "@/app/_hooks/usePost";
import Image from "next/image";

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
      <Image
        src={post.thumbnail.url}
        alt={post.title}
        width={post.thumbnail.width}
        height={post.thumbnail.height}
        className="w-full h-auto"
      />
      <div className="mt-4 mb-2 mx-4">
        <div className="flex justify-between items-center">
          <time className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {post.categories.map((category) => (
              <span
                key={category.id}
                className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded"
              >
                {category.name}
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
