import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET; // Ensure this is set in your environment variables

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define routes that should be excluded from authentication
  const publicRoutes = ['/login', '/register', '/error', '/'];

  // Check if the current route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the token from the request cookies
  const token = await getToken({ req: request, secret });

  // Check if the user is authenticated
  if (!token) {
    // Redirect to login page if not authenticated
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply this middleware to all routes except those in `publicRoutes`
export const config = {
  matcher: ['/', '/((?!api|static|public|_next).*)'],
};
