"use client";

import { useState, useEffect } from "react";
import { Post } from "@/app/(main)/_types/index";

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return { posts, loading };
}

export default usePosts;
