import { FieldBaseProps } from "./types";
import { ComponentPropsWithRef } from "react";

export type InputFieldProps = ComponentPropsWithRef<"input"> & FieldBaseProps;

const Input: React.FC<InputFieldProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex">
      <label htmlFor={props.id} className="font-semibold w-40 p-2">
        {label}
      </label>
      <div className="flex-1">
        <input
          className="w-full p-2 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    </div>
  );
};

Input.displayName = "Input";

export default Input;
