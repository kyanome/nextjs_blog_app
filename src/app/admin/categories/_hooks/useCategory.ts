"use client";
import { Category } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useCategory = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/categories/${id}`,
    api.getAdmin
  );

  return {
    category: data as Category,
    error,
    isLoading,
    mutate,
  };
};
