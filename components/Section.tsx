import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  eyebrow,
  children
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ink-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold text-ink-900 sm:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
