"use client";

export interface NumberedStepItem {
  _key?: string;
  title: string;
  description: string;
}

export function NumberedStepGroup({
  value,
  animated = false,
}: {
  value: { items?: NumberedStepItem[] };
  animated?: boolean;
}) {
  return (
    <ol className="list-none" {...(animated ? { "data-anim-list": true } : {})}>
      {value.items?.map((step, i) => (
        <li
          key={step._key ?? i}
          className="flex gap-5 border-b border-border-color py-6 last:border-b-0"
        >
          <div className="min-w-[36px] font-serif text-[28px] font-medium leading-none text-red">
            {i + 1}
          </div>
          <div>
            <div className="mb-1.5 text-base font-semibold text-ink">
              {step.title}
            </div>
            <div className="text-sm leading-relaxed text-muted-text">
              {step.description}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
