import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

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
                disabled={disabled}
                {...fieldProps}
                type="file"
                accept="image/*, application/pdf"
                onChange={(event) =>
                  onChange(event.target.files && event.target.files[0])
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
