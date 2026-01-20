'use client';

import type { Feedback, PromptAssessment } from '@/lib/interview/types';

interface FeedbackDisplayProps {
  feedback: Feedback;
}

function HireIndicator({ inclination }: { inclination: Feedback['hireInclination'] }) {
  const config = {
    hire: {
      label: 'Hire',
      color: '#059669',
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    borderline: {
      label: 'Borderline',
      color: '#D97706',
      bg: 'rgba(251, 191, 36, 0.1)',
      border: 'rgba(251, 191, 36, 0.3)',
    },
    no_hire: {
      label: 'No Hire',
      color: '#DC2626',
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.3)',
    },
  }[inclination];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: 8,
        background: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {config.label}
    </div>
  );
}

function PromptAssessmentCard({ assessment }: { assessment: PromptAssessment }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        border: '1px solid rgba(10, 10, 10, 0.08)',
        background: '#FFFFFF',
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#0A0A0A',
          marginBottom: 8,
        }}
      >
        {assessment.promptText}
      </div>

      <div
        style={{
          fontSize: 13,
          color: 'rgba(10, 10, 10, 0.7)',
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        {assessment.observations}
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        {assessment.strengths && (
          <div
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              background: 'rgba(16, 185, 129, 0.08)',
              fontSize: 12,
              color: '#047857',
            }}
          >
            <strong>Strengths:</strong> {assessment.strengths}
          </div>
        )}
        {assessment.concerns && (
          <div
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              background: 'rgba(239, 68, 68, 0.08)',
              fontSize: 12,
              color: '#B91C1C',
            }}
          >
            <strong>Areas for improvement:</strong> {assessment.concerns}
          </div>
        )}
      </div>
    </div>
  );
}

export function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  return (
    <div style={{ maxWidth: 720 }}>
      {/* Header with hire inclination */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: '#0A0A0A',
          }}
        >
          Interview Feedback
        </h2>
        <HireIndicator inclination={feedback.hireInclination} />
      </div>

      {/* Overall assessment */}
      <div
        style={{
          padding: 20,
          borderRadius: 14,
          background: 'rgba(65, 109, 137, 0.05)',
          border: '1px solid rgba(65, 109, 137, 0.15)',
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 15,
            fontWeight: 600,
            color: '#0A0A0A',
          }}
        >
          Overall Assessment
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.65,
            color: 'rgba(10, 10, 10, 0.8)',
          }}
        >
          {feedback.overallAssessment}
        </p>

        {/* Hire rationale */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid rgba(65, 109, 137, 0.15)',
            fontSize: 13,
            color: 'rgba(10, 10, 10, 0.7)',
          }}
        >
          <strong>Decision rationale:</strong> {feedback.hireRationale}
        </div>
      </div>

      {/* Strengths and concerns summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
          }}
        >
          <h4
            style={{
              margin: '0 0 12px',
              fontSize: 14,
              fontWeight: 600,
              color: '#047857',
            }}
          >
            Key Strengths
          </h4>
          <ul
            style={{
              margin: 0,
              padding: '0 0 0 18px',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(10, 10, 10, 0.7)',
            }}
          >
            {feedback.strengthsSummary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.15)',
          }}
        >
          <h4
            style={{
              margin: '0 0 12px',
              fontSize: 14,
              fontWeight: 600,
              color: '#B91C1C',
            }}
          >
            Areas for Improvement
          </h4>
          <ul
            style={{
              margin: 0,
              padding: '0 0 0 18px',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(10, 10, 10, 0.7)',
            }}
          >
            {feedback.concernsSummary.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Follow-up questions */}
      {feedback.followUpQuestions.length > 0 && (
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(10, 10, 10, 0.02)',
            border: '1px solid rgba(10, 10, 10, 0.08)',
            marginBottom: 24,
          }}
        >
          <h4
            style={{
              margin: '0 0 12px',
              fontSize: 14,
              fontWeight: 600,
              color: '#0A0A0A',
            }}
          >
            Suggested Follow-up Questions
          </h4>
          <ul
            style={{
              margin: 0,
              padding: '0 0 0 18px',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(10, 10, 10, 0.7)',
            }}
          >
            {feedback.followUpQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Individual prompt assessments */}
      <div>
        <h3
          style={{
            margin: '0 0 16px',
            fontSize: 16,
            fontWeight: 600,
            color: '#0A0A0A',
          }}
        >
          Question-by-Question Feedback
        </h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {feedback.promptAssessments.map((assessment) => (
            <PromptAssessmentCard key={assessment.promptId} assessment={assessment} />
          ))}
        </div>
      </div>
    </div>
  );
}
