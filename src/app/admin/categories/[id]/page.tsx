"use client";
import React from "react";
import { useParams } from "next/navigation";
import CategoryForm from "../_components/CategoryForm";
import { useCategory } from "../_hooks/useCategory";
import { CategoryFormValues } from "../../_utils/validation";
import { CategoryUpdateRequest } from "@/app/api/admin/categories/[id]/route";
import api from "@/utils/api";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";

const EditPage = () => {
  const { token } = useSupabaseSession();
  const params = useParams();
  const categoryId = params.id as string;
  const {
    category,
    isLoading,
    mutate: mutateCategory,
  } = useCategory(categoryId, token);

  const onSubmit = async (data: CategoryFormValues) => {
    const requestData = { name: data.name };
    try {
      const response = await api.put<CategoryUpdateRequest>(
        `/api/admin/categories/${categoryId}`,
        requestData,
        token
      );
      console.log("Update successful:", await response.json());
      mutateCategory();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <CategoryForm
      title="編集画面"
      category={category}
      loading={isLoading}
      categoryId={categoryId}
      isCreating={false}
      redirectPath="/admin/categories"
      onSubmit={onSubmit}
      mutate={mutateCategory}
      token={token}
    />
  );
};

export default EditPage;
