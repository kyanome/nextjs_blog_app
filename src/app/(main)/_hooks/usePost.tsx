"use client";
import { Post } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const usePost = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/posts/${id}`, api.get);

  return {
    post: data as Post,
    error,
    isLoading,
  };
};
