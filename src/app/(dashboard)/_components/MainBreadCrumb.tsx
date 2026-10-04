import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

import {
  BreadcrumbSeparator,
  BreadCrumb,
  BreadCrumbItem,
  BreadCrumbLink,
  BreadCrumbList,
  BreadCrumbPage,
} from "@/components/ui/BreadCrumb";
import { useProject } from "@/features/project/hooks/useProject";

const getRouteUrl = (pathname: string, route: string) => {
  const indexOfRoute = pathname.indexOf(route + "/");
  const routeUrl = pathname.substring(0, indexOfRoute + route.length + 1);
  return routeUrl;
};

export default function MainBreadCrumb() {
  const pathname = usePathname();
  const { project } = useProject();

  const routeSegments = pathname.split("/");
  routeSegments.shift();

  if (routeSegments.length === 1) return null;

  return (
    <BreadCrumb>
      <BreadCrumbList>
        {routeSegments.map((route) => {
          const isLast = route === routeSegments.at(-1);

          return (
            <Fragment key={route}>
              <BreadCrumbItem>
                {isLast ? (
                  <BreadCrumbPage>{route}</BreadCrumbPage>
                ) : (
                  <BreadCrumbLink href={getRouteUrl(pathname, route)}>
                    {route === project?.id ? project.name : route}
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
