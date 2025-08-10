import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container mx-auto p-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} My Awesome App. All rights reserved.
      </div>
    </footer>
  );
}
