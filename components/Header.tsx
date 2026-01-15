import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "../lib/i18n";

export default function Header({
  locale,
  labels
}: {
  locale: Locale;
  labels: {
    how: string;
    output: string;
    trust: string;
    faq: string;
    cta: string;
  };
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-mist-200/80 bg-mist-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-xl font-semibold text-ink-900">
          Srebi
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm font-medium text-ink-700 md:flex"
          aria-label="Primary"
        >
          <Link href={`/${locale}#how`} className="hover:text-ink-900">
            {labels.how}
          </Link>
          <Link href={`/${locale}#output`} className="hover:text-ink-900">
            {labels.output}
          </Link>
          <Link href={`/${locale}#trust`} className="hover:text-ink-900">
            {labels.trust}
          </Link>
          <Link href={`/${locale}#faq`} className="hover:text-ink-900">
            {labels.faq}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}#waitlist`}
            className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ink-700"
          >
            {labels.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
