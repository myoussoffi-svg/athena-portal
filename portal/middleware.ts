import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/track(.*)', // Course content is public for now
  '/api/inngest(.*)', // Inngest webhook endpoint
  '/api/stripe/webhook(.*)', // Stripe webhook endpoint
]);

// Define API routes that require authentication
const isProtectedApiRoute = createRouteMatcher([
  '/api/interview(.*)',
  '/api/admin(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // Protect API routes
  if (isProtectedApiRoute(request)) {
    await auth.protect();
  }

  // For non-public routes, require auth
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
