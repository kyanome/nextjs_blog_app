import React from "react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  isVisible: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isVisible,
  isSubmitting = false,
  onCancel,
  onConfirm,
  title = "本当に削除しますか？",
  message = "この操作は取り消せません。このコンテンツを削除すると、データは完全に削除されます。",
  cancelText = "キャンセル",
  confirmText = "削除する",
}) => {
  if (!isVisible) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
      <h3 className="text-lg font-medium text-red-800 mb-2">{title}</h3>
      <p className="text-sm text-red-600 mb-4">{message}</p>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelText}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
