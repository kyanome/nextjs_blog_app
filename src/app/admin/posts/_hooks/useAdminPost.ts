"use client";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Post } from "@/types";

export const useAdminPost = (id: string) => {
  const { data, error, isLoading, mutate } = useDataFetch(
    `/api/admin/posts/${id}`
  );

  return {
    post: data as Post,
    error,
    isLoading,
    mutate,
  };
};
