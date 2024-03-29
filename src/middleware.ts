import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/board", "/contacts", "/add-task", "/summary"];
export function middleware(request: NextRequest) {
  const response = NextResponse;
  const newHeaders = new Headers(request.headers);

  if (request.cookies.get("authToken")) {
    if (request.nextUrl.pathname === "/") return response.redirect(new URL("/summary", request.url));
  } else if (!request.cookies.get("authToken") && authRoutes.includes(request.nextUrl.pathname)) {
    return response.rewrite(new URL("/", request.url));
  }

  return response.next({ request: { headers: newHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
