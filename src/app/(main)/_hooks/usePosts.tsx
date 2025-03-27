"use client";
import { useDataFetch } from "@/app/(main)/_hooks/useDataFetch";
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
