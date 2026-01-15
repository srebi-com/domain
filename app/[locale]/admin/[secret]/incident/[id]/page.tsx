import { notFound } from "next/navigation";
import AdminReportUploadForm from "../../../../../../components/AdminReportUploadForm";
import { getIncidentById } from "../../../../../../lib/store";
import { getDictionary, locales, type Locale } from "../../../../../../lib/i18n";

export const dynamic = "force-dynamic";

function formatSize(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** index;
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export default async function AdminIncidentReportPage({
  params
}: {
  params: { locale: string; secret: string; id: string };
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  if (!process.env.ADMIN_SECRET || params.secret !== process.env.ADMIN_SECRET) {
    notFound();
  }

  const dict = getDictionary(locale);
  const incident = await getIncidentById(params.id);
  if (!incident) {
    notFound();
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl border border-mist-200 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            {dict.admin.title}
          </h1>
          <p className="mt-2 text-sm text-ink-500">{dict.admin.subtitle}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6">
              <p className="text-sm font-semibold text-ink-900">
                {dict.admin.summaryTitle}
              </p>
              <p className="mt-2 text-xs text-ink-500">ID: {incident.id}</p>
              {incident.report?.status === "ready" ? (
                <p className="mt-3 text-xs font-semibold text-neon-500">
                  {dict.admin.reportReady}
                </p>
              ) : (
                <p className="mt-3 text-xs text-ink-500">
                  {dict.admin.reportMissing}
                </p>
              )}
              <div className="mt-4">
                <p className="text-xs font-semibold text-ink-700">
                  {dict.admin.filesTitle}
                </p>
                {incident.files.length === 0 ? (
                  <p className="mt-2 text-xs text-ink-500">
                    {dict.admin.noFiles}
                  </p>
                ) : (
                  <ul className="mt-2 space-y-2 text-xs text-ink-600">
                    {incident.files.map((file) => (
                      <li key={file.objectKey}>
                        {file.fileName} · {formatSize(file.size)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <AdminReportUploadForm
              incidentId={incident.id}
              locale={locale}
              secret={params.secret}
              copy={dict.admin}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
