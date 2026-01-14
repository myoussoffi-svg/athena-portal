import { Inngest } from 'inngest';

// Create Inngest client
export const inngest = new Inngest({
  id: 'athena-portal',
  // Event types for type safety
});

// Event type definitions
export type InterviewEvents = {
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
};
