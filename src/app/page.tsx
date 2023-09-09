import Link from "next/link";

export default async function Home() {
  const incidents: Incident[] = await fetchIncidents();

  return (
    <>
      <div className="navbar bg-base-100">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          yhakamay status
        </Link>
      </div>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>All systems operational</span>
        </div>
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
          const status = resolved ? "ongoing" : "resolved";

          return (
            <div key={_path} className="collapse collapse-plus bg-base-200">
              <input type="radio" aria-label="toggle" />
              <div className="collapse-title text-lg">{title}</div>
              <div className="collapse-content">
                {componentsAffected !== (null || undefined) && (
                  <p className="opacity-70">
                    Component(s) affected: {componentsAffected.join(", ")}
                  </p>
                )}
                {status !== (null || undefined) && (
                  <p className="opacity-70">Status: {status}</p>
                )}
                {severity !== (null || undefined) && (
                  <p className="opacity-70">Severity: {severity}</p>
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
                    Issue identified ({new Date(identified).toLocaleString()})
                  </li>
                  {steps.map((step) => {
                    return (
                      <li key={step._path} className="step">
                        {step}
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
