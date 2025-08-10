import { useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/post";
import DeleteButton from "../components/buttons/DeleteButton";
import ButtonBackHome from "../components/buttons/BackToHomeButton";

// Loader: Ambil data dari API
export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.postId;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (!res.ok) {
    return null; // Data tidak ditemukan
  }

  const data = await res.json();
  // Jika API mengembalikan object kosong, anggap tidak ada data
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return data;
}

// Action untuk delete
export async function clientAction({ params }: Route.ClientActionArgs) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
      method: "DELETE",
    });
    return { idDelete: true };
  } catch (err) {
    return { idDelete: false };
  }
}

// Komponen utama
export default function Post({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();

  const isDeleted = fetcher.data?.idDelete === true;
  const isDeleting = fetcher.state === "submitting";

  // Jika data tidak ada
  if (!loaderData) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-lg bg-white p-8 text-center shadow-lg dark:bg-slate-800">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
          Data yang Anda cari tidak ada
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Pastikan ID yang Anda masukkan benar.
        </p>
        <ButtonBackHome />
      </div>
    );
  }

  // Jika berhasil dihapus
  if (isDeleted) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-lg bg-white p-8 text-center shadow-lg dark:bg-slate-800">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
          Berhasil Dihapus
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Post telah berhasil dihapus dari sistem.
        </p>
        <ButtonBackHome />
      </div>
    );
  }

  // Tampilan normal
  return (
    <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-slate-800">
      <div className="p-6 md:p-8">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white">
          {loaderData.title}
        </h1>
        <p className="text-slate-700 leading-relaxed dark:text-slate-300">
          {loaderData.body}
        </p>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <button
          onClick={() => navigate("/")}
          className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          Kembali
        </button>
        <fetcher.Form method="delete">
          <DeleteButton
            isDeleting={isDeleting}
            onDelete={() => console.log("Hapus data...")}
          />
        </fetcher.Form>
      </div>
    </div>
  );
}
