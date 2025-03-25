"use client";
import React from "react";
import PostForm from "../_components/PostForm";
import { useCategories } from "../../categories/_hooks/useCategories";
import { PostFormValues } from "../../_utils/validation";
import api from "@/utils/api";

const CreatePage = () => {
  const { categories } = useCategories();

  const onSubmit = async (data: PostFormValues) => {
    const requestData = {
      title: data.title,
      content: data.content,
      thumbnailUrl: data.thumbnailUrl,
      categories: categories,
    };
    try {
      const response = await api.post(`/api/admin/posts/`, requestData);
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      console.log("送信成功:", await response.json());
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <PostForm
      title="記事作成画面"
      categories={categories}
      redirectPath="/admin"
      isCreating={true}
      onSubmit={onSubmit}
    />
  );
};

export default CreatePage;
