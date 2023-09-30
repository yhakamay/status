"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function FilterBySeverity() {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={0}
        className={`btn btn-sm m-1 font-normal ${
          searchParams.get("severity") === "major"
            ? "btn-error"
            : searchParams.get("severity") === "minor"
            ? "btn-warning"
            : searchParams.get("severity") === "potential"
            ? "btn-info"
            : "btn-outline"
        }`}
      >
        Severity
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className="fill-current"
        >
          <path d="M440-240q-17 0-28.5-11.5T400-280q0-17 11.5-28.5T440-320h80q17 0 28.5 11.5T560-280q0 17-11.5 28.5T520-240h-80ZM280-440q-17 0-28.5-11.5T240-480q0-17 11.5-28.5T280-520h400q17 0 28.5 11.5T720-480q0 17-11.5 28.5T680-440H280ZM160-640q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href={pathname + "?" + createQueryString("severity", null)}>
            All
          </Link>
        </li>
        <li>
          <Link href={pathname + "?" + createQueryString("severity", "major")}>
            Major
          </Link>
        </li>
        <li>
          <Link href={pathname + "?" + createQueryString("severity", "minor")}>
            Minor
          </Link>
        </li>
        <li>
          <Link
            href={pathname + "?" + createQueryString("severity", "potential")}
          >
            Potential
          </Link>
        </li>
      </ul>
    </div>
  );
}
