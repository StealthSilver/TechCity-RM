import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "spardha_session";

function secretKey() {
  const value = process.env.JWT_SECRET;
  if (!value) return null;
  return new TextEncoder().encode(value);
}

async function hasSession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const key = secretKey();
  if (!token || !key) return false;

  try {
    const { payload } = await jwtVerify(token, key);
    return Boolean(payload.sub);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect individual roadmap pages: /all/:slug (not /all itself)
  const match = pathname.match(/^\/all\/([^/]+)\/?$/);
  if (!match) {
    return NextResponse.next();
  }

  if (await hasSession(request)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/all";
  url.searchParams.set("auth", "login");
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/all/:slug"],
};
