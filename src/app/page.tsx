import AnnouncementCard from "@/components/announcement-card";
import FilterBySeverity from "@/components/filter-by-severity";
import IncidentCardList from "@/components/incident-card-list";
import OverallStatus from "@/components/overall-status";
import ToggleOpenResolved from "@/components/toggle-open-resolved";

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

  const announcements: Announcement[] = await fetchAnnouncements();
  announcements.sort((a, b) => {
    if (a.dateTime! < b.dateTime!) {
      return 1;
    }
    if (a.dateTime! > b.dateTime!) {
      return -1;
    }
    return 0;
  });

  return (
    <main className="flex max-w-screen-lg flex-col items-center p-6 md:p-24">
      {countMajor > 0 && <OverallStatus type="major" count={countMajor} />}
      {countMinor > 0 && <OverallStatus type="minor" count={countMinor} />}
      {countPotential > 0 && (
        <OverallStatus type="potential" count={countPotential} />
      )}
      <div className="w-full flex justify-end items-center gap-4">
        <ToggleOpenResolved />
        <FilterBySeverity />
      </div>
      {incidents.length === 0 && (
        <OverallStatus type="operational" count={incidents.length} />
      )}
      <IncidentCardList incidents={incidents} />
      {announcements.map((announcement) => {
        return (
          <AnnouncementCard
            announcement={announcement}
            key={announcement.slug}
          />
        );
      })}
    </main>
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

async function fetchAnnouncements(): Promise<Announcement[]> {
  const res = await fetch(`${process.env.GRAPHQL_ENDPOINT}/announcements-all`, {
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch announcements: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();
  const announcements = json.data.announcementList.items;

  return announcements;
}
