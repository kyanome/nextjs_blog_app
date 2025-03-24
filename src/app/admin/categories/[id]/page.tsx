"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category } from "@prisma/client";
import { CategoryFormValues } from "../../_utils/validation";
import api from "@/utils/api";
import CategoryForm from "../_components/CategoryForm";

interface CategoryUpdateRequest {
  name: string;
}

const EditPage = () => {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<CategoryFormValues>({
    name: "",
  });

  const { data: category, loading: isCategoriesLoading } =
    useDataFetch<Category>(`admin/categories/${categoryId}`);

  useEffect(() => {
    if (category) {
      setInitialValues({
        name: category.name || "",
      });
    }
  }, [category]);

  useEffect(() => {
    setIsLoading(isCategoriesLoading);
  }, [isCategoriesLoading]);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/admin/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      router.push("/admin/categories");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmit = async (formValues: CategoryFormValues) => {
    try {
      const response = await api.put<CategoryUpdateRequest>(
        `/api/admin/categories/${categoryId}`,
        { name: formValues.name }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Update successful:", result);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    router.push("/admin/categories");
  };

  return (
    <CategoryForm
      title="編集画面"
      initialValues={initialValues}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
    />
  );
};

export default EditPage;
