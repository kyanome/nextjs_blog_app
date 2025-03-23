import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface TextAreaFieldProps {
  control: Control<any>;
  name: any; //TODO:型の付け方を後で調査する. https://zenn.dev/masa5714/articles/9bf0a1c3f7b421
  label: string;
  placeholder?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  control,
  name,
  label,
  placeholder,
}: TextAreaFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
