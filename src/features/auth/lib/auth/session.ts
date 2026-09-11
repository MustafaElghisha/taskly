const STORAGE_KEY = "auth_session";

export type Session = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  createdAt: number;
  rememberMe: boolean;
};

export function saveSession(
  session: Omit<Session, "rememberMe" | "createdAt">,
  rememberMe: boolean,
) {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...session, rememberMe, createdAt: Date.now() }),
  );
}

export function getSession(): Session | null {
  return (
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") ??
    JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null")
  );
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isTokenExpired(session: Session): boolean {
  return Date.now() / 1000 >= session.expires_at;
}

export async function refreshAccessToken(
  session: Session,
): Promise<string | null> {
  if (!session.rememberMe) {
    if (isTokenExpired(session)) {
      clearSession();
      return null;
    }
    return session.access_token;
  }

  const monthOver = Date.now() - session.createdAt > 30 * 24 * 60 * 60 * 1000;
  if (isTokenExpired(session) && monthOver) {
    clearSession();
    return null;
  }

  if (isTokenExpired(session)) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`,
        },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
      },
    );

    if (!res.ok) {
      clearSession();
      return null;
    }

    const data = await res.json();
    const updated: Session = {
      ...session,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.access_token;
  }

  return session.access_token;
}
