"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ParamLink({
  href,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  const searchParams = useSearchParams();

  const hrefWithParams = searchParams.size ? `${href}?${searchParams}` : href;
  return <Link href={hrefWithParams} {...props} />;
}
