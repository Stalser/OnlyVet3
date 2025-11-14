"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type AccountUser = {
  email: string | null;
};

export default function AccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setUser(null);
        } else {
          setUser({ email: data.user?.email ?? null });
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  if (loading) {
    return (
      <main className="container py-12">
        <p className="text-sm text-gray-600">Загружаем данные...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container py-12 space-y-3">
        <h1 className="text-2xl font-semibold mb-2">Личный кабинет</h1>
        <p className="text-sm text-gray-600">
          Для доступа к личному кабинету необходимо войти.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center rounded-xl bg-black text-white text-sm font-medium px-4 py-2 mt-2"
        >
          Войти
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-12 space-y-4">
      <h1 className="text-2xl font-semibold">Личный кабинет</h1>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm text-gray-800">
        <h2 className="font-medium text-base">Профиль</h2>
        <div className="flex flex-col gap-1 text-sm">
          <div>
            <span className="text-gray-500 text-xs">Email:</span>{" "}
            <span className="font-medium">{user.email || "не указан"}</span>
          </div>
          <p className="text-xs text-gray-500">
            В дальнейшем здесь появятся данные о питомцах, истории консультаций
            и счетах.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm text-gray-800">
        <h2 className="font-medium.text-base">Записи и консультации</h2>
        <p className="text-xs text-gray-500">
          Раздел находится в разработке. Здесь будет отображаться история
          онлайн-консультаций, рекомендации и файлы.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm text-gray-800">
        <h2 className="font-medium text-base">Выход из аккаунта</h2>
        <button
          type="button"
          className="inline-flex items-center rounded-xl border.border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          onClick={async () => {
            await supabase.auth.signOut();
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          }}
        >
          Выйти
        </button>
      </section>
    </main>
  );
}
