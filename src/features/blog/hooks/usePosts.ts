"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/features/blog/lib/constants";
import { Post } from "@/features/blog/types/types";

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/posts`);
      const data = (await res.json()) as { posts: Post[] };
      setPosts(data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return { posts, loading };
}

export default usePosts;
