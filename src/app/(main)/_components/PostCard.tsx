import { Post } from "@/types";
import Link from "next/link";

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block p-6 border border-gray-200 hover:border-gray-300 transition-colors bg-white"
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <time className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {post.PostCategory.map((pc) => (
              <span
                key={pc.category.id}
                className="inline-block px-3 py-1 text-xs text-blue-500 bg-blue-50 rounded"
              >
                {pc.category.name}
              </span>
            ))}
          </div>
        </div>
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </div>
      <div
        className="text-gray-600 text-sm line-clamp-2"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Link>
  );
}

export default PostCard;
