"use client";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Post } from "@/types";

export const usePosts = () => {
  const { data, error, isLoading, mutate } = useDataFetch("/api/posts");

  return {
    posts: data as Post[],
    error,
    isLoading,
    mutate,
  };
};
