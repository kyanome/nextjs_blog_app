"use client";
import { Category } from "@/types";
import api from "@/utils/api";
import useSWR from "swr";

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/admin/categories",
    api.getAdmin
  );

  return {
    categories: data as Category[],
    error,
    isLoading,
    mutate,
  };
};
