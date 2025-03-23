"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextInputField } from "../../_components/form/TextInputField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { useDataFetch } from "@/hooks/useDataFetch";
import { Category } from "@prisma/client";
import {
  CategoryFormValues,
  categoryFormSchema,
} from "../../_utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

const EditPage = () => {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: category, loading: isCategoriesLoading } =
    useDataFetch<Category>(`admin/categories/${categoryId}`);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
      });
    }
  }, [category, form]);

  useEffect(() => {
    setIsLoading(isCategoriesLoading);
  }, [isCategoriesLoading]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      router.push("/admin/categories");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const onSubmit = async (formValues: CategoryFormValues) => {
    console.log(formValues.name);
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.name,
        }),
      });

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-xl font-medium text-gray-800">
            編集画面
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {/* Nextjs15を使ってしまったため、shadcn/uiのAlertDialogが使えなかったの代替として記述 */}
          {showDeleteConfirm && (
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
                >
                  キャンセル
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  削除する
                </Button>
              </div>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <TextInputField
                  control={form.control}
                  name="name"
                  label="カテゴリー名"
                />
              </div>
              <CardFooter className="flex justify-between px-0 py-4 gap-4">
                {!showDeleteConfirm && (
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    削除
                  </Button>
                )}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.push("/admin/categories")}
                  >
                    キャンセル
                  </Button>
                  <Button type="submit" className="px-6">
                    完了
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

export default EditPage;
