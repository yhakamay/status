import Header from "@/components/header";
import IncidentCard from "@/components/incident-card";
import OverallStatus from "@/components/overall-status";

export default async function Home() {
  const incidents: Incident[] = await fetchIncidents();
  incidents.sort((a, b) => {
    if (a.start < b.start) {
      return 1;
    }
    if (a.start > b.start) {
      return -1;
    }
    return 0;
  });
  const countMajor = incidents.filter(
    (incident) => incident.severity === "major" && incident.resolved === false
  ).length;
  const countMinor = incidents.filter(
    (incident) => incident.severity === "minor" && incident.resolved === false
  ).length;
  const countPotential = incidents.filter(
    (incident) =>
      incident.severity === "potential" && incident.resolved === false
  ).length;

  return (
    <>
      <Header />
      <main className="flex min-h-screen max-w-screen-lg flex-col items-center p-6 md:p-24">
        {countMajor > 0 && <OverallStatus type="major" count={countMajor} />}
        {countMinor > 0 && <OverallStatus type="minor" count={countMinor} />}
        {countPotential > 0 && (
          <OverallStatus type="potential" count={countPotential} />
        )}
        {incidents.length === 0 && (
          <OverallStatus type="operational" count={incidents.length} />
        )}
        {incidents.map((incident) => {
          return <IncidentCard key={incident._path} incident={incident} />;
        })}
      </main>
    </>
  );
}

async function fetchIncidents(): Promise<Incident[]> {
  const res = await fetch(`${process.env.GRAPHQL_ENDPOINT}/incidents-all-v2`, {
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
