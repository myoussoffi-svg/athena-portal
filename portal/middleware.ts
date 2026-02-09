import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/preview(.*)',   // Course preview pages for prospective buyers
  '/courses(.*)',   // Course purchase pages
  '/track(.*)',     // Course content is public for now
  '/api/inngest(.*)',
  '/api/stripe/webhook(.*)',
  '/terms',
  '/privacy',
  '/refund-policy',
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
    // Skip Next.js internals, static files, and public marketing pages
    '/((?!_next|preview|courses|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
