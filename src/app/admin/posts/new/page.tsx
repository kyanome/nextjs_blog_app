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
import { zodResolver } from "@hookform/resolvers/zod";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category, CreatePostRequest } from "@/types";
import { PostFormValues, postFormSchema } from "../../_utils/validation";

const CreatePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(isCategoriesLoading);
  }, [isCategoriesLoading]);

  const onSubmit = async (formValues: PostFormValues) => {
    try {
      const categories = formValues.categories.map((fv) => ({
        id: parseInt(fv),
      }));

      const requestData: CreatePostRequest = {
        title: formValues.title,
        content: formValues.content,
        thumbnailUrl: formValues.thumbnailUrl,
        categories: categories,
      };

      const response = await fetch(`/api/admin/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("送信成功:", result);
      router.push("/admin");
    } catch (error) {
      console.error("送信失敗:", error);
    } finally {
      console.log("フォーム送信完了");
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
            記事作成画面
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
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
                  placeholder="/coffee.jpgと入力してください"
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

export default CreatePage;
