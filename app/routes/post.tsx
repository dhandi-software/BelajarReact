import {
  Form,
  Link,
  NavLink,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router";
import type { Route } from "./+types/post";

// --- FUNGSI DATA (TIDAK DIUBAH) ---
export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.postId;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return await res.json();
}

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

// --- KOMPONEN DENGAN VALIDASI HAPUS ---
export default function Post({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();

  const isDeleted = fetcher.data?.idDelete === true;
  const isDeleting = fetcher.state === "submitting";

  // Tampilan setelah item berhasil dihapus (tidak ada perubahan di sini)
  if (isDeleted) {
    return (
      <div className="mx-auto max-w-lg rounded-lg bg-white p-8 text-center shadow-lg dark:bg-slate-800">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
          Berhasil Dihapus
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Post telah berhasil dihapus dari sistem.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-md bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-600"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Tampilan utama sebelum dihapus
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-slate-800">
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
          {/* --- PERUBAHAN DI SINI --- */}
          <button
            type="submit"
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
            onClick={(event) => {
              if (
                !window.confirm("Apakah Anda yakin ingin menghapus post ini?")
              ) {
                event.preventDefault(); // Hentikan aksi hapus jika pengguna klik "Batal"
              }
            }}
          >
            {isDeleting ? "Menghapus..." : "Hapus Post"}
          </button>
          {/* --- AKHIR PERUBAHAN --- */}
        </fetcher.Form>
      </div>
    </div>
  );
}
