import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "./multi-select";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectFieldProps {
  control: any;
  name: any; //TODO:型の付け方を後で調査する. https://zenn.dev/masa5714/articles/9bf0a1c3f7b421
  label: string;
  options: Option[];
  placeholder?: string;
  maxCount?: number;
  variant?: string;
  disabled?: boolean;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  control,
  name,
  label,
  options,
  placeholder,
  maxCount,
  variant = "default",
  disabled = false,
}: MultiSelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelect
              options={options}
              onValueChange={field.onChange}
              defaultValue={field.value}
              placeholder={placeholder || `Select ${label.toLowerCase()}`}
              variant={variant as any}
              maxCount={maxCount}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
