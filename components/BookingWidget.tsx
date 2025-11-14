"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { doctors } from "@/lib/data";
import { servicesPricing, doctorServicesMap } from "@/lib/pricing";
import { doctorSlots } from "@/lib/doctorSchedule";

export default function BookingWidget() {
  const searchParams = useSearchParams();
  const initialDoctorId = searchParams.get("doctorId") || "";
  const initialServiceCode = searchParams.get("serviceCode") || "";

  const [doctorId, setDoctorId] = useState(initialDoctorId);
  const [serviceCode, setServiceCode] = useState(initialServiceCode);
  const [slotId, setSlotId] = useState("");
  const [petName, setPetName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const selectedService = useMemo(
    () => servicesPricing.find((s) => s.code === serviceCode),
    [serviceCode]
  );

  const servicesForDoctor = useMemo(() => {
    if (!doctorId) return servicesPricing;
    const codes = doctorServicesMap[doctorId] || [];
    return servicesPricing.filter((s) => codes.includes(s.code));
  }, [doctorId]);

  const doctorsForService = useMemo(() => {
    if (!serviceCode) return doctors;
    return doctors.filter((d) => {
      const codes = doctorServicesMap[d.id] || [];
      return codes.includes(serviceCode);
    });
  }, [serviceCode]);

  const slotsForDoctor = useMemo(() => {
    if (!doctorId) return [];
    return doctorSlots.filter((s) => s.doctorId === doctorId);
  }, [doctorId]);

  const handleSubmit = async () => {
    setSending(true);
    setResult(null);
    try {
      // тут пока мок: потом можно будет заменить на реальный API-запрос
      await new Promise((resolve) => setTimeout(resolve, 800));
      setResult("Заявка отправлена. Мы свяжемся с вами для подтверждения.");
      setPetName("");
      setContact("");
      setComment("");
      setSlotId("");
    } catch {
      setResult("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-800 space-y-4">
      <h2 className="font-medium mb-1 text-base">Запись на консультацию</h2>
      <p className="text-xs text-gray-500">
        Выберите врача, услугу и удобное время. Запрос придёт администратору.
      </p>

      {/* Врач */}
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700">
          Врач
        </label>
        <select
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
          value={doctorId}
          onChange={(e) => {
            setDoctorId(e.target.value);
            setSlotId("");
          }}
        >
          <option value="">Любой врач</option>
          {doctorsForService.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.speciality}
            </option>
          ))}
        </select>
      </div>

      {/* Услуга */}
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700">
          Услуга
        </label>
        <select
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
          value={serviceCode}
          onChange={(e) => setServiceCode(e.target.value)}
        >
          <option value="">Выберите услугу</option>
          {servicesForDoctor.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
              {s.priceRUB ? ` — ${s.priceRUB.toLocaleString("ru-RU")} ₽` : ""}
            </option>
          ))}
        </select>
        {selectedService && (
          <p className="text-[11px] text-gray-500 mt-1">
            {selectedService.description}
          </p>
        )}
      </div>

      {/* Время */}
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700">
          Время
        </label>
        {doctorId ? (
          <div className="flex flex-wrap gap-2">
            {slotsForDoctor.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSlotId(slot.id)}
                className={[
                  "px-3 py-1 rounded-xl border text-xs",
                  slotId === slot.id
                    ? "border-black bg-black text.white"
                    : "border-gray-200 bg-white text-gray-700",
                ].join(" ")}
              >
                {slot.startsAt.slice(0, 16).replace("T", " ")}
              </button>
            ))}
            {!slotsForDoctor.length && (
              <p className="text-[11px] text-gray-500">
                Для выбранного врача пока нет слотов.
              </p>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-gray-500">
            Сначала выберите врача — затем появятся свободные слоты.
          </p>
        )}
      </div>

      {/* Данные пациента */}
      <div className="grid gap-3">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-700">
            Имя питомца
          </label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2.text-xs outline-none focus:border-black.focus:ring-1 focus:ring-black"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Например, Мурзик"
          />
        </div>
        <div className="space-y-1">
          <label className="block.text-xs font-medium text-gray-700">
            Контакт для связи
          </label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2.text-xs outline-none focus:border-black focus:ring-1 focus:ring-black"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Телефон или Telegram"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs.font-medium text-gray-700">
            Комментарий
          </label>
          <textarea
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black min-h-[60px]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Кратко опишите проблему, ранее поставленные диагнозы..."
          />
        </div>
      </div>

      {result && (
        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          {result}
        </div>
      )}

      <button
        className="w-full rounded-xl bg-black text-white text-sm font-medium py-2.5 mt-1.disabled:opacity-50"
        disabled={
          sending ||
          !serviceCode ||
          !doctorId ||
          !slotId ||
          !petName.trim() ||
          !contact.trim()
        }
        onClick={handleSubmit}
      >
        {sending ? "Отправляем..." : "Записаться"}
      </button>
    </div>
  );
}
