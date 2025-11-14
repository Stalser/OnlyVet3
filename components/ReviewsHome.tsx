"use client";

import { useState } from "react";
import Link from "next/link";
import { reviews } from "../lib/reviews";

const MAX_VISIBLE = 3;
const MAX_CHARS = 160;

export default function ReviewsHome() {
  const total = reviews.length;
  const first = reviews.slice(0, MAX_VISIBLE);

  return (
    <section className="bg-white py-16">
      <div className="container space-y-6">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Что говорят владельцы
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mt-1">
              Только реальные кейсы — острые состояния, разбор анализов,
              сложные диагнозы и хронические пациенты.
            </p>
          </div>
          <Link
            href="/reviews"
            className="btn btn-outline text-xs sm:text-sm"
          >
            Все отзывы ({total})
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {first.map((r) => (
            <ReviewCard key={r.id} {...r} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = (typeof reviews)[number] & { compact?: boolean };

function ReviewCard(props: CardProps) {
  const { ownerName, petName, species, title, text, compact } = props;
  const [expanded, setExpanded] = useState(false);

  const showText =
    !compact || expanded || text.length <= MAX_CHARS
      ? text
      : text.slice(0, MAX_CHARS) + "…";

  return (
    <article className="card p-4 flex flex-col gap-2 text-sm text-gray-800">
      <h3 className="font-semibold text-[15px]">{title}</h3>
      <div className="text-xs text-gray-500">
        {ownerName}, {petName} ({species})
      </div>
      <p className="text-xs text-gray-700">{showText}</p>
      {compact && text.length > MAX_CHARS && (
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
