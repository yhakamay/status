import Header from "@/components/header";
import IncidentCard from "@/components/incident-card";

export default async function Details({
  params,
}: {
  params: { slug: string };
}) {
  const incident: Incident = await fetchIncident(params.slug);
  const {
    title,
    scope,
    resolved,
    description,
    severity,
    start,
    end,
    relatesTo,
    steps,
  } = incident;
  const dateTimeOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  } satisfies Intl.DateTimeFormatOptions;

  return (
    <>
      <Header />
      <main className="flex min-h-screen max-w-screen-lg flex-col items-start p-6 md:p-24">
        <div className="flex justify-between pr-4">
          <div>
            <h1 className="font-semibold text-xl inline">{title}</h1>
            {resolved && (
              <div className="badge badge-success ml-2">resolved</div>
            )}
            <span
              className={`badge ml-2 ${
                severity === "major"
                  ? "badge-error"
                  : severity === "minor"
                  ? "badge-warning"
                  : "badge-info"
              }`}
            >
              {severity}
            </span>
          </div>
        </div>
        {description && (
          <p className="opacity-70 mt-2">{description.plaintext}</p>
        )}
        {scope !== (null || undefined) && (
          <p className="opacity-60 mt-2">Scope: {scope.join(", ")}</p>
        )}
        {start !== (null || undefined) && (
          <p className="opacity-60">
            Identified:{" "}
            {new Date(start).toLocaleString("en-US", dateTimeOptions)}
          </p>
        )}
        {resolved !== (null || undefined) && (
          <p className="opacity-60">
            Resolved:{" "}
            {resolved && end
              ? new Date(end).toLocaleString("en-US", dateTimeOptions)
              : "-"}
          </p>
        )}
        <h2 className="font-semibold text-lg mt-4">Steps taken:</h2>
        <ul className="steps steps-vertical opacity-70">
          <li className="step">Issue identified</li>
          {steps &&
            steps.map((step, index) => (
              <li key={index} className="step">
                {step}
              </li>
            ))}
        </ul>
        <h2 className="font-semibold text-lg mt-4">Relates to:</h2>
        {relatesTo.length === 0 ? (
          <p className="opacity-50 italic">N/A</p>
        ) : (
          relatesTo.map((incident) => {
            return <IncidentCard key={incident._path} incident={incident} />;
          })
        )}
      </main>
    </>
  );
}

async function fetchIncident(slug: string): Promise<Incident> {
  const res = await fetch(
    `${process.env.GRAPHQL_ENDPOINT}/incident-by-slug;slug=${slug}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch incident: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();
  return json.data.incidentList.items[0];
}
