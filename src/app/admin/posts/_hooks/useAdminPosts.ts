"use client";
import { Post } from "@/types";
import { useAdminDataFetch } from "../../_hooks/useAdminDataFetch";

export const useAdminPosts = (token: string | null) => {
  const { data, error, isLoading, mutate } = useAdminDataFetch(
    "/api/admin/posts",
    token
  );

  return {
    posts: data as Post[],
    error,
    isLoading,
    mutate,
  };
};
