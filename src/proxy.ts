import { NextRequest, NextResponse } from "next/server";
import { accessTokenOptions, refreshTokenOptions } from "./lib/auth/session";

const protectedRoutes = ["/project", "/invite"];
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

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/login", req.url);

  const token = req.nextUrl.searchParams.get("token");

  if (token) {
    const redirect = `${req.nextUrl.pathname}${req.nextUrl.search}`;
    loginUrl.searchParams.set("redirect", redirect);
  }

  return NextResponse.redirect(loginUrl);
}

async function refreshAccessToken(
  response: NextResponse,
  refreshToken: string,
) {
  const responseFromSupabase = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SECRET_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    },
  );

  if (!responseFromSupabase.ok) {
    return false;
  }

  const authResponse = await responseFromSupabase.json();

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

  if (isProtectedRoute && !accessToken) {
    if (refreshToken) {
      const response = NextResponse.next();

      try {
        const refreshed = await refreshAccessToken(response, refreshToken);

        if (refreshed) {
          return response;
        }
      } catch {
        // Continue to login if refreshing fails.
      }

      const loginResponse = redirectToLogin(req);

      loginResponse.cookies.delete("access_token");
      loginResponse.cookies.delete("refresh_token");

      return loginResponse;
    }

    return redirectToLogin(req);
  }

  if (isPublicRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/project", req.url));
  }

  if (pathname === "/reset-password" && !tempAccessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
