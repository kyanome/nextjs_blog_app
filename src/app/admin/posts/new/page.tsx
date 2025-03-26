"use client";
import React from "react";
import PostForm from "../_components/PostForm";
import { useCategories } from "../../categories/_hooks/useCategories";
import { PostFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import { usePosts } from "@/app/(main)/_hooks/usePosts";

const CreatePage = () => {
  const { categories } = useCategories();
  const { posts, mutate: mutatePosts } = usePosts();

  const onSubmit = async (data: PostFormValues) => {
    const requestData = {
      title: data.title,
      content: data.content,
      thumbnailUrl: data.thumbnailUrl,
      categories: data.categories.map((fv) => ({
        id: parseInt(fv),
      })),
    };
    try {
      const response = await api.post(`/api/admin/posts/`, requestData);
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const responsePostData = await response.json();
      mutatePosts([...posts, responsePostData], false);
      console.log("送信成功:", responsePostData);
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
