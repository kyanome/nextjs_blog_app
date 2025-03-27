import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { Control } from "react-hook-form";
import { v4 as uuid } from "uuid";

interface ImageInputField {
  control: Control<any>;
  name: any; //TODO:型の付け方を後で調査する. https://zenn.dev/masa5714/articles/9bf0a1c3f7b421
  label: string;
  disabled: boolean;
  placeholder?: string;
}

export const ImageInputField: React.FC<ImageInputField> = ({
  control,
  name,
  label,
  disabled,
  placeholder,
}: ImageInputField) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return null;

    // ファイルサイズの制限: 7MB
    const MAX_FILE_SIZE = 7 * 1024 * 1024; // 7MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      alert("ファイルサイズは7MB以下にしてください");
      return null;
    }

    setIsUploading(true);
    try {
      const filePath = `private/${uuid()}`;
      const { data, error } = await supabase.storage
        .from("post-thumbnail")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        alert(error.message);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("post-thumbnail").getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      alert("ファイルのアップロードに失敗しました");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                disabled={disabled || isUploading}
                {...fieldProps}
                type="file"
                accept="image/*, application/pdf"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    const publicUrl = await handleFileUpload(file);
                    onChange(publicUrl);
                  }
                }}
              />
            </FormControl>
            {isUploading && (
              <p className="text-sm text-blue-500">アップロード中...</p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
