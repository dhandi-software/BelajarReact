import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-amber-900 font-sans text-slate-900 antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow p-4 md:p-6 bg-slate-900 text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Halaman ini Sedang diperbaiki oleh Developer.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Halaman Tidak Ditemukan" : "Terjadi Eror";
    details =
      error.status === 404
        ? "Maaf, kami tidak dapat menemukan halaman yang Anda cari."
        : error.statusText || details;
  }

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-red-600">{message}</h1>
          <p className="mt-4 text-lg text-slate-600">{details}</p>
          <a
            href="/"
            className="mt-8 inline-block rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </Layout>
  );
}
