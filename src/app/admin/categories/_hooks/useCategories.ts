"use client";
import { Category } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useCategories = (token: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["/api/admin/categories", token],
    ([path, token]) => api.getAdmin(path, token)
  );

  return {
    categories: data as Category[],
    error,
    isLoading,
    mutate,
  };
};
