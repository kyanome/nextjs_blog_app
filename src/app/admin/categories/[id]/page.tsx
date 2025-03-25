"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";
import CategoryForm from "../_components/CategoryForm";
import { useCategory } from "../_hooks/useCategory";
import { CategoryFormValues } from "../../_utils/validation";
import { CategoryUpdateRequest } from "@/app/api/admin/categories/[id]/route";
import api from "@/utils/api";

const EditPage = () => {
  const params = useParams();
  const categoryId = params.id as string;
  const { category, isLoading } = useCategory(categoryId);

  const onSubmit = async (data: CategoryFormValues) => {
    const requestData = { name: data.name };
    try {
      const response = await api.put<CategoryUpdateRequest>(
        `/api/admin/categories/${categoryId}`,
        requestData
      );
      console.log("Update successful:", await response.json());
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
    />
  );
};

export default EditPage;
