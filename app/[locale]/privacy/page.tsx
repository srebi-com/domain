import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "../../../lib/i18n";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    return {};
  }
  const dict = getDictionary(locale);
  return {
    title: `${dict.pages.privacyTitle} | Srebi`,
    description: dict.meta.description
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
        {dict.pages.privacyTitle}
      </h1>
      <div className="mt-6 space-y-4 text-sm text-ink-600">
        {dict.pages.privacyBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
