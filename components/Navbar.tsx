"use client";

import Link from "next/link";
import BookingModal from "./BookingModal";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight">OnlyVet</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm text-gray-700">
          <Link href="/services" className="hover:text-gray-900">
            Услуги
          </Link>
          <Link href="/doctors" className="hover:text-gray-900">
            Врачи
          </Link>
          <Link href="/auth/login" className="hover:text-gray-900">
            Вход
          </Link>
          <BookingModal triggerLabel="Записаться" />
        </nav>
      </div>
    </header>
  );
}
