import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css"; // Pastikan file ini berisi @tailwind directives

// Fungsi links tidak perlu diubah, sudah bagus.
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

// Memberikan gaya dasar pada struktur HTML utama
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

// Komponen App utama dengan Navbar dan Outlet yang sudah diberi gaya
export default function App() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
    }`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-start gap-4 p-4">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/pedro/about" className={navLinkClasses}>
            About
          </NavLink>
          <NavLink to="/finances" className={navLinkClasses}>
            Finances
          </NavLink>
        </nav>
      </header>

      <main className="container mx-auto flex-grow p-4 md:p-6 bg-slate-900">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="container mx-auto p-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} My Awesome App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Halaman ErrorBoundary yang lebih informatif dan rapi
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Halaman Tidak Ditemukan" : "Terjadi Eror";
    details =
      error.status === 404
        ? "Maaf, kami tidak dapat menemukan halaman yang Anda cari."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-red-600">{message}</h1>
          <p className="mt-4 text-lg text-slate-600">{details}</p>
          {stack && (
            <pre className="mt-8 overflow-x-auto rounded-lg border bg-slate-50 p-4 text-left text-sm text-slate-700">
              <code>{stack}</code>
            </pre>
          )}
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
