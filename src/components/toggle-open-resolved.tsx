"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ToggleOpenResolved() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const currentStatus = searchParams.get("status") ?? null;
    setChecked(currentStatus === "open" ? true : false);
  }, [searchParams]);

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
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text mr-2 uppercase">Open only</span>
        <input
          type="checkbox"
          className="toggle"
          checked={checked}
          onClick={() => {
            router.push(
              pathname +
                "?" +
                createQueryString("status", checked ? null : "open")
            );
            setChecked(!checked);
          }}
        />
      </label>
    </div>
  );
}
