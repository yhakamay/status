import Link from "next/link";

type IncidentCardProps = {
  incident: Incident;
};

export default function IncidentCard(props: IncidentCardProps) {
  const { incident } = props;
  const { title, scope, start, end, severity } = incident;
  const resolved = end !== null;
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
      <div className="card w-full bg-base-100 shadow-md mt-2">
        <Link href={`/incidents/${incident.slug}`}>
          <div className="card-body">
            <div className="flex justify-between pr-4">
              <div>
                <h1 className="font-semibold text-lg inline">{title}</h1>
                {resolved && (
                  <div className="badge badge-success ml-2">resolved</div>
                )}
                <span
                  className={`badge ml-2 ${
                    severity === "major"
                      ? "badge-error"
                      : severity === "minor"
                      ? "badge-warning"
                      : severity === "potential"
                      ? "badge-info"
                      : ""
                  }`}
                >
                  {severity}
                </span>
              </div>
            </div>
            {scope !== (null || undefined) && (
              <p className="opacity-70">Scope: {scope.join(", ")}</p>
            )}
            {start !== (null || undefined) && (
              <p className="opacity-70">
                Identified:{" "}
                {new Date(start).toLocaleString("en-US", dateTimeOptions)}
              </p>
            )}
            {resolved !== (null || undefined) && (
              <p className="opacity-70">
                Resolved:{" "}
                {resolved
                  ? new Date(end).toLocaleString("en-US", dateTimeOptions)
                  : "-"}
              </p>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}
