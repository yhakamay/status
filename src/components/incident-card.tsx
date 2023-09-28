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
          <div className="flex justify-between pr-4">
            <div>
              <span className="font-semibold text-lg">{title}</span>
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
