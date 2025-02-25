"use client";

import { useContactForm } from "@/features/contact/hooks/useContactForm";
import Input from "@/app/_components/Input";
import { formValidations } from "@/features/contact/lib/validations";
import TextArea from "@/app/_components/TextArea";

function ContactForm() {
  const { form, submitForm, handleClear } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="w-full max-w-2xl p-6">
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <div className="mb-6">
            <Input
              label="お名前"
              type="text"
              id="name"
              placeholder="お名前を入力してください"
              disabled={isSubmitting}
              {...register("name", formValidations["name"])}
              error={errors["name"]}
            />
          </div>

          <div className="mb-6">
            <Input
              label="メールアドレス"
              type="email"
              id="email"
              placeholder="メールアドレスを入力してください"
              disabled={isSubmitting}
              {...register("email", formValidations["email"])}
              error={errors["email"]}
            />
          </div>

          <div className="mb-6">
            <TextArea
              label="本文"
              id="message"
              placeholder="本文を入力してください"
              disabled={isSubmitting}
              {...register("message", formValidations["message"])}
              error={errors["message"]}
            />
          </div>
        </div>

        <div className="flex space-x-4 justify-center mt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "送信中..." : "送信"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {"クリア"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
