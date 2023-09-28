type Incident = {
  _path: string;
  title: string;
  slug: string;
  scope: string[];
  resolved: boolean;
  description: Description;
  severity: string;
  start: string;
  end: string | null;
  relatesTo: Incident[];
  steps: string[];
};
