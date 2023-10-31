import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isUserLoggedIn } from "./helper/serverActions";

// This function can be marked `async` if using `await` inside
// const authRoutes = ["/board", "/contacts", "/add-task", "/summary"];
export function middleware(request: NextRequest) {
  const response = NextResponse;
  const newHeaders = new Headers(request.headers);

  if (isUserLoggedIn()) {
    if (request.nextUrl.pathname === "/") return NextResponse.redirect(new URL("/summary", request.url));
  }

  return response.next({ request: { headers: newHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
