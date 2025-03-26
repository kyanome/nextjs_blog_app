"use client";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Post } from "@/types";

export const useAdminPosts = () => {
  const { data, error, isLoading, mutate } = useDataFetch("/api/admin/posts");

  return {
    posts: data as Post[],
    error,
    isLoading,
    mutate,
  };
};
