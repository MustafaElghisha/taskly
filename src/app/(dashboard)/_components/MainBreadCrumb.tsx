import { usePathname } from "next/navigation";

import {
  BreadcrumbSeparator,
  BreadCrumb,
  BreadCrumbItem,
  BreadCrumbLink,
  BreadCrumbList,
  BreadCrumbPage,
} from "@/components/ui/BreadCrumb";
import { Fragment } from "react/jsx-runtime";

const getRouteUrl = (pathName: string, route: string) => {
  const indexOfRoute = pathName.indexOf(route + "/");
  const routeUrl = pathName.substring(0, indexOfRoute + route.length + 1);
  return routeUrl;
};

export default function MainBreadCrumb() {
  const pathName = usePathname();

  const routeSegments = pathName.split("/");
  routeSegments.shift();

  if (routeSegments.length === 1) return null;

  return (
    <BreadCrumb className="hidden px-8 pt-6 sm:block">
      <BreadCrumbList>
        {routeSegments.map((route) => {
          const isLast = route === routeSegments.at(-1);

          return (
            <Fragment key={route}>
              <BreadCrumbItem>
                {isLast ? (
                  <BreadCrumbPage>{route}</BreadCrumbPage>
                ) : (
                  <BreadCrumbLink href={getRouteUrl(pathName, route)}>
                    {route}
                  </BreadCrumbLink>
                )}
              </BreadCrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadCrumbList>
    </BreadCrumb>
  );
}
