export const formValidations = {
  name: {
    required: "お名前は必須です",
    maxLength: {
      value: 30,
      message: "お名前は30文字以内で入力してください",
    },
  },
  email: {
    required: "メールアドレスは必須です",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "正しいメールアドレスの形式で入力してください",
    },
  },
  message: {
    required: "本文は必須です",
    maxLength: {
      value: 500,
      message: "本文は500文字以内で入力してください",
    },
  },
};
