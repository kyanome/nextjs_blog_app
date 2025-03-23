"use client";

import { useState, useEffect } from "react";
import { Post } from "../_types";

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("https://wn2kv4c10k.microcms.io/api/v1/posts", {
        headers: {
          "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });
      const data = await res.json();
      setPosts(data.contents);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return { posts, loading };
}

export default usePosts;
