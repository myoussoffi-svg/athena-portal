import { auth } from '@clerk/nextjs/server';
import { db, interviewViewers } from '@/db';
import { eq, and } from 'drizzle-orm';

/**
 * API Error class for consistent error responses
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(code);
    this.name = 'ApiError';
  }

  toResponse() {
    return Response.json(
      {
        error: this.code,
        ...this.details,
      },
      { status: this.statusCode }
    );
  }
}

/**
 * Require authentication and return the user ID.
 * Throws 401 if not authenticated.
 */
export async function requireAuth(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new ApiError(401, 'UNAUTHORIZED');
  }

  return userId;
}

/**
 * Require admin role.
 * Returns the user ID if authorized.
 * Throws 401 if not authenticated, 403 if not an admin.
 */
export async function requireAdmin(): Promise<string> {
  const userId = await requireAuth();

  const viewer = await db.query.interviewViewers.findFirst({
    where: and(
      eq(interviewViewers.userId, userId),
      eq(interviewViewers.role, 'admin')
    ),
  });

  if (!viewer) {
    throw new ApiError(403, 'FORBIDDEN', {
      message: 'Admin access required',
    });
  }

  return userId;
}

/**
 * Require viewer role (admin or viewer).
 * Returns the user ID and role if authorized.
 * Throws 401 if not authenticated, 403 if not a viewer.
 */
export async function requireViewer(): Promise<{
  userId: string;
  role: 'admin' | 'viewer';
}> {
  const userId = await requireAuth();

  const viewer = await db.query.interviewViewers.findFirst({
    where: eq(interviewViewers.userId, userId),
  });

  if (!viewer) {
    throw new ApiError(403, 'FORBIDDEN', {
      message: 'Viewer access required',
    });
  }

  return { userId, role: viewer.role };
}

/**
 * Check if user is an admin (non-throwing version).
 * Returns true if user is authenticated and has admin role.
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const { userId } = await auth();
    if (!userId) return false;

    const viewer = await db.query.interviewViewers.findFirst({
      where: and(
        eq(interviewViewers.userId, userId),
        eq(interviewViewers.role, 'admin')
      ),
    });

    return !!viewer;
  } catch {
    return false;
  }
}

/**
 * Wrapper for API route handlers with error handling.
 */
export function withErrorHandling(
  handler: (request: Request) => Promise<Response>
) {
  return async (request: Request): Promise<Response> => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof ApiError) {
        return error.toResponse();
      }

      console.error('Unhandled API error:', error);
      return Response.json(
        { error: 'INTERNAL_SERVER_ERROR' },
        { status: 500 }
      );
    }
  };
}
