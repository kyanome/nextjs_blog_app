"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryFormValues,
  categoryFormSchema,
} from "../../_utils/validation";
import { TextInputField } from "../../_components/form/TextInputField";
import { Category } from "@/types";
import api from "@/utils/api";

interface CategoryFormProps {
  title: string;
  category?: Category | undefined;
  loading?: boolean;
  categoryId?: string;
  isCreating: boolean;
  redirectPath: string;
  onSubmit: (data: CategoryFormValues) => Promise<void>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  title,
  category,
  loading,
  categoryId,
  isCreating,
  redirectPath,
  onSubmit,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    form.reset({ name: category?.name });
  }, [form, category]);

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/admin/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push(redirectPath);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancel = () => {
    router.push(redirectPath);
  };

  const handleFormSubmit = async (values: CategoryFormValues) => {
    try {
      await onSubmit(values);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Failed to submit category:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-xl font-medium text-gray-800">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {/* Confirmation dialog for delete action */}
          {!isCreating && showDeleteConfirm && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                本当に削除しますか？
              </h3>
              <p className="text-sm text-red-600 mb-4">
                この操作は取り消せません。このコンテンツを削除すると、データは完全に削除されます。
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isSubmitting}
                >
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  削除する
                </Button>
              </div>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              <div className="space-y-6">
                <TextInputField
                  control={control}
                  name="name"
                  label="カテゴリー名"
                  disabled={isSubmitting}
                />
              </div>
              <CardFooter className="flex justify-between px-0 py-4 gap-4">
                {!isCreating && !showDeleteConfirm && (
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isSubmitting}
                  >
                    削除
                  </Button>
                )}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    キャンセル
                  </Button>
                  <Button
                    type="submit"
                    className="px-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "送信中..." : "完了"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryForm;
