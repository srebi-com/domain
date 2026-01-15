import Link from "next/link";
import type { Locale } from "../lib/i18n";

export default function Footer({
  locale,
  labels
}: {
  locale: Locale;
  labels: {
    contact: string;
    privacy: string;
    terms: string;
    rights: string;
  };
}) {
  return (
    <footer className="border-t border-mist-200/70 bg-mist-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-900">
            {labels.contact}: hello@srebi.com
          </p>
          <p className="mt-2 text-xs text-ink-500">{labels.rights}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-ink-700">
          <Link href={`/${locale}/privacy`} className="hover:text-ink-900">
            {labels.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-ink-900">
            {labels.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
