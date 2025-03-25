"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category, Post } from "@/types";
import PostForm from "../_components/PostForm";

const EditPage = () => {
  const params = useParams();
  const postId = params.id as string;

  const { data: post } = useDataFetch<Post>(`admin/posts/${postId}`);
  const { data: allCategories } = useDataFetch<Category[]>(`admin/categories`);

  return (
    <PostForm
      title="編集画面"
      post={post}
      categories={allCategories}
      postId={postId}
      redirectPath="/admin/posts"
      isCreating={false}
    />
  );
};

export default EditPage;
