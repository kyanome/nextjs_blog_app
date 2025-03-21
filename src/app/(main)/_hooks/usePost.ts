import { useState, useEffect } from "react";
import { Post } from "@/app/(main)/_types/index";

function usePost(id: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/posts/${id}`);
      const data = await res.json();
      console.log(data);
      setPost(data.post);
      setLoading(false);
    };
    fetcher();
  }, [id]);

  return { post, loading };
}

export default usePost;
