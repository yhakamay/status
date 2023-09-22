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
  relatesTo: RelatesTo[];
  steps: string[];
};

// Just a helper type to make the code more readable
type RelatesTo = {
  title: string;
  slug: string;
};
