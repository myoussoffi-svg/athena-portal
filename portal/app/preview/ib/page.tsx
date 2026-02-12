import Link from 'next/link';

export const metadata = {
  title: 'See What\'s Inside | Investment Banking Interview Prep | Athena',
  description: 'Preview the complete IB interview prep course: lessons, videos, case studies, quiz banks, AI interview simulator, resume feedback, and outreach tracker.',
};

export default function PreviewPage() {
  return (
    <>
      <style>{`
        .preview-page {
          min-height: 100vh;
          background: #FAFAFA;
          font-family: Inter, system-ui, sans-serif;
        }

        /* Hero Section */
        .preview-hero {
          background: radial-gradient(112% 82% at 84.7% 18%, #429cd4 0%, #416d89 100%);
          color: white;
          padding: 80px 24px 120px;
          position: relative;
          overflow: hidden;
        }
        .preview-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 30%;
          background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }
        .preview-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: center;
        }
        .preview-logo {
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 20px;
        }
        .preview-hero-title {
          margin: 0 0 20px;
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .preview-hero-subtitle {
          margin: 0 auto;
          max-width: 600px;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }

        /* Section Styles */
        .preview-content {
          max-width: 900px;
          margin: -60px auto 0;
          padding: 0 24px 80px;
          position: relative;
          z-index: 2;
        }
        .preview-section {
          background: #FFFFFF;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          padding: 40px;
          margin-bottom: 32px;
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(65, 109, 137, 0.08);
          border: 1px solid rgba(65, 109, 137, 0.15);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: #416D89;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        .section-title {
          margin: 0 0 12px;
          font-size: 26px;
          font-weight: 700;
          color: #0A0A0A;
          letter-spacing: -0.02em;
        }
        .section-subtitle {
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(10, 10, 10, 0.6);
        }

        /* Scrollable Lesson Preview */
        .lesson-preview-scroll {
          background: #FFFFFF;
          border: 1px solid rgba(10, 10, 10, 0.08);
          border-radius: 16px;
          height: 500px;
          overflow-y: auto;
          margin-bottom: 20px;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.02);
        }
        .lesson-preview-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .lesson-preview-scroll::-webkit-scrollbar-track {
          background: rgba(10, 10, 10, 0.02);
          border-radius: 4px;
        }
        .lesson-preview-scroll::-webkit-scrollbar-thumb {
          background: rgba(10, 10, 10, 0.15);
          border-radius: 4px;
        }
        .lesson-preview-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(10, 10, 10, 0.25);
        }
        .lesson-preview-inner {
          padding: 32px;
          max-width: 720px;
        }
        .lesson-header {
          margin-bottom: 32px;
        }
        .lesson-header-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .module-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.1) 0%, rgba(65, 109, 137, 0.15) 100%);
          border: 1px solid rgba(65, 109, 137, 0.2);
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #416D89;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .lesson-indicator {
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
          font-weight: 500;
        }
        .reading-time {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
          margin-left: auto;
        }
        .lesson-title-main {
          margin: 0 0 16px;
          font-size: 32px;
          line-height: 1.2;
          letter-spacing: -0.5px;
          font-weight: 700;
          color: #0A0A0A;
        }
        .lesson-header-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.03) 100%);
        }
        .divider-line:last-child {
          background: linear-gradient(90deg, rgba(10, 10, 10, 0.03) 0%, rgba(10, 10, 10, 0.08) 100%);
        }
        .divider-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(65, 109, 137, 0.06);
          border: 1px solid rgba(65, 109, 137, 0.1);
          color: #416D89;
        }

        /* Lesson Content Prose Styles */
        .lesson-prose {
          font-size: 15px;
          line-height: 1.7;
          color: #0A0A0A;
        }
        .lesson-prose p {
          margin: 18px 0;
          color: rgba(10, 10, 10, 0.75);
        }
        .lesson-prose > p:first-child {
          margin-top: 0;
        }
        .lesson-prose h2 {
          position: relative;
          margin: 48px 0 20px;
          padding: 16px 0 16px 20px;
          font-size: 20px;
          line-height: 1.3;
          font-weight: 700;
          color: #0A0A0A;
          border-left: 4px solid #416D89;
          background: linear-gradient(90deg, rgba(65, 109, 137, 0.04) 0%, transparent 100%);
          border-radius: 0 8px 8px 0;
        }
        .lesson-prose h3 {
          margin: 32px 0 14px;
          padding-bottom: 8px;
          font-size: 16px;
          line-height: 1.4;
          font-weight: 600;
          color: #0A0A0A;
          border-bottom: 1px solid rgba(10, 10, 10, 0.06);
        }
        .lesson-prose ul, .lesson-prose ol {
          margin: 18px 0 18px 24px;
          padding: 0;
        }
        .lesson-prose li {
          margin: 10px 0;
          color: rgba(10, 10, 10, 0.75);
        }
        .lesson-prose strong {
          color: #0A0A0A;
        }
        .lesson-prose code {
          font-size: 0.9em;
          background: rgba(10, 10, 10, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'SF Mono', Monaco, monospace;
        }

        .author-note {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.04) 0%, rgba(65, 109, 137, 0.08) 100%);
          border: 1px solid rgba(65, 109, 137, 0.12);
          border-radius: 12px;
          margin-top: 24px;
        }
        .author-note-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #416D89, #2d4a5e);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          flex-shrink: 0;
        }
        .author-note-text {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.7);
        }

        /* Modules Section */
        .modules-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .module-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: rgba(10, 10, 10, 0.02);
          border-radius: 12px;
          border: 1px solid rgba(10, 10, 10, 0.04);
          transition: all 0.15s;
        }
        .module-item:hover {
          background: rgba(65, 109, 137, 0.04);
          border-color: rgba(65, 109, 137, 0.12);
        }
        .module-number {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .module-info {
          flex: 1;
          min-width: 0;
        }
        .module-name {
          font-size: 15px;
          font-weight: 600;
          color: #0A0A0A;
          margin-bottom: 2px;
        }
        .module-lessons {
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
        }

        /* Video Preview */
        .video-embed {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16/9;
          margin-bottom: 20px;
          background: #000;
        }
        .video-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .video-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .video-list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(10, 10, 10, 0.02);
          border: 1px solid rgba(10, 10, 10, 0.06);
          border-radius: 10px;
          font-size: 13px;
          color: rgba(10, 10, 10, 0.7);
        }
        .video-list-icon {
          color: #416D89;
        }

        /* Case Study Preview */
        .case-preview {
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.03) 0%, rgba(65, 109, 137, 0.06) 100%);
          border: 1px solid rgba(65, 109, 137, 0.15);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 20px;
        }
        .case-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }
        .case-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #416D89, #2d4a5e);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .case-meta {
          flex: 1;
        }
        .case-type {
          font-size: 11px;
          font-weight: 600;
          color: #416D89;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .case-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #0A0A0A;
        }
        .case-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .case-detail {
          text-align: center;
          padding: 14px;
          background: white;
          border-radius: 10px;
          border: 1px solid rgba(10, 10, 10, 0.06);
        }
        .case-detail-value {
          font-size: 18px;
          font-weight: 700;
          color: #416D89;
          margin-bottom: 4px;
        }
        .case-detail-label {
          font-size: 11px;
          color: rgba(10, 10, 10, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        /* Quiz Preview */
        .quiz-preview {
          background: #FAFAFA;
          border: 1px solid rgba(10, 10, 10, 0.06);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 24px;
        }
        .quiz-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .quiz-progress {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.5);
        }
        .quiz-difficulty {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
        }
        .quiz-question {
          font-size: 16px;
          font-weight: 500;
          color: #0A0A0A;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .quiz-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: white;
          border: 2px solid rgba(10, 10, 10, 0.08);
          border-radius: 10px;
          font-size: 14px;
          color: rgba(10, 10, 10, 0.8);
          line-height: 1.5;
        }
        .quiz-option.correct {
          border-color: rgba(34, 197, 94, 0.5);
          background: rgba(34, 197, 94, 0.05);
        }
        .quiz-option-key {
          width: 26px;
          height: 26px;
          background: rgba(10, 10, 10, 0.06);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
          flex-shrink: 0;
        }
        .quiz-option.correct .quiz-option-key {
          background: rgba(34, 197, 94, 0.15);
          color: #16a34a;
        }
        .quiz-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .quiz-stat {
          text-align: center;
          padding: 16px;
          background: rgba(65, 109, 137, 0.04);
          border-radius: 12px;
        }
        .quiz-stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #416D89;
        }
        .quiz-stat-label {
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
          margin-top: 4px;
        }
        .quiz-types {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .quiz-type {
          padding: 8px 14px;
          background: white;
          border: 1px solid rgba(10, 10, 10, 0.08);
          border-radius: 8px;
          font-size: 13px;
          color: rgba(10, 10, 10, 0.7);
        }

        /* Interview Simulator Preview */
        .interview-preview {
          position: relative;
        }
        .interview-flow {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .interview-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 100px;
        }
        .interview-step-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.1), rgba(65, 109, 137, 0.15));
          border: 1px solid rgba(65, 109, 137, 0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .interview-step-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.6);
          text-align: center;
        }
        .interview-arrow {
          color: rgba(10, 10, 10, 0.2);
          font-size: 20px;
        }
        .feedback-preview {
          background: #FAFAFA;
          border: 1px solid rgba(10, 10, 10, 0.06);
          border-radius: 16px;
          padding: 24px;
        }
        .feedback-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.06);
        }
        .feedback-avatar {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #416D89, #2d4a5e);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }
        .feedback-name {
          font-size: 15px;
          font-weight: 600;
          color: #0A0A0A;
        }
        .feedback-role {
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
        }
        .feedback-content {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(10, 10, 10, 0.7);
        }
        .feedback-content p {
          margin: 0 0 12px;
        }
        .feedback-scores {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .feedback-score {
          flex: 1;
          text-align: center;
          padding: 12px;
          background: white;
          border: 1px solid rgba(10, 10, 10, 0.06);
          border-radius: 10px;
        }
        .feedback-score-value {
          font-size: 20px;
          font-weight: 700;
          color: #416D89;
        }
        .feedback-score-label {
          font-size: 10px;
          color: rgba(10, 10, 10, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .feature-highlight {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: rgba(65, 109, 137, 0.04);
          border-radius: 10px;
          margin-top: 16px;
        }
        .feature-highlight-icon {
          color: #416D89;
          font-size: 18px;
          flex-shrink: 0;
        }
        .feature-highlight-text {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.7);
          line-height: 1.5;
        }

        /* Resume Feedback Preview */
        .resume-preview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .resume-upload {
          background: #FAFAFA;
          border: 2px dashed rgba(10, 10, 10, 0.12);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .resume-upload-icon {
          width: 56px;
          height: 56px;
          background: rgba(65, 109, 137, 0.08);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 16px;
        }
        .resume-upload-title {
          font-size: 15px;
          font-weight: 600;
          color: #0A0A0A;
          margin-bottom: 6px;
        }
        .resume-upload-hint {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.5);
        }
        .resume-scores {
          background: #FAFAFA;
          border: 1px solid rgba(10, 10, 10, 0.06);
          border-radius: 16px;
          padding: 24px;
        }
        .resume-scores-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(10, 10, 10, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        .resume-score-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(10, 10, 10, 0.04);
        }
        .resume-score-item:last-child {
          border-bottom: none;
        }
        .resume-score-label {
          flex: 1;
          font-size: 14px;
          color: rgba(10, 10, 10, 0.7);
        }
        .resume-score-bar {
          width: 80px;
          height: 6px;
          background: rgba(10, 10, 10, 0.08);
          border-radius: 3px;
          overflow: hidden;
        }
        .resume-score-fill {
          height: 100%;
          background: linear-gradient(90deg, #416D89, #5a9bc4);
          border-radius: 3px;
        }
        .resume-score-value {
          font-size: 13px;
          font-weight: 600;
          color: #416D89;
          width: 32px;
          text-align: right;
        }

        /* Outreach Tracker Section (Key Differentiator) */
        .outreach-section {
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          color: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          padding: 48px;
          margin-bottom: 32px;
        }
        .outreach-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        .outreach-title {
          margin: 0 0 12px;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .outreach-subtitle {
          margin: 0 0 36px;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
        }
        .outreach-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 36px;
        }
        .outreach-feature {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 24px;
        }
        .outreach-feature-icon {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 16px;
        }
        .outreach-feature-title {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .outreach-feature-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
        }

        /* Email Preview */
        .email-preview {
          background: white;
          border-radius: 12px;
          padding: 20px;
          color: #0A0A0A;
          font-size: 13px;
          line-height: 1.6;
          margin-top: 16px;
        }
        .email-preview-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
          margin-bottom: 12px;
        }
        .email-preview-field {
          display: flex;
          gap: 8px;
        }
        .email-preview-label {
          color: rgba(10, 10, 10, 0.4);
          flex-shrink: 0;
        }
        .email-preview-value {
          color: #0A0A0A;
        }
        .email-preview-body {
          color: rgba(10, 10, 10, 0.75);
        }
        .email-preview-body p {
          margin: 0 0 10px;
        }
        .email-highlight {
          background: rgba(65, 109, 137, 0.1);
          padding: 2px 4px;
          border-radius: 3px;
          color: #416D89;
        }

        /* Bulk Import Preview */
        .bulk-import-preview {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-top: 16px;
        }
        .bulk-import-flow {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .bulk-import-step {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bulk-import-step-number {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #416D89, #2d4a5e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .bulk-import-step-text {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.7);
        }
        .spreadsheet-preview {
          background: #FAFAFA;
          border: 1px solid rgba(10, 10, 10, 0.08);
          border-radius: 8px;
          overflow: hidden;
          font-size: 11px;
          margin-top: 8px;
        }
        .spreadsheet-header {
          display: grid;
          grid-template-columns: 80px 80px 110px 1fr;
          background: rgba(10, 10, 10, 0.04);
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
        }
        .spreadsheet-header span {
          padding: 8px 10px;
          font-weight: 600;
          color: rgba(10, 10, 10, 0.6);
          border-right: 1px solid rgba(10, 10, 10, 0.06);
        }
        .spreadsheet-header span:last-child {
          border-right: none;
        }
        .spreadsheet-row {
          display: grid;
          grid-template-columns: 80px 80px 110px 1fr;
          border-bottom: 1px solid rgba(10, 10, 10, 0.04);
        }
        .spreadsheet-row:last-child {
          border-bottom: none;
        }
        .spreadsheet-row span {
          padding: 7px 10px;
          color: rgba(10, 10, 10, 0.8);
          border-right: 1px solid rgba(10, 10, 10, 0.04);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .spreadsheet-row span:last-child {
          border-right: none;
        }
        .bulk-import-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 0;
        }
        .bulk-import-arrow svg {
          color: #416D89;
        }
        .generated-result {
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .generated-icon {
          width: 32px;
          height: 32px;
          background: rgba(34, 197, 94, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .generated-text {
          flex: 1;
        }
        .generated-title {
          font-size: 13px;
          font-weight: 600;
          color: #16a34a;
          margin-bottom: 2px;
        }
        .generated-subtitle {
          font-size: 11px;
          color: rgba(10, 10, 10, 0.6);
        }

        /* Leaderboard Preview */
        .leaderboard-preview {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          overflow: hidden;
        }
        .leaderboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .leaderboard-title {
          font-size: 14px;
          font-weight: 600;
        }
        .coming-soon-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
          color: #fcd34d;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .leaderboard-rows {
          padding: 8px 0;
        }
        .leaderboard-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          transition: background 0.15s;
        }
        .leaderboard-row.top-5 {
          background: rgba(245, 158, 11, 0.08);
        }
        .leaderboard-rank {
          width: 24px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
        }
        .leaderboard-row.top-5 .leaderboard-rank {
          color: #fcd34d;
        }
        .leaderboard-avatar {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }
        .leaderboard-name {
          flex: 1;
          font-size: 14px;
        }
        .leaderboard-score {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .leaderboard-badge {
          font-size: 9px;
          font-weight: 600;
          padding: 3px 8px;
          background: rgba(245, 158, 11, 0.2);
          border-radius: 4px;
          color: #fcd34d;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        /* Mentorship Preview */
        .mentorship-preview {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 24px;
          color: #0A0A0A;
          margin-top: 24px;
        }
        .mentorship-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .mentorship-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #416D89, #2d4a5e);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .mentorship-title {
          font-size: 16px;
          font-weight: 600;
        }
        .mentorship-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.7);
        }

        /* CTA Section */
        .cta-section {
          background: #FFFFFF;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          padding: 48px;
          text-align: center;
        }
        .cta-price {
          font-size: 56px;
          font-weight: 700;
          color: #0A0A0A;
          letter-spacing: -0.02em;
        }
        .cta-price-note {
          font-size: 16px;
          color: rgba(10, 10, 10, 0.5);
          margin-bottom: 8px;
        }
        .cta-subtitle {
          font-size: 15px;
          color: rgba(10, 10, 10, 0.6);
          margin-bottom: 28px;
        }
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: linear-gradient(135deg, #416D89, #2d4a5e);
          color: white;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(65, 109, 137, 0.3);
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(65, 109, 137, 0.4);
        }
        .cta-features {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          flex-wrap: wrap;
        }
        .cta-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(10, 10, 10, 0.6);
        }
        .cta-feature-check {
          width: 18px;
          height: 18px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #16a34a;
          font-size: 10px;
        }

        /* Footer */
        .preview-footer {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 48px;
          text-align: center;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          font-size: 13px;
        }
        .footer-links a {
          color: rgba(10, 10, 10, 0.4);
          text-decoration: none;
        }
        .footer-links a:hover {
          color: #416D89;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .preview-hero {
            padding: 60px 20px 80px;
          }
          .preview-hero-title {
            font-size: 36px;
          }
          .preview-content {
            padding: 0 16px 60px;
            margin-top: -40px;
          }
          .preview-section {
            padding: 28px;
          }
          .section-title {
            font-size: 22px;
          }
          .lesson-preview-scroll {
            height: 400px;
          }
          .lesson-preview-inner {
            padding: 24px;
          }
          .lesson-title-main {
            font-size: 26px;
          }
          .video-list {
            grid-template-columns: 1fr;
          }
          .case-details {
            grid-template-columns: 1fr;
          }
          .quiz-stats {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .interview-flow {
            flex-direction: column;
          }
          .interview-arrow {
            transform: rotate(90deg);
          }
          .resume-preview {
            grid-template-columns: 1fr;
          }
          .outreach-section {
            padding: 32px 24px;
          }
          .outreach-title {
            font-size: 26px;
          }
          .outreach-features {
            grid-template-columns: 1fr;
          }
          .cta-section {
            padding: 36px 24px;
          }
          .cta-price {
            font-size: 44px;
          }
          .cta-features {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
        }
      `}</style>

      <div className="preview-page">
        {/* Hero Section */}
        <div className="preview-hero">
          <div className="preview-hero-inner">
            <div className="preview-logo">ATHENA</div>
            <h1 className="preview-hero-title">See What&apos;s Inside</h1>
            <p className="preview-hero-subtitle">
              The complete system for landing your investment banking offer. Written by bankers. Powered by AI. Built for results.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="preview-content">
          {/* Section 1: Lesson Format with Scrollable Preview */}
          <section className="preview-section">
            <span className="section-badge">Lessons</span>
            <h2 className="section-title">Narrative-Driven Content</h2>
            <p className="section-subtitle">
              No bullet-point dumps. Every lesson reads like a senior banker walking you through the concept, with the context and nuance that actually matters in interviews.
            </p>

            <div className="lesson-preview-scroll">
              <div className="lesson-preview-inner">
                {/* Lesson Header */}
                <header className="lesson-header">
                  <div className="lesson-header-meta">
                    <span className="module-badge">Valuation & Modeling</span>
                    <span className="lesson-indicator">Lesson 2 of 8</span>
                    <span className="reading-time">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      ~45 min read
                    </span>
                  </div>
                  <h1 className="lesson-title-main">DCF Overview and Mechanics</h1>
                  <div className="lesson-header-divider">
                    <div className="divider-line" />
                    <div className="divider-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div className="divider-line" />
                  </div>
                </header>

                {/* Lesson Content */}
                <div className="lesson-prose">
                  <h2>What Is a DCF?</h2>
                  <p>
                    A <strong>Discounted Cash Flow (DCF)</strong> analysis values a company based on the present value of its projected future cash flows. It rests on the principle that a company is worth the cash it&apos;ll generate for investors over time, adjusted for the time value of money and risk.
                  </p>
                  <p>
                    The DCF is considered the most rigorous valuation methodology because it&apos;s based on fundamentals (cash generation) rather than market sentiment or comparable company multiples.
                  </p>

                  <h2>Why DCF Is Used</h2>
                  <p>In investment banking, the DCF is one of the core valuation tools. It&apos;s used to:</p>
                  <ul>
                    <li>Value a company in M&A or capital raising transactions</li>
                    <li>Provide a &quot;floor&quot; or intrinsic value estimate independent of market multiples</li>
                    <li>Sensitize assumptions (growth, margins, discount rate) to understand valuation drivers</li>
                  </ul>
                  <p>However, a DCF is only as good as its assumptions. Small changes in growth rates or discount rates can significantly affect value.</p>

                  <h2>The DCF Framework: From Cash Flows to Enterprise Value</h2>
                  <p>A DCF model follows these steps:</p>
                  <ol>
                    <li><strong>Project Free Cash Flows</strong>: Forecast the company&apos;s unlevered free cash flows (UFCF) over a projection period, typically 5-10 years.</li>
                    <li><strong>Calculate Terminal Value</strong>: Estimate the value of cash flows beyond the projection period.</li>
                    <li><strong>Discount to Present Value</strong>: Discount projected cash flows and terminal value to present value using the weighted average cost of capital (WACC).</li>
                    <li><strong>Sum to Get Enterprise Value</strong>: Add the present value of projected cash flows and terminal value to get EV.</li>
                    <li><strong>Bridge to Equity Value</strong>: Subtract net debt (and add/subtract other items) to arrive at equity value.</li>
                  </ol>

                  <h2>Step 1: Project Unlevered Free Cash Flow (UFCF)</h2>
                  <p>
                    <strong>Unlevered Free Cash Flow (UFCF)</strong> represents cash available to all investors (debt and equity holders) before debt payments. It&apos;s calculated as:
                  </p>
                  <p><code>UFCF = EBIT × (1 - Tax Rate) + D&A - CapEx - Increase in Net Working Capital</code></p>
                  <p>Or, alternatively:</p>
                  <p><code>UFCF = NOPAT + D&A - CapEx - Increase in NWC</code></p>
                  <p>Where <strong>NOPAT</strong> (Net Operating Profit After Tax) = EBIT × (1 - Tax Rate)</p>
                  <p>
                    <strong>Why unlevered?</strong> We use unlevered cash flows because we&apos;re valuing the entire business (enterprise value), not just equity. Debt and equity holders will be compensated separately.
                  </p>

                  <h3>Key Inputs to Forecast</h3>
                  <ul>
                    <li><strong>Revenue growth</strong>: Based on historical trends, market conditions, and management guidance</li>
                    <li><strong>Operating margins (EBIT margin)</strong>: Based on historical performance and expected efficiency</li>
                    <li><strong>Tax rate</strong>: Typically the statutory corporate tax rate or the company&apos;s effective rate</li>
                    <li><strong>CapEx</strong>: Investments required to maintain and grow the business</li>
                    <li><strong>Net working capital (NWC)</strong>: Changes in receivables, inventory, and payables</li>
                  </ul>

                  <h2>Step 2: Calculate Terminal Value</h2>
                  <p>
                    The projection period (e.g., 5 years) captures only part of the company&apos;s value. The <strong>terminal value (TV)</strong> represents the value of all cash flows beyond the projection period.
                  </p>
                  <p>There are two common methods for calculating terminal value:</p>
                  <ol>
                    <li><strong>Perpetuity Growth Method</strong>: Assumes cash flows grow at a constant rate forever.</li>
                    <li><strong>Exit Multiple Method</strong>: Applies a valuation multiple (e.g., EV/EBITDA) to the final year&apos;s metric.</li>
                  </ol>

                  <h2>Step 3: Discount Cash Flows to Present Value</h2>
                  <p>
                    Cash flows in the future are worth less than cash flows today due to the time value of money and risk. We discount future cash flows using the <strong>WACC (weighted average cost of capital)</strong>, which represents the blended cost of debt and equity financing.
                  </p>
                  <p><strong>Present Value of Year N Cash Flow</strong>:</p>
                  <p><code>PV = Cash Flow / (1 + WACC)^N</code></p>

                  <h2>The Mid-Year Convention</h2>
                  <p>
                    In practice, cash flows don&apos;t arrive in a lump sum at year-end. A company generates cash throughout the year. The <strong>mid-year convention</strong> adjusts for this by assuming cash flows arrive at the midpoint of each period rather than at the end.
                  </p>
                  <p>
                    <strong>Why It Matters</strong>: Using year-end discounting understates present value because it assumes cash arrives later than it actually does. The mid-year convention provides a more accurate valuation.
                  </p>

                  <h2>Common Mistakes</h2>
                  <p><strong>Using levered cash flows instead of unlevered</strong>: For enterprise value, use unlevered FCF (before debt payments).</p>
                  <p><strong>Forgetting to discount terminal value</strong>: Terminal value is calculated in the final year and must be discounted back to present value.</p>
                  <p><strong>Not understanding that DCF is sensitive to assumptions</strong>: Small changes in terminal growth rate or WACC can swing valuation significantly. Always run sensitivities.</p>
                </div>
              </div>
            </div>

            <div className="author-note">
              <div className="author-note-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="author-note-text">
                <strong>Written by finance professionals</strong> who have gone through IB recruiting. Every lesson reflects what actually gets asked and what interviewers listen for.
              </div>
            </div>
          </section>

          {/* Section: Course Modules */}
          <section className="preview-section">
            <span className="section-badge">Curriculum</span>
            <h2 className="section-title">Course Modules</h2>
            <p className="section-subtitle">
              9 comprehensive modules covering everything from behavioral questions to advanced modeling concepts.
            </p>

            <div className="modules-grid">
              <div className="module-item">
                <span className="module-number">1</span>
                <div className="module-info">
                  <div className="module-name">Fit, Story, and Behavioral Mastery</div>
                  <div className="module-lessons">7 lessons</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">2</span>
                <div className="module-info">
                  <div className="module-name">Accounting Foundations for Interviews</div>
                  <div className="module-lessons">8 lessons + 1 case study</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">3</span>
                <div className="module-info">
                  <div className="module-name">Financial Modeling Fundamentals</div>
                  <div className="module-lessons">7 lessons</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">4</span>
                <div className="module-info">
                  <div className="module-name">Valuation & Modeling Concepts</div>
                  <div className="module-lessons">8 lessons + 3 case studies</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">5</span>
                <div className="module-info">
                  <div className="module-name">LBOs, Advanced Topics & Edge Cases</div>
                  <div className="module-lessons">7 lessons + 2 case studies</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">6</span>
                <div className="module-info">
                  <div className="module-name">Financial Math Essentials</div>
                  <div className="module-lessons">3 lessons</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">7</span>
                <div className="module-info">
                  <div className="module-name">Advanced M&A Modeling</div>
                  <div className="module-lessons">6 lessons</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">8</span>
                <div className="module-info">
                  <div className="module-name">Capital Markets Foundations</div>
                  <div className="module-lessons">4 lessons</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">9</span>
                <div className="module-info">
                  <div className="module-name">Outreach Masterclass</div>
                  <div className="module-lessons">7 lessons</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Video Integration */}
          <section className="preview-section">
            <span className="section-badge">Videos</span>
            <h2 className="section-title">Video Walkthroughs</h2>
            <p className="section-subtitle">
              Optional video explanations for complex topics. Watch a banker walk through LBO mechanics, explain WACC intuition, or demonstrate merger model mechanics.
            </p>

            <div className="video-embed">
              <iframe
                src="https://player.vimeo.com/video/1164202703?dnt=1&byline=0&portrait=0&title=0"
                title="LBO Overview and Intuition"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="video-list">
              <div className="video-list-item">
                <span className="video-list-icon">▶</span>
                LBO Overview & Intuition
              </div>
              <div className="video-list-item">
                <span className="video-list-icon">▶</span>
                DCF Mechanics Deep Dive
              </div>
              <div className="video-list-item">
                <span className="video-list-icon">▶</span>
                WACC Calculation Walkthrough
              </div>
              <div className="video-list-item">
                <span className="video-list-icon">▶</span>
                Accretion/Dilution Intuition
              </div>
            </div>
          </section>

          {/* Section 3: Case Studies */}
          <section className="preview-section">
            <span className="section-badge">Case Studies</span>
            <h2 className="section-title">Real Deal Scenarios</h2>
            <p className="section-subtitle">
              Apply concepts to anonymized versions of actual transactions. Walk through the analysis, make decisions, and understand how bankers think about live deals.
            </p>

            <div className="case-preview">
              <div className="case-header">
                <div className="case-icon">📊</div>
                <div className="case-meta">
                  <div className="case-type">LBO Case Study</div>
                  <h4 className="case-title">TechCo Leveraged Buyout Analysis</h4>
                </div>
              </div>
              <div className="case-details">
                <div className="case-detail">
                  <div className="case-detail-value">$2.4B</div>
                  <div className="case-detail-label">Enterprise Value</div>
                </div>
                <div className="case-detail">
                  <div className="case-detail-value">5.5x</div>
                  <div className="case-detail-label">Debt / EBITDA</div>
                </div>
                <div className="case-detail">
                  <div className="case-detail-value">22%</div>
                  <div className="case-detail-label">Target IRR</div>
                </div>
              </div>
            </div>

            <div className="author-note">
              <div className="author-note-icon">💡</div>
              <div className="author-note-text">
                Each case study includes interactive checkpoints where you make decisions and see how they impact returns, valuation, or deal structure.
              </div>
            </div>
          </section>

          {/* Section 4: Quiz Banks */}
          <section className="preview-section">
            <span className="section-badge">Practice</span>
            <h2 className="section-title">Quiz Banks</h2>
            <p className="section-subtitle">
              Master the technicals with 270+ questions across four modules. Track your progress and identify weak spots before they show up in interviews.
            </p>

            <div className="quiz-preview">
              <div className="quiz-header">
                <span className="quiz-progress">Question 3 of 15</span>
                <span className="quiz-difficulty">Medium</span>
              </div>
              <div className="quiz-question">
                A comparable company trades at 8.0x EV/EBITDA. Target has $100M EBITDA, $150M debt, $20M cash, 10M shares. What is implied share price?
              </div>
              <div className="quiz-options">
                <div className="quiz-option correct">
                  <span className="quiz-option-key">A</span>
                  <span>$67.00</span>
                </div>
                <div className="quiz-option">
                  <span className="quiz-option-key">B</span>
                  <span>$80.00</span>
                </div>
                <div className="quiz-option">
                  <span className="quiz-option-key">C</span>
                  <span>$65.00</span>
                </div>
                <div className="quiz-option">
                  <span className="quiz-option-key">D</span>
                  <span>$93.00</span>
                </div>
              </div>
            </div>

            <div className="quiz-stats">
              <div className="quiz-stat">
                <div className="quiz-stat-value">270+</div>
                <div className="quiz-stat-label">Questions</div>
              </div>
              <div className="quiz-stat">
                <div className="quiz-stat-value">4</div>
                <div className="quiz-stat-label">Modules</div>
              </div>
              <div className="quiz-stat">
                <div className="quiz-stat-value">3</div>
                <div className="quiz-stat-label">Question Types</div>
              </div>
            </div>

            <div className="quiz-types">
              <div className="quiz-type">Conceptual</div>
              <div className="quiz-type">Formulaic</div>
              <div className="quiz-type">Judgment Calls</div>
            </div>
          </section>

          {/* Section 5: Interview Simulator */}
          <section className="preview-section">
            <span className="section-badge">AI-Powered</span>
            <h2 className="section-title">Interview Simulator</h2>
            <p className="section-subtitle">
              Practice with an AI interviewer that asks both technical and behavioral questions, evaluates your responses, and gives you personalized feedback.
            </p>

            <div className="interview-preview">
              <div className="interview-flow">
                <div className="interview-step">
                  <div className="interview-step-icon">🎤</div>
                  <span className="interview-step-label">Record Response</span>
                </div>
                <span className="interview-arrow">→</span>
                <div className="interview-step">
                  <div className="interview-step-icon">🤖</div>
                  <span className="interview-step-label">AI Evaluation</span>
                </div>
                <span className="interview-arrow">→</span>
                <div className="interview-step">
                  <div className="interview-step-icon">📝</div>
                  <span className="interview-step-label">Detailed Feedback</span>
                </div>
              </div>

              <div className="feedback-preview">
                <div className="feedback-header">
                  <div className="feedback-avatar">VP</div>
                  <div>
                    <div className="feedback-name">Interview Feedback</div>
                    <div className="feedback-role">Question: Walk me through a DCF</div>
                  </div>
                </div>
                <div className="feedback-content">
                  <p>
                    Your explanation of the DCF framework was solid&mdash;you correctly identified the key steps and hit the major components. Your discussion of terminal value showed good intuition.
                  </p>
                  <p>
                    Consider being more specific about how you&apos;d approach the discount rate. Mentioning that you&apos;d use WACC and briefly explaining why (unlevered cash flows belong to all capital providers) would demonstrate deeper understanding.
                  </p>
                </div>
                <div className="feedback-scores">
                  <div className="feedback-score">
                    <div className="feedback-score-value">8.5</div>
                    <div className="feedback-score-label">Technical</div>
                  </div>
                  <div className="feedback-score">
                    <div className="feedback-score-value">7.8</div>
                    <div className="feedback-score-label">Structure</div>
                  </div>
                  <div className="feedback-score">
                    <div className="feedback-score-value">8.2</div>
                    <div className="feedback-score-label">Communication</div>
                  </div>
                </div>
              </div>

              <div className="feature-highlight">
                <span className="feature-highlight-icon">♾️</span>
                <span className="feature-highlight-text">
                  Practice as many times as needed. Each session generates new questions so you&apos;re always building new muscle memory.
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: Resume Feedback */}
          <section className="preview-section">
            <span className="section-badge">AI-Powered</span>
            <h2 className="section-title">Resume Feedback</h2>
            <p className="section-subtitle">
              Upload your resume and get AI-powered analysis tailored for IB recruiting. Section-by-section scoring with specific, actionable feedback.
            </p>

            <div className="resume-preview">
              <div className="resume-upload">
                <div className="resume-upload-icon">📄</div>
                <div className="resume-upload-title">Drop your resume here</div>
                <div className="resume-upload-hint">PDF format, 1 page recommended</div>
              </div>

              <div className="resume-scores">
                <div className="resume-scores-title">Section Scores</div>
                <div className="resume-score-item">
                  <span className="resume-score-label">Format & Layout</span>
                  <div className="resume-score-bar">
                    <div className="resume-score-fill" style={{ width: '85%' }}></div>
                  </div>
                  <span className="resume-score-value">85</span>
                </div>
                <div className="resume-score-item">
                  <span className="resume-score-label">Education</span>
                  <div className="resume-score-bar">
                    <div className="resume-score-fill" style={{ width: '92%' }}></div>
                  </div>
                  <span className="resume-score-value">92</span>
                </div>
                <div className="resume-score-item">
                  <span className="resume-score-label">Experience</span>
                  <div className="resume-score-bar">
                    <div className="resume-score-fill" style={{ width: '78%' }}></div>
                  </div>
                  <span className="resume-score-value">78</span>
                </div>
                <div className="resume-score-item">
                  <span className="resume-score-label">Skills & Interests</span>
                  <div className="resume-score-bar">
                    <div className="resume-score-fill" style={{ width: '70%' }}></div>
                  </div>
                  <span className="resume-score-value">70</span>
                </div>
                <div className="resume-score-item">
                  <span className="resume-score-label">Writing Quality</span>
                  <div className="resume-score-bar">
                    <div className="resume-score-fill" style={{ width: '88%' }}></div>
                  </div>
                  <span className="resume-score-value">88</span>
                </div>
              </div>
            </div>

            <div className="feature-highlight" style={{ marginTop: 24 }}>
              <span className="feature-highlight-icon">🎯</span>
              <span className="feature-highlight-text">
                Fix issues before you apply. Get specific rewrites for weak bullets and understand exactly what top banks are looking for.
              </span>
            </div>
          </section>

          {/* Section 7: Outreach Tracker (KEY DIFFERENTIATOR) */}
          <section className="outreach-section">
            <span className="outreach-badge">Key Differentiator</span>
            <h2 className="outreach-title">Outreach Tracker</h2>
            <p className="outreach-subtitle">
              Most courses stop at technicals. We help you actually get interviews. Import contacts, generate personalized emails, track responses, and build momentum.
            </p>

            <div className="outreach-features">
              <div className="outreach-feature" style={{ gridColumn: 'span 2' }}>
                <div className="outreach-feature-icon">📥</div>
                <div className="outreach-feature-title">Bulk Import &amp; Generate Emails in Seconds</div>
                <div className="outreach-feature-desc">
                  Upload a spreadsheet with names, banks, and LinkedIn URLs. We auto-generate email addresses using 150+ bank formats and write personalized outreach instantly.
                </div>
                <div className="bulk-import-preview">
                  <div className="bulk-import-flow">
                    <div className="bulk-import-step">
                      <span className="bulk-import-step-number">1</span>
                      <span className="bulk-import-step-text">Upload your CSV or Excel file</span>
                    </div>
                    <div className="spreadsheet-preview">
                      <div className="spreadsheet-header">
                        <span>First Name</span>
                        <span>Last Name</span>
                        <span>Bank</span>
                        <span>LinkedIn URL</span>
                      </div>
                      <div className="spreadsheet-row">
                        <span>John</span>
                        <span>Smith</span>
                        <span>Goldman Sachs</span>
                        <span>linkedin.com/in/jsmith-gs</span>
                      </div>
                      <div className="spreadsheet-row">
                        <span>Sarah</span>
                        <span>Chen</span>
                        <span>Morgan Stanley</span>
                        <span>linkedin.com/in/schen-ms</span>
                      </div>
                      <div className="spreadsheet-row">
                        <span>Michael</span>
                        <span>Johnson</span>
                        <span>J.P. Morgan</span>
                        <span>linkedin.com/in/mjohnson</span>
                      </div>
                      <div className="spreadsheet-row">
                        <span>Emily</span>
                        <span>Williams</span>
                        <span>Evercore</span>
                        <span>linkedin.com/in/ewilliams</span>
                      </div>
                    </div>
                    <div className="bulk-import-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </div>
                    <div className="generated-result">
                      <div className="generated-icon">✅</div>
                      <div className="generated-text">
                        <div className="generated-title">4 contacts imported • 4 emails generated</div>
                        <div className="generated-subtitle">john.smith@gs.com, sarah.chen@morganstanley.com, michael.johnson@jpmorgan.com, emily.williams@evercore.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="outreach-feature">
                <div className="outreach-feature-icon">✨</div>
                <div className="outreach-feature-title">AI Email Generation</div>
                <div className="outreach-feature-desc">
                  AI writes personalized outreach based on your background and theirs. References genuine shared experiences when they exist.
                </div>
                <div className="email-preview">
                  <div className="email-preview-header">
                    <div className="email-preview-field">
                      <span className="email-preview-label">To:</span>
                      <span className="email-preview-value">john.smith@gs.com</span>
                    </div>
                    <div className="email-preview-field">
                      <span className="email-preview-label">Subject:</span>
                      <span className="email-preview-value">Penn Finance Student - Quick Question</span>
                    </div>
                  </div>
                  <div className="email-preview-body">
                    <p>Hi John,</p>
                    <p>I noticed you were also in <span className="email-highlight">Wharton Investment Partners</span> before joining Goldman&apos;s TMT group. I&apos;m currently a junior going through recruiting and would love to hear about your path...</p>
                  </div>
                </div>
              </div>

              <div className="outreach-feature">
                <div className="outreach-feature-icon">📊</div>
                <div className="outreach-feature-title">Progress Tracking</div>
                <div className="outreach-feature-desc">
                  Track contacts added, emails sent, and responses received. Weekly streaks keep you consistent. Unlock achievements as you build your network.
                </div>
              </div>

              <div className="outreach-feature">
                <div className="outreach-feature-icon">🏆</div>
                <div className="outreach-feature-title">Leaderboard</div>
                <div className="outreach-feature-desc">
                  See how your outreach effort compares. The most active networkers rise to the top&mdash;and unlock exclusive benefits.
                </div>
              </div>
            </div>

            {/* Leaderboard with Mentorship Preview */}
            <div className="leaderboard-preview">
              <div className="leaderboard-header">
                <span className="leaderboard-title">Weekly Leaderboard</span>
                <span className="coming-soon-badge">Coming Soon</span>
              </div>
              <div className="leaderboard-rows">
                <div className="leaderboard-row top-5">
                  <span className="leaderboard-rank">1</span>
                  <div className="leaderboard-avatar">JC</div>
                  <span className="leaderboard-name">Jake C.</span>
                  <span className="leaderboard-score">847 pts</span>
                  <span className="leaderboard-badge">Top 5%</span>
                </div>
                <div className="leaderboard-row top-5">
                  <span className="leaderboard-rank">2</span>
                  <div className="leaderboard-avatar">SM</div>
                  <span className="leaderboard-name">Sarah M.</span>
                  <span className="leaderboard-score">792 pts</span>
                  <span className="leaderboard-badge">Top 5%</span>
                </div>
                <div className="leaderboard-row top-5">
                  <span className="leaderboard-rank">3</span>
                  <div className="leaderboard-avatar">AT</div>
                  <span className="leaderboard-name">Alex T.</span>
                  <span className="leaderboard-score">756 pts</span>
                  <span className="leaderboard-badge">Top 5%</span>
                </div>
                <div className="leaderboard-row">
                  <span className="leaderboard-rank">4</span>
                  <div className="leaderboard-avatar">MK</div>
                  <span className="leaderboard-name">Michael K.</span>
                  <span className="leaderboard-score">698 pts</span>
                </div>
                <div className="leaderboard-row">
                  <span className="leaderboard-rank">5</span>
                  <div className="leaderboard-avatar">RL</div>
                  <span className="leaderboard-name">Rachel L.</span>
                  <span className="leaderboard-score">645 pts</span>
                </div>
              </div>
            </div>

            <div className="mentorship-preview">
              <div className="mentorship-header">
                <div className="mentorship-icon">🤝</div>
                <div>
                  <div className="mentorship-title">Mentorship Connection</div>
                  <span className="coming-soon-badge" style={{ marginLeft: 8 }}>Coming Soon</span>
                </div>
              </div>
              <p className="mentorship-desc">
                Top 5% of users on the leaderboard get connected with bankers who&apos;ve been through recruiting. Real conversations. Real advice. Earned through effort.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-price-note">One-time payment</div>
            <div className="cta-price">$250</div>
            <p className="cta-subtitle">Lifetime access. No subscriptions. All future updates included.</p>

            <Link href="/courses/investment-banking-interview-prep" className="cta-button">
              Enroll Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <div className="cta-features">
              <div className="cta-feature">
                <span className="cta-feature-check">✓</span>
                Instant access
              </div>
              <div className="cta-feature">
                <span className="cta-feature-check">✓</span>
                50+ lessons
              </div>
              <div className="cta-feature">
                <span className="cta-feature-check">✓</span>
                270+ quiz questions
              </div>
              <div className="cta-feature">
                <span className="cta-feature-check">✓</span>
                AI tools included
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="preview-footer">
          <div className="footer-links">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
