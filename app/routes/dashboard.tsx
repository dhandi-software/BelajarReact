import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <main className="text-2xl text-amber-50">
      Hello ini adalah halaman Dashboard Page <Outlet />
    </main>
  );
}
