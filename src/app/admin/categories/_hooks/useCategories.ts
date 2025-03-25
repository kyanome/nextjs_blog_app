"use client";
import { Category } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useCategories = () => {
  const { data, error, isLoading } = useSWR("/api/admin/categories", api.get);

  return {
    categories: data as Category[],
    error,
    isLoading,
  };
};
