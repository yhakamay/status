type Incident = LifeActivity & {
  scope: string[];
  severity: "minor" | "major" | "potential";
  end: string | null;
  steps: string[] | null;
};
