import { FieldBaseProps } from "./types";
import { ComponentPropsWithRef } from "react";
import React from "react";

export type TextAreaFieldProps = ComponentPropsWithRef<"textarea"> &
  FieldBaseProps;

const TextArea: React.FC<TextAreaFieldProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-6">
      <div className="flex">
        <label htmlFor={props.id} className="font-semibold w-40 p-2">
          {label}
        </label>
        <div className="flex-1">
          <textarea
            className="w-full h-60 p-2 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
            {...props}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextArea;
