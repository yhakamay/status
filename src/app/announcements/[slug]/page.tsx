import Image from "next/image";
import Link from "next/link";

export default async function AnnouncementDetails({
  params,
}: {
  params: { slug: string };
}) {
  const announcement: Announcement = await fetchAnnouncement(params.slug);
  const {
    title,
    description,
    primaryImage,
    images,
    dateTime,
    relatesTo,
    relatedLinks,
  } = announcement;
  const dateTimeOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  } satisfies Intl.DateTimeFormatOptions;

  return (
    <main className="flex max-w-screen-lg flex-col items-start p-6 md:p-24">
      <div className="flex justify-between items-baseline w-full">
        <h1 className="font-semibold text-xl inline">{title}</h1>
        {dateTime && (
          <p className="opacity-50">
            {new Date(dateTime).toLocaleString("en-US", dateTimeOptions)}
          </p>
        )}
      </div>
      {description && (
        <p className="opacity-70 mt-4">{description.plaintext}</p>
      )}
      <Image
        src={`https://${process.env.AEM_HOSTNAME}${primaryImage?._dynamicUrl}`}
        width={primaryImage?.width}
        height={primaryImage?.height}
        alt={""}
        className="mt-4 rounded-box h-96 max-w-md"
        layout="responsive"
      />
      <div className="carousel rounded-box mt-4">
        {images?.map((image) => {
          return (
            <div className="carousel-item h-48" key={image._dynamicUrl}>
              <Image
                src={`https://${process.env.AEM_HOSTNAME}${image._dynamicUrl}`}
                width={image.width}
                height={image.height}
                alt={""}
                className="rounded-box mr-2 border-2"
                layout="responsive"
              />
            </div>
          );
        })}
      </div>
      <h2 className="font-semibold text-lg mt-4">Relates to:</h2>
      {relatesTo === undefined || relatesTo.length === 0 ? (
        <p className="opacity-50 italic">N/A</p>
      ) : (
        relatesTo.map((announcement) => {
          return (
            // TODO: Replace link with a card
            <Link
              href={`/announcements/${announcement.slug}`}
              key={announcement.slug}
            >
              <a className="link">{announcement.title}</a>
            </Link>
          );
        })
      )}
      {
        <div className="flex flex-col">
          <h2 className="font-semibold text-lg mt-4">Links:</h2>
          {relatedLinks === undefined || relatedLinks.length === 0 ? (
            <p className="opacity-50 italic">N/A</p>
          ) : (
            relatedLinks.map((link) => {
              return (
                <Link
                  href={link}
                  key={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {link}
                </Link>
              );
            })
          )}
        </div>
      }
    </main>
  );
}

async function fetchAnnouncement(slug: string): Promise<Announcement> {
  const res = await fetch(
    `${process.env.GRAPHQL_ENDPOINT}/announcement-by-slug;slug=${slug}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch incident: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();
  return json.data.announcementList.items[0];
}
