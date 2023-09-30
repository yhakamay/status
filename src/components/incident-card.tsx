import Link from "next/link";

type IncidentCardProps = {
  incident: Incident;
};

export default function IncidentCard(props: IncidentCardProps) {
  const { incident } = props;
  const { title, scope, start, end, severity, resolved } = incident;
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
      <div className="indicator w-full mt-6">
        {resolved && (
          <span className="indicator-item badge badge-success mr-6">
            resolved
          </span>
        )}
        <div className="card bg-base-100 shadow-md w-full">
          <Link href={`/incidents/${incident.slug}`}>
            <div className="card-body">
              <div className="flex justify-between pr-4">
                <div>
                  <h1 className="font-semibold text-lg inline">{title}</h1>
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
                  {resolved && end
                    ? new Date(end).toLocaleString("en-US", dateTimeOptions)
                    : "-"}
                </p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
