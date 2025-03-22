"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextInputField } from "../../_components/form/TextInputField";
import { MultiSelectField } from "../../_components/form/MultiSelectField";
import { TextAreaField } from "../../_components/form/TextAreaField";
import { FormValues, formSchema } from "../../_utils/formSchemas";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Category, Post, PostCategory } from "@/app/(main)/_types";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const EditPage = () => {
  const params = useParams();
  const router = useRouter();
  const postId = params.id;

  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnailUrl: "",
      categories: [],
    },
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/admin/posts/${postId}`);
        const result = await response.json();
        if (result.status === 200) {
          const post = result.post as Post;
          const selectedCategories = post.PostCategory
            ? post.PostCategory.map((pc: PostCategory) => ({
                value: pc.category.id.toString(),
                label: pc.category.name,
              }))
            : [];
          form.reset({
            title: post.title,
            content: post.content,
            thumbnailUrl: post.thumbnailUrl,
            categories: selectedCategories,
          });
        }
      } catch (error) {
        console.error("投稿データの取得に失敗しました:", error);
        toast.error("投稿データの取得に失敗しました");
      }
    };
    fetchPostData();
  }, [postId, form]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (data.status === 200 && Array.isArray(data.categories)) {
          const formattedCategories = data.categories.map(
            (category: Category) => ({
              value: category.id.toString(),
              label: category.name,
            })
          );
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("カテゴリの取得に失敗しました", error);
        toast.error("カテゴリの取得に失敗しました");
      }
    };
    fetchCategories();
  }, []);

  async function onSubmit(values: FormValues) {
    try {
      const updateDate = {
        title: values.title,
        content: values.content,
        thumbnailUrl: values.thumbnailUrl,
        categories: values.categories.map((category) => ({
          id: parseInt(category.value),
        })),
      };
      console.log("Data being sent:", updateDate);

      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDate),
      });

      const result = await response.json();
      if (result.status === 200) {
        toast.success("記事が更新されました");
        router.push("/admin");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("投稿の更新に失敗しました:", error);
      toast.error("投稿の更新に失敗しました");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-xl font-medium text-gray-800">
            Edit Content
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <TextInputField
                  control={form.control}
                  name="title"
                  label="タイトル"
                  placeholder="Enter title"
                />

                <TextAreaField
                  control={form.control}
                  name="content"
                  label="コンテンツ"
                  placeholder="Enter content here"
                />

                <TextInputField
                  control={form.control}
                  name="thumbnailUrl"
                  label="画像URL"
                  placeholder="https://example.com/image.jpg"
                />

                <MultiSelectField
                  control={form.control}
                  name="categories"
                  label="カテゴリー"
                  options={categories}
                  variant="inverted"
                  placeholder="Select frameworks"
                />
              </div>

              <CardFooter className="flex justify-end gap-4 px-0 pt-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" className="px-6">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPage;
