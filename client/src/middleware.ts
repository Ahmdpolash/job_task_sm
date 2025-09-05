// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const PUBLIC_PATHS = ["/login", "/register"];

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // Public routes: anyone can access
  if (PUBLIC_PATHS.includes(pathname) || pathname === "/") {
    return NextResponse.next();
  }

  // If no token -> redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Decode and verify token using jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      console.log("Secret:", secret);
    const { payload } = await jose.jwtVerify(token, secret);
    
    console.log("Decoded Token:", payload);

    const role = payload.role as "admin" | "supervisor" | "student";

    // Role-based routing
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/supervisor") && role !== "supervisor") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/student") && role !== "student") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/supervisor/:path*",
    "/dashboard/student/:path*",
  ],
};
