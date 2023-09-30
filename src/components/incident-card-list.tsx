"use client";

import { useSearchParams } from "next/navigation";

import IncidentCard from "./incident-card";

type IncidentCardListProps = {
  incidents: Incident[];
};

export default function IncidentCardList(props: IncidentCardListProps) {
  const { incidents } = props;
  const searchParams = useSearchParams();
  const status =
    searchParams.get("status") === "resolved"
      ? true
      : searchParams.get("status") === "open"
      ? false
      : null;
  const severity =
    searchParams.get("severity") === "major"
      ? "major"
      : searchParams.get("severity") === "minor"
      ? "minor"
      : searchParams.get("severity") === "potential"
      ? "potential"
      : null;

  const filteredIncidents = incidents.filter(
    (incident) =>
      (status === null || incident.resolved === status) &&
      (severity === null || incident.severity === severity)
  );

  return (
    <>
      {filteredIncidents.map((incident) => {
        return <IncidentCard key={incident._path} incident={incident} />;
      })}
    </>
  );
}
