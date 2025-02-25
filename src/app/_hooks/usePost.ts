import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/app/_lib/constants";
import { Post } from "@/app/_types/index";

function usePost(id: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(
        `https://wn2kv4c10k.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };
    fetcher();
  }, [id]);

  return { post, loading };
}

export default usePost;
