import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/project"];
const publicRoutes = ["/login", "/sign-up"];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isProtectedRoute = matchesRoute(pathname, protectedRoutes);
  const isPublicRoutes = matchesRoute(pathname, publicRoutes);

  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoutes && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/project", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
