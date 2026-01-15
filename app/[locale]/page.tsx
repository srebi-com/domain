import Link from "next/link";
import Section from "../../components/Section";
import WaitlistForm from "../../components/WaitlistForm";
import { getDictionary, locales, type Locale } from "../../lib/i18n";
import { notFound } from "next/navigation";

const icons = {
  upload: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 16V4" strokeLinecap="round" />
      <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="16" width="16" height="4" rx="1.5" />
    </svg>
  ),
  timeline: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 6h16" strokeLinecap="round" />
      <path d="M4 12h10" strokeLinecap="round" />
      <path d="M4 18h7" strokeLinecap="round" />
      <circle cx="18" cy="12" r="2.5" />
    </svg>
  ),
  report: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M8 4h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M14 4v4h4" />
      <path d="M9 13h6" strokeLinecap="round" />
      <path d="M9 17h6" strokeLinecap="round" />
    </svg>
  )
};

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <div>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="animate-fade-up space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ink-500">
                Srebi
              </p>
              <h1 className="text-4xl font-semibold text-ink-900 sm:text-5xl">
                {dict.hero.headline}
              </h1>
              <p className="text-lg text-ink-500">{dict.hero.subheadline}</p>
              <p className="text-sm text-ink-500">{dict.hero.disclaimer}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}#waitlist`}
                  className="inline-flex items-center justify-center rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-ink-700"
                >
                  {dict.hero.primaryCta}
                </Link>
                <a
                  href="mailto:hello@srebi.com?subject=Srebi%20Demo%20Request"
                  className="inline-flex items-center justify-center rounded-full border border-mist-200 px-6 py-3 text-sm font-semibold text-ink-700 transition hover:border-ink-900 hover:text-ink-900"
                >
                  {dict.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3 text-sm font-semibold text-ink-900">
                  <span className="rounded-full bg-neon-400/20 p-2 text-neon-500">
                    {icons.timeline}
                  </span>
                  <span>{dict.output.cards[0].title}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-ink-500">
                  {dict.output.cards[0].points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3 text-sm font-semibold text-ink-900">
                  <span className="rounded-full bg-neon-400/20 p-2 text-neon-500">
                    {icons.report}
                  </span>
                  <span>{dict.output.cards[1].title}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-ink-500">
                  {dict.output.cards[1].points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="how" title={dict.how.title}>
        <div className="grid gap-6 md:grid-cols-3">
          {dict.how.steps.map((step, index) => {
            const icon = index === 0 ? icons.upload : index === 1 ? icons.timeline : icons.report;
            return (
              <div
                key={step.title}
                className="rounded-2xl border border-mist-200 bg-white p-6 shadow-soft"
              >
                <div className="flex items-center gap-3 text-sm font-semibold text-ink-900">
                  <span className="rounded-full bg-neon-400/20 p-2 text-neon-500">
                    {icon}
                  </span>
                  {step.title}
                </div>
                <p className="mt-4 text-sm text-ink-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="output" title={dict.output.title}>
        <div className="grid gap-6 md:grid-cols-3">
          {dict.output.cards.map((card, index) => (
            <div
              key={card.title}
              className={`rounded-2xl border border-mist-200 bg-white p-6 shadow-soft ${
                index === 1 ? "md:-translate-y-4" : ""
              }`}
            >
              <div className="flex items-center gap-3 text-sm font-semibold text-ink-900">
                <span className="rounded-full bg-neon-400/20 p-2 text-neon-500">
                  {index === 0 ? icons.timeline : index === 1 ? icons.report : icons.upload}
                </span>
                {card.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-ink-500">
                {card.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="trust" title={dict.trust.title}>
        <div className="rounded-2xl border border-mist-200 bg-white p-8 shadow-soft">
          <ul className="space-y-3 text-sm text-ink-600">
            {dict.trust.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-neon-500" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="faq" title={dict.faq.title}>
        <div className="grid gap-6 md:grid-cols-2">
          {dict.faq.items.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-mist-200 bg-white p-6 shadow-soft"
            >
              <h3 className="text-base font-semibold text-ink-900">{item.q}</h3>
              <p className="mt-3 text-sm text-ink-500">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="waitlist" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
                {dict.waitlist.title}
              </h2>
              <p className="text-sm text-ink-500">
                {dict.trust.points[0]}
              </p>
            </div>
            <WaitlistForm copy={dict.waitlist} />
          </div>
        </div>
      </section>
    </div>
  );
}
