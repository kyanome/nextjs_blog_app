"use client";
import { Post } from "@/types";
import { useAdminDataFetch } from "../../_hooks/useAdminDataFetch";

export const useAdminPost = (id: string) => {
  const { data, error, isLoading, mutate } = useAdminDataFetch(
    `/api/admin/posts/${id}`
  );

  return {
    post: data as Post,
    error,
    isLoading,
    mutate,
  };
};
