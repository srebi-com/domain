import { notFound } from "next/navigation";
import IncidentSubmission from "../../../../components/IncidentSubmission";
import { getDictionary, locales, type Locale } from "../../../../lib/i18n";

export default function IncidentNewPage({
  params
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return <IncidentSubmission locale={locale} copy={dict.incident} />;
}
