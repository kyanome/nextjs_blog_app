"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category } from "@prisma/client";
import CategoryForm from "../_components/CategoryForm";

const EditPage = () => {
  const params = useParams();
  const categoryId = params.id as string;

  const { data: category, loading } = useDataFetch<Category>(
    `admin/categories/${categoryId}`
  );

  return (
    <CategoryForm
      title="編集画面"
      category={category}
      loading={loading}
      categoryId={categoryId}
      isCreating={false}
      redirectPath="/admin/categories"
    />
  );
};

export default EditPage;
