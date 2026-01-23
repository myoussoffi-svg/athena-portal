import { auth } from '@clerk/nextjs/server';
import { db, interviewViewers } from '@/db';
import { eq, and } from 'drizzle-orm';

/**
 * Standardized API error envelope.
 * All API errors return: { error: { code, message, details? } }
 */
export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * API Error class for consistent error responses.
 *
 * Usage:
 *   throw new ApiError(400, 'INVALID_FILE_TYPE', 'Only Word documents are allowed');
 *   throw new ApiError(403, 'QUOTA_EXCEEDED', 'Resume limit reached', { used: 10, limit: 10 });
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message?: string,
    public details?: Record<string, unknown>
  ) {
    super(message || code);
    this.name = 'ApiError';
  }

  toResponse(): Response {
    const body: ApiErrorResponse = {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details && { details: this.details }),
      },
    };
    return Response.json(body, { status: this.statusCode });
  }
}

// Common error factory functions for consistency
export const Errors = {
  unauthorized: (message = 'Authentication required') =>
    new ApiError(401, 'UNAUTHORIZED', message),

  forbidden: (message = 'Access denied') =>
    new ApiError(403, 'FORBIDDEN', message),

  notFound: (resource = 'Resource') =>
    new ApiError(404, 'NOT_FOUND', `${resource} not found`),

  badRequest: (message: string, details?: Record<string, unknown>) =>
    new ApiError(400, 'BAD_REQUEST', message, details),

  validationError: (message: string, issues?: unknown[]) =>
    new ApiError(400, 'VALIDATION_ERROR', message, issues ? { issues } : undefined),

  conflict: (message: string, details?: Record<string, unknown>) =>
    new ApiError(409, 'CONFLICT', message, details),

  quotaExceeded: (message: string, details?: Record<string, unknown>) =>
    new ApiError(403, 'QUOTA_EXCEEDED', message, details),

  internal: (message = 'An unexpected error occurred') =>
    new ApiError(500, 'INTERNAL_ERROR', message),
};

/**
 * Require authentication and return the user ID.
 * Throws 401 if not authenticated.
 */
export async function requireAuth(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw Errors.unauthorized();
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
    throw Errors.forbidden('Admin access required');
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
    throw Errors.forbidden('Viewer access required');
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
 * Wrapper for API route handlers with consistent error handling.
 *
 * Usage:
 *   export const POST = withErrorHandling(async (request) => {
 *     const userId = await requireAuth();
 *     // ... handler logic
 *     return Response.json({ data });
 *   });
 */
export function withErrorHandling(
  handler: (request: Request) => Promise<Response>
) {
  return async (request: Request): Promise<Response> => {
    try {
      return await handler(request);
    } catch (error) {
      // Known API errors - return structured response
      if (error instanceof ApiError) {
        return error.toResponse();
      }

      // Log unexpected errors for debugging
      console.error('Unhandled API error:', error);

      // Return generic error to client (don't leak internals)
      return Errors.internal().toResponse();
    }
  };
}
