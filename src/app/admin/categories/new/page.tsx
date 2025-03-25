"use client";
import React from "react";
import CategoryForm from "../_components/CategoryForm";

const CreatePage = () => {
  return (
    <CategoryForm
      title="カテゴリー作成画面"
      isCreating={true}
      redirectPath="/admin/categories"
    />
  );
};

export default CreatePage;
