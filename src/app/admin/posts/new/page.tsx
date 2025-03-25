"use client";
import React from "react";
import PostForm from "../_components/PostForm";
import { useCategories } from "../../categories/_hooks/useCategories";

const CreatePage = () => {
  const { categories } = useCategories();

  return (
    <PostForm
      title="記事作成画面"
      categories={categories}
      redirectPath="/admin"
      isCreating={true}
    />
  );
};

export default CreatePage;
