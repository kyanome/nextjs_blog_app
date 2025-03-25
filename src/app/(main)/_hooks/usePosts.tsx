"use client";
import { Post } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const usePosts = () => {
  const { data, error, isLoading } = useSWR("/api/posts", api.get);

  return {
    posts: data as Post[],
    error,
    isLoading,
  };
};
