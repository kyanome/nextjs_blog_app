"use client";

import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@/app/contact/_lib/constants";
import { UseFormReturn } from "react-hook-form";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormReturn = {
  form: UseFormReturn<FormData>;
  submitForm: (data: FormData) => Promise<void>;
  handleClear: () => void;
};

export const useContactForm = (): ContactFormReturn => {
  const form = useForm<FormData>();

  const submitForm = async (data: FormData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("送信しました");
        form.reset();
      } else {
        alert("送信に失敗しました");
      }
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  const handleClear = () => {
    form.reset();
  };

  return {
    form,
    submitForm,
    handleClear,
  };
};
