"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import CategoryForm from "../_components/CategoryForm";

interface CategoryPostRequest {
  name: string;
}

const CreatePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formValues: CategoryFormValues) => {
    try {
      const response = await api.post<CategoryPostRequest>(
        `/api/admin/categories/`,
        { name: formValues.name }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("送信成功:", result);
      router.push("/admin/categories");
    } catch (error) {
      console.error("送信失敗:", error);
    } finally {
      console.log("フォーム送信完了");
    }
  };

  const handleCancel = () => {
    router.push("/admin/categories");
  };

  return (
    <CategoryForm
      title="カテゴリー作成画面"
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CreatePage;
