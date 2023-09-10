type IncidentCardProps = {
  incident: Incident;
};

export default function IncidentCard(props: IncidentCardProps) {
  const { incident } = props;
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
    <>
      <div key={_path} className="collapse bg-base-200 mt-4">
        <input type="checkbox" />
        <div className="collapse-title flex justify-between pr-4">
          {title}
          <div>
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
            {resolved && (
              <span className={`badge badge-md badge-success ml-1`}>
                {status}
              </span>
            )}
          </div>
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
              Resolved: {resolved ? new Date(resolved).toLocaleString() : "-"}
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
    </>
  );
}
