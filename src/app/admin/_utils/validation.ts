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
  thumbnailUrl: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: "7MB以下の画像をアップロードしてください",
  }),
  categories: z
    .array(z.string())
    .min(1, { message: "少なくとも1つのカテゴリーを選択してください" }),
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
