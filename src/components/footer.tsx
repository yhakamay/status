import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 text-base-content">
      <nav className="grid grid-flow-col gap-2">
        <span>
          View source on{" "}
          <Link
            href="https://github.com/yhakamay/status/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            GitHub
          </Link>
        </span>
      </nav>
    </footer>
  );
}
