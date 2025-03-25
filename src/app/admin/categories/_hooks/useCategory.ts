"use client";
import { Category } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useCategory = (id: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/admin/categories/${id}`,
    api.get
  );

  return {
    category: data?.data as Category,
    error,
    isLoading,
  };
};
