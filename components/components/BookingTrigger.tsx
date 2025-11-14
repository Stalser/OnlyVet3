"use client";

import BookingModal from "@/components/BookingModal";

type BookingTriggerProps = {
  label?: string;
  doctorId?: string;
  serviceCode?: string;
};

/**
 * Обёртка-триггер для модалки записи.
 * Можно использовать вместо обычной кнопки/ссылки.
 */
export default function BookingTrigger({
  label = "Записаться",
  doctorId,
  serviceCode,
}: BookingTriggerProps) {
  return (
    <BookingModal
      triggerLabel={label}
      doctorId={doctorId}
      serviceCode={serviceCode}
    />
  );
}
