import Link from "next/link";

export default function Header() {
  return (
    <div className="navbar bg-base-100" role="navigation">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
        Yusuke&apos;s Status
      </Link>
    </div>
  );
}
