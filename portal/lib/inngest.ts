import { Inngest, EventSchemas } from 'inngest';

// Event type definitions
type Events = {
  'interview/submitted': {
    data: {
      attemptId: string;
    };
  };
  'interview/processing-failed': {
    data: {
      attemptId: string;
      error: {
        message: string;
        code: string;
      };
    };
  };
  'resume/submitted': {
    data: {
      feedbackId: string;
      userId: string;
      trackSlug: string;
      resumeObjectKey: string;
      resumeFileName: string;
    };
  };
};

// Create Inngest client
export const inngest = new Inngest({
  id: 'athena-portal',
  schemas: new EventSchemas().fromRecord<Events>(),
});

// Re-export for backward compatibility
export type InterviewEvents = Pick<Events, 'interview/submitted' | 'interview/processing-failed'>;
