import Link from "next/link";

import OverallStatus from "@/components/overall-status";

export default async function Home() {
  const incidents: Incident[] = await fetchIncidents();
  incidents.sort((a, b) => {
    if (a.identified < b.identified) {
      return 1;
    }
    if (a.identified > b.identified) {
      return -1;
    }
    return 0;
  });
  const countMajor = incidents.filter(
    (incident) => incident.severity === "major" && !incident.resolved
  ).length;
  const countMinor = incidents.filter(
    (incident) => incident.severity === "minor" && !incident.resolved
  ).length;
  const countPotential = incidents.filter(
    (incident) => incident.severity === "potential" && !incident.resolved
  ).length;

  return (
    <>
      <div className="navbar bg-base-100" role="navigation">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          yhakamay status
        </Link>
      </div>
      <main className="flex min-h-screen max-w-screen-lg flex-col items-center p-12 md:p-24">
        <OverallStatus
          countMajor={countMajor}
          countMinor={countMinor}
          countPotential={countPotential}
        />
        {incidents.map((incident) => {
          const {
            _path,
            title,
            componentsAffected,
            identified,
            resolved,
            severity,
            steps,
          } = incident;
          const status = resolved ? "resolved" : "ongoing";

          return (
            <div
              key={_path}
              className="collapse collapse-plus bg-base-200 mt-4"
            >
              <input type="radio" aria-label="toggle" />
              <div className="collapse-title">
                {title}{" "}
                <span
                  className={`badge badge-md ${
                    severity === "major"
                      ? "badge-error"
                      : severity === "minor"
                      ? "badge-warning"
                      : "badge-info"
                  }`}
                >
                  {severity}
                </span>
                {resolved && (
                  <span className={`badge badge-md badge-success ml-1`}>
                    {status}
                  </span>
                )}
              </div>
              <div className="collapse-content">
                {componentsAffected !== (null || undefined) && (
                  <p className="opacity-70">
                    Component(s) affected: {componentsAffected.join(", ")}
                  </p>
                )}
                {identified !== (null || undefined) && (
                  <p className="opacity-70">
                    Identified: {new Date(identified).toLocaleString()}
                  </p>
                )}
                {resolved !== (null || undefined) && (
                  <p className="opacity-70">
                    Resolved:{" "}
                    {resolved ? new Date(resolved).toLocaleString() : "-"}
                  </p>
                )}
                <ul className="steps steps-vertical opacity-70">
                  <li className="step">
                    Identified ({new Date(identified).toLocaleString()})
                  </li>
                  {steps.map((step, index) => {
                    return (
                      <li key={index} className="step">
                        {step.summary}{" "}
                        {step.occurred &&
                          `(${new Date(step.occurred).toLocaleString()})`}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}

async function fetchIncidents(): Promise<Incident[]> {
  const res = await fetch(`${process.env.GRAPHQL_ENDPOINT}/incidents-all`, {
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch incidents: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();
  const incidents = json.data.incidentList.items;

  return incidents;
}
