// lib/doctorSchedule.ts
// Мок-расписание по врачам. Для живой интеграции замените на данные из Vetmanager.

export type DoctorSlot = {
  id: string;
  doctorId: string;
  startsAt: string; // ISO
  endsAt: string;   // ISO
};

const now = Date.now();

export const doctorSlots: DoctorSlot[] = [
  {
    id: "slot-1",
    doctorId: "doc-ivanova",
    startsAt: new Date(now + 2 * 60 * 60 * 1000).toISOString(),
    endsAt:   new Date(now + 2.5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "slot-2",
    doctorId: "doc-ivanova",
    startsAt: new Date(now + 5 * 60 * 60 * 1000).toISOString(),
    endsAt:   new Date(now + 5.5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "slot-3",
    doctorId: "doc-petrov",
    startsAt: new Date(now + 3 * 60 * 60 * 1000).toISOString(),
    endsAt:   new Date(now + 3.5 * 60 * 60 * 1000).toISOString(),
  },
];

export function getDoctorSchedule(doctorId: string): DoctorSlot[] {
  return doctorSlots.filter((s) => s.doctorId === doctorId);
}
