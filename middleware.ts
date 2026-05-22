import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAppRoute = request.nextUrl.pathname.startsWith("/app");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") ||
                      request.nextUrl.pathname.startsWith("/register");

  if ((isAppRoute || isAdminRoute) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api/health|_next/static|_next/image|favicon.ico).*)"],
};
