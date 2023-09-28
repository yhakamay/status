type IncidentCardProps = {
  incident: Incident;
};

export default function IncidentCard(props: IncidentCardProps) {
  const { incident } = props;
  const { title, scope, start, end, severity, steps } = incident;
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
      <div className="card w-full bg-base-100 shadow-xl mt-4">
        <div className="card-body">
          <div className="card-title flex justify-between pr-4">
            <div>
              {title}
              {resolved && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-4 w-4 inline-block ml-2 text-success"
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
              )}
            </div>
            <span
              className={`badge badge-md ml-2 ${
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
          <ul className="steps steps-vertical opacity-70">
            <li className="step">Issue identified</li>
            {steps &&
              steps.map((step, index) => (
                <li key={index} className="step">
                  {step}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
