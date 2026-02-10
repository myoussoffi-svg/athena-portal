import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/preview(.*)',
  '/courses(.*)',
  '/track(.*)',
  '/terms',
  '/privacy',
  '/refund-policy',
  '/api/inngest(.*)',
  '/api/stripe/webhook(.*)',
  '/api/clerk/webhook(.*)',
  '/api/og',
  '/api/icon',
]);

// Protected API routes that always require authentication
const isProtectedRoute = createRouteMatcher([
  '/api/interview(.*)',
  '/api/admin(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // Always protect these routes
  if (isProtectedRoute(request)) {
    await auth.protect();
    return;
  }

  // Protect non-public routes
  if (!isPublicRoute(request)) {
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
