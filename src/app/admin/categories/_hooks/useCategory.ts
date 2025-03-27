"use client";
import { Category } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useCategory = (id: string, token: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    [`/api/admin/categories/${id}`, token],
    ([path, token]) => api.getAdmin(path, token)
  );

  return {
    category: data as Category,
    error,
    isLoading,
    mutate,
  };
};
