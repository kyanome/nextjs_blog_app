"use client";
import React from "react";
import PostForm from "../_components/PostForm";
import { useCategories } from "../../categories/_hooks/useCategories";
import { PostFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { useAdminPosts } from "../_hooks/useAdminPosts";
import { supabase } from "@/utils/supabase";

const CreatePage = () => {
  const { token } = useSupabaseSession();
  const { categories } = useCategories(token);
  const { mutate: mutatePosts } = useAdminPosts(token);

  const onSubmit = async (values: PostFormValues) => {
    const requestData = {
      title: values.title,
      content: values.content,
      thumbnailUrl: values.thumbnailUrl,
      categories: values.categories.map((fv) => ({
        id: parseInt(fv),
      })),
    };
    try {
      const response = await api.post(`/api/admin/posts/`, requestData, token);
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const responsePostData = await response.json();
      mutatePosts();
      console.log("送信成功:", responsePostData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <PostForm
      title="記事作成画面"
      categories={categories}
      isCreating={true}
      onSubmit={onSubmit}
      mutate={mutatePosts}
      token={token}
    />
  );
};

export default CreatePage;
