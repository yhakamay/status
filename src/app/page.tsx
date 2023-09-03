import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          yhakamay status
        </Link>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>All systems operational</span>
        </div>
      </main>
    </>
  );
}
