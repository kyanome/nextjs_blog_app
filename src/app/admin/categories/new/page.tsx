"use client";
import React from "react";
import CategoryForm from "../_components/CategoryForm";
import { CategoryFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import { CategoryPostRequest } from "@/app/api/admin/categories/route";
import { useCategories } from "../_hooks/useCategories";

const CreatePage = () => {
  const { categories, mutate: mutateCategories } = useCategories();

  const onSubmit = async (data: CategoryFormValues) => {
    const requestData = { name: data.name };
    try {
      const response = await api.post<CategoryPostRequest>(
        `/api/admin/categories/`,
        requestData
      );
      const responseCategoryData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      mutateCategories([...categories, responseCategoryData], false);
      console.log("送信成功:", responseCategoryData);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <CategoryForm
      title="カテゴリー作成画面"
      isCreating={true}
      redirectPath="/admin/categories"
      onSubmit={onSubmit}
    />
  );
};

export default CreatePage;
