import React from "react";
import { useNavigate } from "react-router";

export default function ButtonBackHome() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="mt-6 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 hover:text-white hover:font-bold cursor-pointer"
    >
      Kembali Ke Beranda
    </button>
  );
}
