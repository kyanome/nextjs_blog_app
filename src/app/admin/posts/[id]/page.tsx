"use client";
import React from "react";
import { useParams } from "next/navigation";
import PostForm from "../_components/PostForm";
import { useAdminPost } from "../_hooks/useAdminPost";
import { useCategories } from "../../categories/_hooks/useCategories";
import { PostFormValues } from "../../_utils/validation";
import api from "@/utils/api";

const EditPage = () => {
  const params = useParams();
  const postId = params.id as string;
  const { post, mutate: mutatePost } = useAdminPost(postId);
  const { categories } = useCategories();

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
      const response = await api.put(`/api/admin/posts/${postId}`, requestData);
      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      if (post) {
        const updatedPost = {
          ...post,
          title: data.title,
          content: data.content,
          thumbnailUrl: data.thumbnailUrl,
          PostCategory: data.categories.map((categoryId) => ({
            category: {
              id: parseInt(categoryId),
              name:
                categories?.find((c) => c.id === parseInt(categoryId))?.name ||
                "",
            },
          })),
        };
        mutatePost(updatedPost, false);
      }
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
      redirectPath="/admin/posts"
      isCreating={false}
      onSubmit={onSubmit}
    />
  );
};

export default EditPage;
