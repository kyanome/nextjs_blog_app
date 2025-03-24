"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextInputField } from "../../_components/form/TextInputField";
import { MultiSelectField } from "../../_components/form/MultiSelectField";
import { TextAreaField } from "../../_components/form/TextAreaField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category, Post, UpdatePostRequest } from "@/types";
import { PostFormValues, postFormSchema } from "../../_utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/api";

const EditPage = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: post, loading: isPostLoading } = useDataFetch<Post>(
    `admin/posts/${postId}`
  );
  const { data: allCategories, loading: isCategoriesLoading } =
    useDataFetch<Category[]>(`admin/categories`);

  const formattedCategories =
    allCategories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) || [];

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnailUrl: "",
      categories: [],
    },
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (!post) return;
    form.reset({
      title: post.title || "",
      content: post.content || "",
      thumbnailUrl: post.thumbnailUrl || "",
      categories:
        post.PostCategory?.map((pc) => pc.category.id.toString()) || [],
    });
  }, [post, form]);

  // 読み込み状態を更新
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

  const onSubmit = async (formValues: PostFormValues) => {
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <TextInputField
                  control={control}
                  name="title"
                  label="タイトル"
                  disabled={isSubmitting}
                />
                <TextAreaField
                  control={control}
                  name="content"
                  label="コンテンツ"
                  disabled={isSubmitting}
                />
                <TextInputField
                  control={control}
                  name="thumbnailUrl"
                  label="画像URL"
                  disabled={isSubmitting}
                />
                <MultiSelectField
                  control={control}
                  options={formattedCategories}
                  name="categories"
                  label="カテゴリー"
                  disabled={isSubmitting}
                />
              </div>
              <CardFooter className="flex justify-between px-0 py-4 gap-4">
                {!showDeleteConfirm && (
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
                    onClick={() => router.push("/admin/posts")}
                    disabled={isSubmitting}
                  >
                    キャンセル
                  </Button>

                  <Button
                    type="submit"
                    className="px-6"
                    disabled={isSubmitting}
                  >
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
