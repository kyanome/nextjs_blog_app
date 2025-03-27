"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { PostFormValues, postFormSchema } from "../../_utils/validation";
import { TextInputField } from "../../_components/form/TextInputField";
import { TextAreaField } from "../../_components/form/TextAreaField";
import { MultiSelectField } from "../../_components/form/MultiSelectField";
import { Category, Post } from "@/types";
import DeleteConfirmation from "../../_components/form/DeleteConfirmation";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { KeyedMutator } from "swr";
import { ImageInputField } from "../../_components/form/ImageInputField";

interface PostFormProps {
  title: string;
  post?: Post | undefined;
  categories: Category[] | undefined;
  postId?: string;
  isCreating: boolean;
  onSubmit: (data: PostFormValues) => Promise<void>;
  mutate: KeyedMutator<any>;
}

const PostForm: React.FC<PostFormProps> = ({
  title,
  post,
  categories,
  postId,
  isCreating,
  onSubmit,
  mutate,
}) => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formattedCategories =
    categories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) || [];

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnailUrl: undefined,
      categories: [],
    },
  });

  useEffect(() => {
    if (isCreating) setIsLoading(false);
    if (!post) return;
    form.reset({
      title: post.title || "",
      content: post.content || "",
      categories:
        post.PostCategory?.map((pc) => pc.category.id.toString()) || [],
    });
    setIsLoading(false);
  }, [post, form]);

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/admin/posts/${postId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      mutate();
      router.push("/admin/posts");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancel = () => {
    router.push("/admin/posts");
  };

  const handleFormSubmit = async (values: PostFormValues) => {
    try {
      await onSubmit(values);
      router.push("/admin/posts");
    } catch (error) {
      console.error("Failed to submit post:", error);
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
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {!isCreating && (
            <DeleteConfirmation
              isVisible={showDeleteConfirm}
              isSubmitting={isSubmitting}
              onCancel={() => setShowDeleteConfirm(false)}
              onConfirm={handleDelete}
            />
          )}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
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
                <ImageInputField
                  control={control}
                  name="thumbnailUrl"
                  label="画像URL"
                  disabled={isSubmitting}
                />
                <MultiSelectField
                  control={control}
                  options={formattedCategories}
                  placeholder="カテゴリーを選択してください"
                  name="categories"
                  label="カテゴリー"
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

export default PostForm;
