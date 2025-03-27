"use client";
import React from "react";
import { useParams } from "next/navigation";
import PostForm from "../_components/PostForm";
import { useAdminPost } from "../_hooks/useAdminPost";
import { useCategories } from "../../categories/_hooks/useCategories";
import { PostFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";

const EditPage = () => {
  const { token } = useSupabaseSession();
  const params = useParams();
  const postId = params.id as string;
  const { post, mutate: mutatePost } = useAdminPost(postId, token);
  const { categories } = useCategories(token);

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
      const response = await api.put(
        `/api/admin/posts/${postId}`,
        requestData,
        token
      );
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      mutatePost();
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  };

  return (
    <PostForm
      title="編集画面"
      post={post}
      categories={categories}
      postId={postId}
      isCreating={false}
      onSubmit={onSubmit}
      mutate={mutatePost}
      token={token}
    />
  );
};

export default EditPage;
