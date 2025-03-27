"use client";
import { useDataFetch } from "@/app/(main)/_hooks/useDataFetch";
import { Post } from "@/types";

export const usePost = (id: string) => {
  const { data, error, isLoading } = useDataFetch(`/api/posts/${id}`);

  return {
    post: data as Post,
    error,
    isLoading,
  };
};
