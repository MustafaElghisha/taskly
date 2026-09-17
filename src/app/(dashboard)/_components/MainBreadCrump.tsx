import { usePathname } from "next/navigation";

import {
  BreadcrumbSeparator,
  BreadCrump,
  BreadCrumpItem,
  BreadCrumpLink,
  BreadCrumpList,
  BreadCrumpPage,
} from "@/components/ui/BreadCrump";
import { Fragment } from "react/jsx-runtime";

const getRouteUrl = (pathName: string, route: string) => {
  const indexOfRoute = pathName.indexOf(route + "/");
  const routeUrl = pathName.substring(0, indexOfRoute + route.length + 1);
  return routeUrl;
};

export default function MainBreadCrump() {
  const pathName = usePathname();

  const routeSegments = pathName.split("/");
  routeSegments.shift();

  return (
    <BreadCrump className="hidden px-8 pt-6 sm:block">
      <BreadCrumpList>
        {routeSegments.map((route) => {
          const isLast = route === routeSegments.at(-1);

          return (
            <Fragment key={route}>
              <BreadCrumpItem>
                {isLast ? (
                  <BreadCrumpPage>{route}</BreadCrumpPage>
                ) : (
                  <BreadCrumpLink href={getRouteUrl(pathName, route)}>
                    {route}
                  </BreadCrumpLink>
                )}
              </BreadCrumpItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadCrumpList>
    </BreadCrump>
  );
}
