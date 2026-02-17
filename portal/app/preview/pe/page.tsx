import Link from 'next/link';

export const metadata = {
  title: 'See What\'s Inside | Private Equity Interview Prep | Athena',
  description: 'Preview the complete PE interview prep course: LBO mastery, paper LBOs, case studies, deal walkthroughs, AI interview simulator, and resume feedback.',
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
          background: radial-gradient(112% 82% at 84.7% 18%, #1e3a5f 0%, #0d1b2a 100%);
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
        .preview-hero-tag {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
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
          background: rgba(30, 58, 95, 0.08);
          border: 1px solid rgba(30, 58, 95, 0.15);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: #1e3a5f;
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
          background: rgba(30, 58, 95, 0.04);
          border-color: rgba(30, 58, 95, 0.12);
        }
        .module-number {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%);
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

        /* Paper LBO Preview */
        .paper-lbo-preview {
          background: linear-gradient(135deg, rgba(30, 58, 95, 0.03) 0%, rgba(30, 58, 95, 0.06) 100%);
          border: 1px solid rgba(30, 58, 95, 0.15);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 20px;
        }
        .paper-lbo-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }
        .paper-lbo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #1e3a5f, #0d1b2a);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .paper-lbo-meta {
          flex: 1;
        }
        .paper-lbo-type {
          font-size: 11px;
          font-weight: 600;
          color: #1e3a5f;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .paper-lbo-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #0A0A0A;
        }
        .paper-lbo-details {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .paper-lbo-detail {
          text-align: center;
          padding: 14px;
          background: white;
          border-radius: 10px;
          border: 1px solid rgba(10, 10, 10, 0.06);
        }
        .paper-lbo-detail-value {
          font-size: 18px;
          font-weight: 700;
          color: #1e3a5f;
          margin-bottom: 4px;
        }
        .paper-lbo-detail-label {
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
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
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
          background: rgba(30, 58, 95, 0.04);
          border-radius: 12px;
        }
        .quiz-stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #1e3a5f;
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
          background: linear-gradient(135deg, rgba(30, 58, 95, 0.1), rgba(30, 58, 95, 0.15));
          border: 1px solid rgba(30, 58, 95, 0.2);
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
          background: linear-gradient(135deg, #1e3a5f, #0d1b2a);
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
          color: #1e3a5f;
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
          background: rgba(30, 58, 95, 0.04);
          border-radius: 10px;
          margin-top: 16px;
        }
        .feature-highlight-icon {
          color: #1e3a5f;
          font-size: 18px;
          flex-shrink: 0;
        }
        .feature-highlight-text {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.7);
          line-height: 1.5;
        }

        /* Deal Walkthrough Section */
        .deal-section {
          background: linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%);
          color: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          padding: 48px;
          margin-bottom: 32px;
        }
        .deal-badge {
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
        .deal-title {
          margin: 0 0 12px;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .deal-subtitle {
          margin: 0 0 36px;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
        }
        .deal-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .deal-feature {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 24px;
        }
        .deal-feature-icon {
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
        .deal-feature-title {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .deal-feature-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
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
          background: linear-gradient(135deg, #1e3a5f, #0d1b2a);
          color: white;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(30, 58, 95, 0.3);
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(30, 58, 95, 0.4);
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
          color: #1e3a5f;
        }

        /* Author Note */
        .author-note {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(30, 58, 95, 0.04) 0%, rgba(30, 58, 95, 0.08) 100%);
          border: 1px solid rgba(30, 58, 95, 0.12);
          border-radius: 12px;
          margin-top: 24px;
        }
        .author-note-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #1e3a5f, #0d1b2a);
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
          .paper-lbo-details {
            grid-template-columns: repeat(2, 1fr);
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
          .deal-section {
            padding: 32px 24px;
          }
          .deal-title {
            font-size: 26px;
          }
          .deal-features {
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
            <div className="preview-hero-tag">For Banking Analysts</div>
            <h1 className="preview-hero-title">Master PE Recruiting</h1>
            <p className="preview-hero-subtitle">
              The complete system for landing your private equity offer. LBO mastery, paper LBOs, case studies, and deal walkthroughs. Built by PE professionals.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="preview-content">
          {/* Section: Course Modules */}
          <section className="preview-section">
            <span className="section-badge">Curriculum</span>
            <h2 className="section-title">7 Comprehensive Modules</h2>
            <p className="section-subtitle">
              From recruiting mechanics to advanced modeling. Everything you need to pass PE interviews at top firms.
            </p>

            <div className="modules-grid">
              <div className="module-item">
                <span className="module-number">1</span>
                <div className="module-info">
                  <div className="module-name">PE Recruiting Mechanics</div>
                  <div className="module-lessons">14 lessons • On-cycle, off-cycle, headhunters</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">2</span>
                <div className="module-info">
                  <div className="module-name">LBO Sources & Uses / Financial Model</div>
                  <div className="module-lessons">16 lessons • Enterprise value, 3-statement integration, goodwill</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">3</span>
                <div className="module-info">
                  <div className="module-name">LBO Debt Schedule / Returns Analysis</div>
                  <div className="module-lessons">11 lessons • IRR, MOIC, sensitivities, advanced structures</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">4</span>
                <div className="module-info">
                  <div className="module-name">Paper LBO & Modeling Tests</div>
                  <div className="module-lessons">9 lessons • Mental math, time management, common mistakes</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">5</span>
                <div className="module-info">
                  <div className="module-name">Advanced PE Modeling</div>
                  <div className="module-lessons">9 lessons • Holdco/opco, complex debt, earnouts, distressed swaps</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">6</span>
                <div className="module-info">
                  <div className="module-name">Case Studies & Investment Judgment</div>
                  <div className="module-lessons">7 lessons • Thesis construction, risk assessment</div>
                </div>
              </div>
              <div className="module-item">
                <span className="module-number">7</span>
                <div className="module-info">
                  <div className="module-name">Deal Walkthroughs & PE Fit</div>
                  <div className="module-lessons">8 lessons • "Walk me through your deal", why PE</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Paper LBO */}
          <section className="preview-section">
            <span className="section-badge">Core Skill</span>
            <h2 className="section-title">Paper LBO Mastery</h2>
            <p className="section-subtitle">
              The defining skill of PE interviews. Learn to solve paper LBOs under pressure with mental math shortcuts and structured frameworks.
            </p>

            <div className="paper-lbo-preview">
              <div className="paper-lbo-header">
                <div className="paper-lbo-icon">📊</div>
                <div className="paper-lbo-meta">
                  <div className="paper-lbo-type">Paper LBO Exercise</div>
                  <h4 className="paper-lbo-title">Software Company Acquisition</h4>
                </div>
              </div>
              <div className="paper-lbo-details">
                <div className="paper-lbo-detail">
                  <div className="paper-lbo-detail-value">$100M</div>
                  <div className="paper-lbo-detail-label">EBITDA</div>
                </div>
                <div className="paper-lbo-detail">
                  <div className="paper-lbo-detail-value">10.0x</div>
                  <div className="paper-lbo-detail-label">Entry Multiple</div>
                </div>
                <div className="paper-lbo-detail">
                  <div className="paper-lbo-detail-value">5.0x</div>
                  <div className="paper-lbo-detail-label">Debt / EBITDA</div>
                </div>
                <div className="paper-lbo-detail">
                  <div className="paper-lbo-detail-value">25%+</div>
                  <div className="paper-lbo-detail-label">Target IRR</div>
                </div>
              </div>
            </div>

            <div className="author-note">
              <div className="author-note-icon">💡</div>
              <div className="author-note-text">
                <strong>Mental math techniques included.</strong> Learn the Rule of 72, doubling shortcuts, and how to approximate IRRs without a calculator—exactly what interviewers expect.
              </div>
            </div>
          </section>

          {/* Section: Quiz Banks */}
          <section className="preview-section">
            <span className="section-badge">Practice</span>
            <h2 className="section-title">325+ Technical Questions</h2>
            <p className="section-subtitle">
              Comprehensive quiz banks focused on what PE interviews actually test: deal economics, returns math, and investment judgment.
            </p>

            <div className="quiz-preview">
              <div className="quiz-header">
                <span className="quiz-progress">Question 7 of 20</span>
                <span className="quiz-difficulty">Hard</span>
              </div>
              <div className="quiz-question">
                A PE firm invests $400M equity at 10x EBITDA. After 5 years, they exit at 9x with EBITDA growing 10% annually. What&apos;s the approximate IRR?
              </div>
              <div className="quiz-options">
                <div className="quiz-option">
                  <span className="quiz-option-key">A</span>
                  <span>~12%</span>
                </div>
                <div className="quiz-option correct">
                  <span className="quiz-option-key">B</span>
                  <span>~17%</span>
                </div>
                <div className="quiz-option">
                  <span className="quiz-option-key">C</span>
                  <span>~22%</span>
                </div>
                <div className="quiz-option">
                  <span className="quiz-option-key">D</span>
                  <span>~27%</span>
                </div>
              </div>
            </div>

            <div className="quiz-stats">
              <div className="quiz-stat">
                <div className="quiz-stat-value">325+</div>
                <div className="quiz-stat-label">Questions</div>
              </div>
              <div className="quiz-stat">
                <div className="quiz-stat-value">7</div>
                <div className="quiz-stat-label">Modules</div>
              </div>
              <div className="quiz-stat">
                <div className="quiz-stat-value">80+</div>
                <div className="quiz-stat-label">Returns Questions</div>
              </div>
            </div>

            <div className="quiz-types">
              <div className="quiz-type">IRR Calculations</div>
              <div className="quiz-type">MOIC Math</div>
              <div className="quiz-type">Deal Economics</div>
              <div className="quiz-type">Investment Judgment</div>
            </div>
          </section>

          {/* Section: Interview Simulator */}
          <section className="preview-section">
            <span className="section-badge">AI-Powered</span>
            <h2 className="section-title">PE Interview Simulator</h2>
            <p className="section-subtitle">
              Practice with an AI interviewer trained on PE interview patterns. Deal walkthroughs, case studies, paper LBOs, and fit questions.
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
                  <span className="interview-step-label">PE VP Evaluation</span>
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
                    <div className="feedback-role">Question: Walk me through your most impactful deal</div>
                  </div>
                </div>
                <div className="feedback-content">
                  <p>
                    Your deal walkthrough was well-structured—you led with context, moved through the analysis, and closed with outcomes. The valuation discussion showed technical depth.
                  </p>
                  <p>
                    Consider adding more color on your specific contributions. What analysis did <em>you</em> own? How did your work influence the client&apos;s decision? PE firms want to see judgment, not just execution.
                  </p>
                </div>
                <div className="feedback-scores">
                  <div className="feedback-score">
                    <div className="feedback-score-value">8.5</div>
                    <div className="feedback-score-label">Technical</div>
                  </div>
                  <div className="feedback-score">
                    <div className="feedback-score-value">7.5</div>
                    <div className="feedback-score-label">Judgment</div>
                  </div>
                  <div className="feedback-score">
                    <div className="feedback-score-value">8.0</div>
                    <div className="feedback-score-label">Communication</div>
                  </div>
                </div>
              </div>

              <div className="feature-highlight">
                <span className="feature-highlight-icon">♾️</span>
                <span className="feature-highlight-text">
                  Unlimited practice. Each session covers deal walkthroughs, technical questions, case prompts, and fit questions—just like a real PE interview.
                </span>
              </div>
            </div>
          </section>

          {/* Deal Walkthrough Section */}
          <section className="deal-section">
            <span className="deal-badge">Critical Skill</span>
            <h2 className="deal-title">&ldquo;Walk Me Through Your Deal&rdquo;</h2>
            <p className="deal-subtitle">
              Every PE interview includes this question. We teach you the exact framework to turn your banking experience into a compelling PE narrative.
            </p>

            <div className="deal-features">
              <div className="deal-feature">
                <div className="deal-feature-icon">📋</div>
                <div className="deal-feature-title">Deal Selection Framework</div>
                <div className="deal-feature-desc">
                  Which deal to choose, how to frame it, and what details PE interviewers actually care about.
                </div>
              </div>
              <div className="deal-feature">
                <div className="deal-feature-icon">🎯</div>
                <div className="deal-feature-title">Your Role & Contribution</div>
                <div className="deal-feature-desc">
                  How to articulate your specific contributions without overstating or understating your role.
                </div>
              </div>
              <div className="deal-feature">
                <div className="deal-feature-icon">💰</div>
                <div className="deal-feature-title">Investment Judgment</div>
                <div className="deal-feature-desc">
                  Answering &ldquo;Would you invest?&rdquo; with conviction. Building investment theses from banking deals.
                </div>
              </div>
              <div className="deal-feature">
                <div className="deal-feature-icon">❓</div>
                <div className="deal-feature-title">Follow-Up Questions</div>
                <div className="deal-feature-desc">
                  Anticipate and prepare for the drill-down questions that test depth and judgment.
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-price-note">One-time payment</div>
            <div className="cta-price">$295</div>
            <p className="cta-subtitle">Lifetime access. No subscriptions. All future updates included.</p>

            <Link href="/courses/private-equity-interview-prep" className="cta-button">
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
                70+ lessons
              </div>
              <div className="cta-feature">
                <span className="cta-feature-check">✓</span>
                325+ quiz questions
              </div>
              <div className="cta-feature">
                <span className="cta-feature-check">✓</span>
                AI interview simulator
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
