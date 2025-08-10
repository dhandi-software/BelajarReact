import React from "react";

// 1. Buat sebuah 'interface' untuk mendefinisikan tipe data props
interface NavbarToggleButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function NavbarToggleButton({
  isOpen,
  toggleMenu,
}: NavbarToggleButtonProps) {
  return (
    <button
      onClick={toggleMenu}
      className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}
