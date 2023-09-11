// The base type for Incident and Announcement
type LifeActivity = {
  _path: string;
  title: string;
  slug: string;
  description: {
    plaintext: string;
  };
  relatesTo: Array<{ title: string; slug: string }>;
  start: string;
};
