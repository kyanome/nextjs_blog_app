"use client";
import { Post } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useAdminPost = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/posts/${id}`,
    api.get
  );

  return {
    post: data as Post,
    error,
    isLoading,
    mutate,
  };
};
