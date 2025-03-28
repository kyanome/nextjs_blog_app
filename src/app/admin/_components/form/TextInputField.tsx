import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface TextInputFieldProps {
  control: Control<any>;
  name: any; //TODO:型の付け方を後で調査する. https://zenn.dev/masa5714/articles/9bf0a1c3f7b421
  label: string;
  disabled: boolean;
  placeholder?: string;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  control,
  name,
  label,
  disabled,
  placeholder,
}: TextInputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                // You can explicitly pass the disabled property here if needed
                // disabled={field.disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
