"use client";
import React from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category } from "@/types";
import PostForm from "../_components/PostForm";

const CreatePage = () => {
  const { data: allCategories } = useDataFetch<Category[]>(`admin/categories`);

  return (
    <PostForm
      title="記事作成画面"
      categories={allCategories}
      redirectPath="/admin"
      isCreating={true}
    />
  );
};

export default CreatePage;
