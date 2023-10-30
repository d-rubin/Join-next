import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isUserLoggedIn } from "../helper/serverActions";

// This function can be marked `async` if using `await` inside
const authRoutes = ["/board", "/contacts", "/add-task", "/summary"];
export function middleware(request: NextRequest) {
  console.log(request.nextUrl);
  if (isUserLoggedIn() && authRoutes.includes(request.nextUrl.pathname)) return NextResponse.rewrite("/");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
