"use client";

import { useState } from "react";
import BookingWidget from "@/components/BookingWidget";

type BookingModalProps = {
  triggerLabel?: string;
};

export default function BookingModal({
  triggerLabel = "Записаться",
}: BookingModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-primary rounded-xl px-4 py-2 text-sm"
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg mx-4">
            <div className="rounded-3xl bg-white shadow-xl p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3.mb-3">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold">
                    Запись на консультацию
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Выберите врача, услугу и удобное время. Заявка уйдёт
                    администратору.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              <BookingWidget />

              <p className="mt-3 text-[11px] text-gray-400">
                Нажимая «Записаться», вы соглашаетесь на обработку персональных данных.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
