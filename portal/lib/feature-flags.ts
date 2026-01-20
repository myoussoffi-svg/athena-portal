/**
 * Feature Flags for Course Visibility
 *
 * Controls which courses are visible to users. Hidden courses:
 * - Do not appear in navigation
 * - Routes show "Coming Soon" page
 *
 * Configuration can be overridden via environment variables:
 * - COURSE_IB_VISIBLE=true/false
 * - COURSE_PE_VISIBLE=true/false
 * - COURSE_ADVANCED_VISIBLE=true/false
 */

export type CourseId = 'ib' | 'pe' | 'advanced';

interface CourseVisibility {
  ib: boolean;
  pe: boolean;
  advanced: boolean;
}

// Default visibility - only IB is visible for Phase 1
const defaultVisibility: CourseVisibility = {
  ib: true,
  pe: false,
  advanced: false,
};

// Map track slugs to course IDs
const trackToCourseMap: Record<string, CourseId> = {
  // Investment Banking
  'investment-banking': 'ib',
  'investment-banking-interview-prep': 'ib',
  'ib': 'ib',
  // Private Equity
  'private-equity': 'pe',
  'private-equity-interview-prep': 'pe',
  'pe': 'pe',
  // Advanced PE
  'advanced-pe': 'advanced',
  'advanced-private-equity-associate': 'advanced',
  'advanced': 'advanced',
};

function getEnvBoolean(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
}

/**
 * Get the current course visibility configuration
 */
export function getCourseVisibility(): CourseVisibility {
  return {
    ib: getEnvBoolean('COURSE_IB_VISIBLE', defaultVisibility.ib),
    pe: getEnvBoolean('COURSE_PE_VISIBLE', defaultVisibility.pe),
    advanced: getEnvBoolean('COURSE_ADVANCED_VISIBLE', defaultVisibility.advanced),
  };
}

/**
 * Check if a course is visible
 */
export function isCourseVisible(courseId: CourseId): boolean {
  const visibility = getCourseVisibility();
  return visibility[courseId] ?? false;
}

/**
 * Check if a track (by slug) is visible
 */
export function isTrackVisible(trackSlug: string): boolean {
  const courseId = trackToCourseMap[trackSlug.toLowerCase()];
  if (!courseId) {
    // Unknown tracks are visible by default
    return true;
  }
  return isCourseVisible(courseId);
}

/**
 * Get the course ID for a track slug
 */
export function getCourseIdForTrack(trackSlug: string): CourseId | null {
  return trackToCourseMap[trackSlug.toLowerCase()] ?? null;
}

/**
 * Get all visible course IDs
 */
export function getVisibleCourses(): CourseId[] {
  const visibility = getCourseVisibility();
  return (Object.keys(visibility) as CourseId[]).filter(
    (id) => visibility[id]
  );
}

/**
 * Get course metadata for display
 */
export function getCourseMetadata(courseId: CourseId): { name: string; description: string } {
  const metadata: Record<CourseId, { name: string; description: string }> = {
    ib: {
      name: 'Investment Banking Interview Prep',
      description: 'Master the fundamentals of IB interviews',
    },
    pe: {
      name: 'Private Equity Interview Prep',
      description: 'Advanced PE interview preparation',
    },
    advanced: {
      name: 'Advanced PE Course',
      description: 'Deep-dive PE course with Deal Simulator',
    },
  };

  return metadata[courseId];
}
