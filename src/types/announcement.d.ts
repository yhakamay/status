type Announcement = {
  _path: string;
  title: string;
  slug: string;
  description?: Description;
  primaryImage?: Image;
  images?: Image[];
  dateTime?: string;
  relatesTo?: any[];
  relatedLinks?: string[];
};
