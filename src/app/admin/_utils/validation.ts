import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "タイトルを入力してください" })
    .max(30, { message: "30文字以内にしてください" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "タイトルを入力してください" })
    .max(500, { message: "500文字以下にしてください" }),
  thumbnailUrl: z
    .string()
    .trim()
    .min(1, { message: "サムネイルURLを入力してください" })
    .max(2048, { message: "URLが長すぎます" }),
  categories: z.array(z.string()),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "カテゴリー名を入力してください" })
    .max(30, { message: "30文字以内にしてください" }),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
