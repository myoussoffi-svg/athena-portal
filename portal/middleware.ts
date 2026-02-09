import { clerkMiddleware } from '@clerk/nextjs/server';

// Simple function to check if a route is public
function isPublicRoute(pathname: string): boolean {
  // Exact matches
  const exactPublic = ['/', '/terms', '/privacy', '/refund-policy'];
  if (exactPublic.includes(pathname)) return true;

  // Prefix matches
  const prefixPublic = ['/sign-in', '/sign-up', '/preview', '/courses', '/track', '/api/inngest', '/api/stripe/webhook'];
  for (const prefix of prefixPublic) {
    if (pathname.startsWith(prefix)) return true;
  }

  return false;
}

// Protected API routes
function isProtectedApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/interview') || pathname.startsWith('/api/admin');
}

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;

  // Protect API routes that require auth
  if (isProtectedApiRoute(pathname)) {
    await auth.protect();
    return;
  }

  // For non-public routes, require auth
  if (!isPublicRoute(pathname)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
