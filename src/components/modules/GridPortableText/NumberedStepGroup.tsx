"use client";

export interface NumberedStepItem {
  _key?: string;
  title: string;
  description: string;
}

export function NumberedStepGroup({
  value,
}: {
  value: { items?: NumberedStepItem[] };
}) {
  return (
    <ol className="list-none">
      {value.items?.map((step, i) => (
        <li
          key={step._key ?? i}
          className="flex gap-5 border-b border-warm-gray py-6 last:border-b-0"
        >
          <div className="min-w-[36px] font-serif text-[28px] font-bold leading-none text-gold">
            {i + 1}
          </div>
          <div>
            <div className="mb-1.5 text-base font-semibold text-midnight">
              {step.title}
            </div>
            <div className="text-sm leading-relaxed text-mid-gray">
              {step.description}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
