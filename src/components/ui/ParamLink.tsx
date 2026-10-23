"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ParamLinkInner({
  href,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  const searchParams = useSearchParams();
  const hrefWithParams = searchParams.size ? `${href}?${searchParams}` : href;
  return <Link href={hrefWithParams} {...props} />;
}

export default function ParamLink(
  props: React.ComponentPropsWithoutRef<typeof Link>,
) {
  return (
    <Suspense fallback={<Link {...props} />}>
      <ParamLinkInner {...props} />
    </Suspense>
  );
}
