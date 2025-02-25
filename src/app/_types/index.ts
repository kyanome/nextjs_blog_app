import { FieldError } from "react-hook-form";

export interface FieldBaseProps {
  label: string;
  error?: FieldError;
}

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: { id: string; name: string }[];
  thumbnail: { url: string; height: number; width: number };
};
