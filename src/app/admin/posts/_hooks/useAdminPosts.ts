"use client";
import { Post } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useAdminPosts = () => {
  const { data, error, isLoading } = useSWR("/api/admin/posts", api.get);

  return {
    posts: data?.data as Post[],
    error,
    isLoading,
  };
};
