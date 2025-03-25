"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";
import CategoryForm from "../_components/CategoryForm";
import { useCategory } from "../_hooks/useCategory";

const EditPage = () => {
  const params = useParams();
  const categoryId = params.id as string;
  const { category, isLoading } = useCategory(categoryId);

  return (
    <CategoryForm
      title="編集画面"
      category={category}
      loading={isLoading}
      categoryId={categoryId}
      isCreating={false}
      redirectPath="/admin/categories"
    />
  );
};

export default EditPage;
