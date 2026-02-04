// Types for Interview Recording UI

// Prompt from API
export interface Prompt {
  id: number;
  type: 'behavioral' | 'technical';
  text: string;
  evaluationCriteria: {
    primary: string;
    strongSignals: string[];
    weakSignals: string[];
  };
}

// Initialize API response
export interface InitializeResponse {
  attemptId: string;
  attemptNumber: number;
  uploadUrl: string;
  uploadUrlExpiresAt: string;
  prompts: Prompt[];
  promptVersionId: string;
  evaluatorVersionId: string;
}

// Initialize API error responses
export interface LockedError {
  error: 'LOCKED';
  reason: 'cooldown' | 'abandoned' | 'admin_hold';
  unlockRequestAllowed: boolean;
  requestPending: boolean;
  lockedUntil?: string; // ISO-8601 timestamp for cooldown expiration
}

export interface InProgressError {
  error: 'IN_PROGRESS';
  existingAttemptId: string;
}

// Segment boundary sent to submit API
export interface SegmentBoundary {
  promptId: number;
  startTime: number; // milliseconds from recording start
  endTime: number;
}

// Integrity violation event
export interface IntegrityViolation {
  event: 'fullscreen_exit' | 'tab_switch' | 'window_blur';
  timestamp: string; // ISO-8601
  promptIdActive: number;
  durationOutsideMs: number | null;
}

// Integrity log sent to submit API
export interface IntegrityLog {
  schemaVersion: 'v1';
  startedInFullscreen: boolean | null;
  fullscreenSupported: boolean;
  visibilityApiSupported: boolean;
  violations: IntegrityViolation[];
  summary: {
    totalViolations: number;
    totalTimeOutsideMs: number;
    fullscreenExitCount: number;
    tabSwitchCount: number;
    windowBlurCount: number;
  };
  browserInfo: {
    userAgent: string;
    platform: string;
  } | null;
}

// Submit API request
export interface SubmitRequest {
  attemptId: string;
  segmentBoundaries: SegmentBoundary[];
  integrityLog: IntegrityLog | null;
}

// Status API response
export type AttemptStatus = 'in_progress' | 'processing' | 'complete' | 'abandoned' | 'failed';
export type ProcessingStage =
  | 'upload_pending'
  | 'upload_verified'
  | 'transcribing'
  | 'segmenting'
  | 'evaluating'
  | 'finalizing';

export interface PromptAssessment {
  promptId: number;
  promptText: string;
  observations: string;
  strengths: string | null;
  concerns: string | null;
}

export interface Feedback {
  promptAssessments: PromptAssessment[];
  overallAssessment: string;
  strengthsSummary: string[];
  concernsSummary: string[];
  followUpQuestions: string[];
  hireInclination: 'hire' | 'borderline' | 'no_hire';
  hireRationale: string;
}

export interface StatusResponse {
  status: AttemptStatus;
  processingStage?: ProcessingStage;
  feedback?: Feedback;
  hireInclination?: 'hire' | 'borderline' | 'no_hire';
  errorMessage?: string;
}

// Interview session state (stored in sessionStorage)
export interface InterviewSession {
  attemptId: string;
  attemptNumber: number;
  uploadUrl: string;
  uploadUrlExpiresAt: string;
  prompts: Prompt[];
  promptVersionId: string;
  evaluatorVersionId: string;
  trackSlug: string;
}

// Recording state machine phases
export type RecordingPhase =
  | 'initializing'
  | 'ready'
  | 'recording'
  | 'finishing'
  | 'uploading'
  | 'submitting'
  | 'complete'
  | 'error';

// Browser support check result
export interface BrowserSupportResult {
  supported: boolean;
  issues: string[];
  mimeType: string | null;
}
