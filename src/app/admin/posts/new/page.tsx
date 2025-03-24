"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category, CreatePostRequest } from "@/types";
import { PostFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import PostForm, { FormattedCategory } from "../_components/PostForm";

const CreatePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { data: allCategories, loading: isCategoriesLoading } =
    useDataFetch<Category[]>(`admin/categories`);

  const formattedCategories: FormattedCategory[] =
    allCategories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) || [];

  useEffect(() => {
    setIsLoading(isCategoriesLoading);
  }, [isCategoriesLoading]);

  const handleSubmit = async (formValues: PostFormValues) => {
    try {
      const categories = formValues.categories.map((fv) => ({
        id: parseInt(fv),
      }));

      const requestData: CreatePostRequest = {
        title: formValues.title,
        content: formValues.content,
        thumbnailUrl: formValues.thumbnailUrl,
        categories: categories,
      };

      const response = await api.post<CreatePostRequest>(
        `/api/admin/posts/`,
        requestData
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("送信成功:", result);
      router.push("/admin");
    } catch (error) {
      console.error("送信失敗:", error);
    } finally {
      console.log("フォーム送信完了");
    }
  };

  const handleCancel = () => {
    router.push("/admin/posts");
  };

  return (
    <PostForm
      title="記事作成画面"
      categories={formattedCategories}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CreatePage;
