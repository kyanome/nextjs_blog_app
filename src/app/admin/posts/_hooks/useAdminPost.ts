"use client";
import { Post } from "@/types";
import { useAdminDataFetch } from "../../_hooks/useAdminDataFetch";

export const useAdminPost = (id: string, token: string | null) => {
  const { data, error, isLoading, mutate } = useAdminDataFetch(
    `/api/admin/posts/${id}`,
    token
  );

  return {
    post: data as Post,
    error,
    isLoading,
    mutate,
  };
};
