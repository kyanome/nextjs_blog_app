"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category, Post, UpdatePostRequest } from "@/types";
import { PostFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import PostForm, { FormattedCategory } from "../_components/PostForm";

const EditPage = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<PostFormValues>({
    title: "",
    content: "",
    thumbnailUrl: "",
    categories: [],
  });

  const { data: post, loading: isPostLoading } = useDataFetch<Post>(
    `admin/posts/${postId}`
  );
  const { data: allCategories, loading: isCategoriesLoading } =
    useDataFetch<Category[]>(`admin/categories`);

  const formattedCategories: FormattedCategory[] =
    allCategories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) || [];

  useEffect(() => {
    if (!post) return;
    setInitialValues({
      title: post.title || "",
      content: post.content || "",
      thumbnailUrl: post.thumbnailUrl || "",
      categories:
        post.PostCategory?.map((pc) => pc.category.id.toString()) || [],
    });
  }, [post]);

  useEffect(() => {
    setIsLoading(isPostLoading || isCategoriesLoading);
  }, [isPostLoading, isCategoriesLoading]);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/admin/posts/${postId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push("/admin/posts");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmit = async (formValues: PostFormValues) => {
    try {
      const categories = formValues.categories.map((fv) => ({
        id: parseInt(fv),
      }));

      const requestData: UpdatePostRequest = {
        title: formValues.title,
        content: formValues.content,
        thumbnailUrl: formValues.thumbnailUrl,
        categories: categories,
      };

      const response = await api.put<UpdatePostRequest>(
        `/api/admin/posts/${postId}`,
        requestData
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Update successful:", result);
      router.push("/admin/posts");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    router.push("/admin/posts");
  };

  return (
    <PostForm
      title="編集画面"
      initialValues={initialValues}
      categories={formattedCategories}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
    />
  );
};

export default EditPage;
