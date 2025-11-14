"use client";

import { useMemo, useState } from "react";
import { reviews } from "../../lib/reviews";

const SPECIES_FILTERS = [
  { id: "all", label: "Все" },
  { id: "кошка", label: "Кошки" },
  { id: "собака", label: "Собаки" },
  { id: "другой", label: "Другие" },
];

export default function ReviewsPage() {
  const [species, setSpecies] = useState<string>("all");
  const [tag, setTag] = useState<string>("");

  const tags = useMemo(() => {
    const set = new Set<string>();
    reviews.forEach((r) => r.tag && set.add(r.tag));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (species !== "all" && r.species !== species) return false;
      if (tag && r.tag !== tag) return false;
      return true;
    });
  }, [species, tag]);

  return (
    <main className="bg-slate-50 py-12">
      <div className="container space-y-6">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Отзывы владельцев
            </h1>
            <p className="text-sm text-gray-600 max-w-xl mt-1">
              Ситуации, когда онлайн-консультация действительно помогла:
              острые состояния, разбор анализов, второе мнение, поддержка при
              хронических болезнях.
            </p>
          </div>
          <div className="text-xs text-gray-500">
            Показано: {filtered.length} из {reviews.length}
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 text-xs">
          {SPECIES_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setSpecies(f.id)}
              className={[
                "badge",
                species === f.id ? "badge-active" : "",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
          {tags.length > 0 && (
            <select
              className="ml-auto rounded-xl border border-gray-200 px-3 py-1 outline-none.text-xs bg-white"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">Все темы</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Список отзывов */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <ReviewCard key={r.id} {...r} />
          ))}
        </div>
      </div>
    </main>
  );
}

import type { Review } from "../../lib/reviews";
import { useState } from "react";

function ReviewCard(r: Review) {
  const [expanded, setExpanded] = useState(false);

  const MAX_CHARS = 260;
  const showText =
    expanded || r.text.length <= MAX_CHARS
      ? r.text
      : r.text.slice(0, MAX_CHARS) + "…";

  return (
    <article className="card p-4 flex flex-col gap-2 text-sm text-gray-800">
      <h2 className="font-semibold text-[15px]">{r.title}</h2>
      <div className="text-xs text-gray-500">
        {r.ownerName}, {r.petName} ({r.species}){" "}
        {r.tag && <span className="ml-1 text-[11px] text-gray-400">#{r.tag}</span>}
      </div>
      <p className="text-xs text-gray-700">{showText}</p>
      {r.text.length > MAX_CHARS && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-[11px] text-blue-600 underline underline-offset-2 self-start"
        >
          {expanded ? "Свернуть" : "Читать далее"}
        </button>
      )}
    </article>
  );
}
