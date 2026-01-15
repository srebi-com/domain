"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "../lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as Locale)
    ? (segments[0] as Locale)
    : locale;
  const rest = segments.slice(1).join("/");

  return (
    <div className="relative text-sm">
      <span className="sr-only">Language switcher</span>
      <div className="flex items-center gap-2 rounded-full border border-mist-200 bg-white px-3 py-1.5 text-ink-700 shadow-soft">
        {locales.map((item) => {
          const href = `/${item}${rest ? `/${rest}` : ""}`;
          const isActive = item === currentLocale;
          return (
            <Link
              key={item}
              href={href}
              aria-label={`Switch to ${localeLabels[item]}`}
              className={`rounded-full px-2 py-0.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-ink-900 text-white"
                  : "text-ink-700 hover:text-ink-900"
              }`}
            >
              {localeLabels[item]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
