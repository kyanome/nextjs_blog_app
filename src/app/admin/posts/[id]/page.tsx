"use client";
import React from "react";
import { useParams } from "next/navigation";
import PostForm from "../_components/PostForm";
import { useAdminPost } from "../_hooks/useAdminPost";
import { useCategories } from "../../categories/_hooks/useCategories";

const EditPage = () => {
  const params = useParams();
  const postId = params.id as string;

  const { post } = useAdminPost(postId);
  const { categories } = useCategories();

  return (
    <PostForm
      title="編集画面"
      post={post}
      categories={categories}
      postId={postId}
      redirectPath="/admin/posts"
      isCreating={false}
    />
  );
};

export default EditPage;
