import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReportDownloadButton from "../../../../components/ReportDownloadButton";
import { getIncidentById } from "../../../../lib/store";
import { getDictionary, locales, type Locale } from "../../../../lib/i18n";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params
}: {
  params: { locale: string; id: string };
}): Metadata {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    return {};
  }
  const dict = getDictionary(locale);
  return {
    title: `${dict.incident.status.title} | Srebi`,
    description: dict.meta.description
  };
}

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

export default async function IncidentStatusPage({
  params
}: {
  params: { locale: string; id: string };
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
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
            {dict.incident.status.title}
          </h1>
          <p className="mt-2 text-sm text-ink-500">{dict.incident.status.subtitle}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6">
              <p className="text-sm font-semibold text-ink-900">
                {dict.incident.status.fieldsTitle}
              </p>
              <dl className="mt-4 space-y-2 text-sm text-ink-600">
                {incident.email ? (
                  <div>
                    <dt className="font-semibold">{dict.incident.form.email}</dt>
                    <dd>{incident.email}</dd>
                  </div>
                ) : null}
                {incident.company ? (
                  <div>
                    <dt className="font-semibold">{dict.incident.form.company}</dt>
                    <dd>{incident.company}</dd>
                  </div>
                ) : null}
                {incident.system ? (
                  <div>
                    <dt className="font-semibold">{dict.incident.form.system}</dt>
                    <dd>{incident.system}</dd>
                  </div>
                ) : null}
                {incident.notes ? (
                  <div>
                    <dt className="font-semibold">{dict.incident.form.notes}</dt>
                    <dd>{incident.notes}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6">
              <p className="text-sm font-semibold text-ink-900">
                {dict.incident.status.filesTitle}
              </p>
              {incident.files.length === 0 ? (
                <p className="mt-4 text-sm text-ink-500">
                  {dict.incident.status.empty}
                </p>
              ) : (
                <ul className="mt-4 space-y-3 text-sm text-ink-600">
                  {incident.files.map((file) => (
                    <li key={file.objectKey} className="rounded-xl bg-white p-3">
                      <p className="font-semibold text-ink-900">{file.fileName}</p>
                      <p className="text-xs text-ink-500">
                        {file.role === "video"
                          ? dict.incident.status.roleVideo
                          : dict.incident.status.roleLogs}
                        · {formatSize(file.size)} · {dict.incident.status.uploadedAt}
                        : {new Date(file.uploadedAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 rounded-xl bg-white p-4">
                <p className="text-sm font-semibold text-ink-900">
                  {dict.incident.report.title}
                </p>
                {incident.report?.status === "ready" ? (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-ink-500">
                      {dict.incident.report.ready}
                    </p>
                    <ReportDownloadButton
                      incidentId={incident.id}
                      copy={{
                        download: dict.incident.report.download,
                        error: dict.incident.report.error
                      }}
                    />
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-ink-500">
                    {dict.incident.report.notReady}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`/${locale}/incident/new`}
              className="text-sm font-semibold text-ink-700 hover:text-ink-900"
            >
              {dict.incident.status.back}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
