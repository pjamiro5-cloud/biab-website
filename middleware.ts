import { NextRequest, NextResponse } from "next/server";
import { isLocale, languageCookie, localizedPath, preferredLocale } from "@/lib/i18n/routing";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLocale(pathname.split("/")[1])) return NextResponse.next();
  const locale = preferredLocale(request.headers.get("accept-language"), request.cookies.get(languageCookie)?.value);
  const url = new URL(request.url);
  // Keep the incoming origin (including 127.0.0.1 during local preview).
  const host = request.headers.get("host");
  if (host) url.host = host;
  url.pathname = localizedPath(pathname, locale);
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = { matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\..*).*)"] };
