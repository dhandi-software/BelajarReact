import React from "react";

interface DeleteButtonProps {
  isDeleting: boolean;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DeleteButton({
  isDeleting,
  onDelete,
}: DeleteButtonProps) {
  return (
    <button
      type="submit"
      disabled={isDeleting}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
      onClick={(event) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus post ini?")) {
          event.preventDefault();
        } else {
          onDelete?.(event);
        }
      }}
    >
      {isDeleting ? "Menghapus..." : "Hapus Post"}
    </button>
  );
}
