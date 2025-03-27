"use client";
import { Post } from "@/types";
import { useAdminDataFetch } from "../../_hooks/useAdminDataFetch";

export const useAdminPosts = () => {
  const { data, error, isLoading, mutate } =
    useAdminDataFetch("/api/admin/posts");

  return {
    posts: data as Post[],
    error,
    isLoading,
    mutate,
  };
};
