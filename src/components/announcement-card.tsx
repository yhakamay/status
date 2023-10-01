import Image from "next/image";
import Link from "next/link";

type AnnouncementCardProps = {
  announcement: Announcement;
};

export default function AnnouncementCard(props: AnnouncementCardProps) {
  const { announcement } = props;
  const { title, slug, description, dateTime, primaryImage } = announcement;
  const dateTimeOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  } satisfies Intl.DateTimeFormatOptions;

  return (
    <>
      <Link
        href={`/announcements/${slug}`}
        className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-box mt-6 p-0.5 w-full"
      >
        <div className="card card-side bg-base-100 border-none">
          <div className="card-body">
            <h1 className="font-semibold text-lg inline">{title}</h1>
            {dateTime !== (null || undefined) && (
              <p className="opacity-70">
                {new Date(dateTime).toLocaleString("en-US", dateTimeOptions)}
              </p>
            )}
            {description !== (null || undefined) && (
              <p className="opacity-70">
                {description.plaintext.slice(0, 100)}
              </p>
            )}
          </div>
          <figure className="max-w-[12rem]">
            <Image
              src={`https://${process.env.AEM_HOSTNAME}${primaryImage?._dynamicUrl}`}
              alt={primaryImage?.description ?? ""}
              title={primaryImage?.title ?? ""}
              width={primaryImage?.width}
              height={primaryImage?.height}
              layout="responsive"
            />
          </figure>
        </div>
      </Link>
    </>
  );
}
