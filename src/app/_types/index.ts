import { FieldError } from "react-hook-form";

export interface FieldBaseProps {
  label: string;
  error?: FieldError;
}

export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
};
