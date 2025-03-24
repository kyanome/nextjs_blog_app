"use client";
import React, { useState } from "react";
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

export type FormattedCategory = {
  value: string;
  label: string;
};

interface PostFormProps {
  title: string;
  initialValues?: PostFormValues;
  categories: FormattedCategory[];
  isLoading: boolean;
  isSubmitting?: boolean;
  onSubmit: (values: PostFormValues) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  title,
  initialValues = {
    title: "",
    content: "",
    thumbnailUrl: "",
    categories: [],
  },
  categories,
  isLoading,
  onSubmit,
  onCancel,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

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
          {onDelete && showDeleteConfirm && (
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
                <Button variant="destructive" size="sm" onClick={onDelete}>
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
                  placeholder="/coffee.jpgと入力してください"
                  disabled={isSubmitting}
                />
                <MultiSelectField
                  control={control}
                  options={categories}
                  placeholder="カテゴリーを選択してください"
                  name="categories"
                  label="カテゴリー"
                  disabled={isSubmitting}
                />
              </div>
              <CardFooter className="flex justify-between px-0 py-4 gap-4">
                {onDelete && !showDeleteConfirm && (
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
                    onClick={onCancel}
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
