import { FieldError } from "react-hook-form";

export interface FieldBaseProps {
  label: string;
  error?: FieldError;
}
