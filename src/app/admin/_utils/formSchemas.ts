import { z } from "zod";

export const formSchema = z.object({
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
  categories: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
    { message: "カテゴリを選択してください" }
  ),
});

export type FormValues = z.infer<typeof formSchema>;
