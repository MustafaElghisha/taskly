import { NextRequest, NextResponse } from "next/server";
import { accessTokenOptions, refreshTokenOptions } from "./lib/auth/session";

const protectedRoutes = ["/project"];
const publicRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/",
];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

async function refreshAccessToken(
  req: NextRequest,
  response: NextResponse,
  refreshToken: string,
) {
  const responseFromSupabase = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    },
  );

  const authResponse = await responseFromSupabase.json();

  if (!responseFromSupabase.ok) {
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return false;
  }

  response.cookies.set(
    "access_token",
    authResponse.access_token,
    accessTokenOptions,
  );

  response.cookies.set(
    "refresh_token",
    authResponse.refresh_token,
    refreshTokenOptions,
  );

  return true;
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const tempAccessToken = req.cookies.get("temp_access_token")?.value;

  const isProtectedRoute = matchesRoute(pathname, protectedRoutes);
  const isPublicRoute = matchesRoute(pathname, publicRoutes);

  if (isProtectedRoute && !accessToken && refreshToken) {
    const response = NextResponse.next();

    const refreshed = await refreshAccessToken(req, response, refreshToken);

    if (!refreshed) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return response;
  }

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/project", req.url));
  }

  if (pathname === "/reset-password") {
    if (!tempAccessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
