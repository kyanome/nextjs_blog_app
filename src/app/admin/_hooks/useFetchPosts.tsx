"use client";
import { Post } from "@/app/(main)/_types";
import { useEffect, useState } from "react";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/admin/posts/");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPost();
  }, []);
  return posts;
};
