import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Athena',
  description: 'Privacy Policy for Athena educational courses and services.',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Last updated: February 2025</p>

      <div style={{ lineHeight: 1.7 }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>1. Introduction</h2>
          <p style={{ marginBottom: 16 }}>
            Athena Recruiting and Training (&quot;Athena,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
            privacy and is committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data when you use our
            educational courses and services.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>2. Information We Collect</h2>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, marginTop: 16 }}>
            2.1 Information You Provide
          </h3>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
            <li><strong>Profile Information:</strong> School, major, graduation year, career interests, experience level, hometown, and outreach preferences you provide to personalize your experience</li>
            <li><strong>Payment Information:</strong> Billing address and payment details (processed securely by Stripe)</li>
            <li><strong>Resume Data:</strong> Resumes you upload for feedback (processed and then deleted; we do not store resume text)</li>
            <li><strong>Interview Recordings:</strong> Video/audio from interview practice sessions</li>
            <li><strong>Outreach Activity:</strong> Contacts you add (including names, firms, roles, email addresses, and LinkedIn URLs of third parties) and emails you generate using the outreach tracker</li>
            <li><strong>Communications:</strong> Messages you send to our support team</li>
          </ul>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            2.2 Information Collected Automatically
          </h3>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Usage Data:</strong> Pages visited, features used, lesson progress</li>
            <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
            <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>3. How We Use Your Information</h2>
          <p style={{ marginBottom: 16 }}>We use your information to:</p>
          <ul style={{ marginLeft: 24 }}>
            <li>Provide and improve our educational services</li>
            <li>Process payments and maintain your account</li>
            <li>Provide AI-powered resume feedback and interview evaluation</li>
            <li>Generate personalized outreach emails based on your profile and background</li>
            <li>Track your learning progress and outreach activity</li>
            <li>Facilitate mentorship connections and community features</li>
            <li>Send transactional emails (receipts, account updates)</li>
            <li>Respond to your inquiries and provide support</li>
            <li>Analyze usage patterns to improve our platform</li>
            <li>Prevent fraud and ensure security</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>4. Resume and Interview Data</h2>
          <p style={{ marginBottom: 16 }}>
            <strong>Resume Processing:</strong> When you upload a resume for feedback, we process
            it using AI to generate feedback. The resume file and any screenshots taken for
            formatting analysis are deleted within 7 days of processing. We retain only the
            AI-generated feedback and non-identifying metadata (page count, section scores).
            We do NOT store the full text of your resume.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Interview Simulator:</strong> By using the interview simulator, you consent
            to video and audio recording of your practice sessions. Recordings are processed
            using AI to generate transcripts, evaluation scores, and personalized feedback.
            Video files are automatically deleted within 30 days. Transcripts, scores, and
            feedback are retained to track your progress and for your future reference.
          </p>
          <p>
            <strong>AI Processing:</strong> Resume content and interview recordings are sent to
            third-party AI providers (Anthropic) for analysis. These providers process the data
            according to their privacy policies and do not use your content to train their models.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>5. Data Sharing</h2>
          <p style={{ marginBottom: 16 }}>We do not sell your personal information. We may share data with:</p>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Internal Team:</strong> Our team members may access your profile and activity data to provide support, facilitate mentorship connections, and improve our services</li>
            <li><strong>Service Providers:</strong> Stripe (payments), Clerk (authentication), Anthropic (AI processing), cloud hosting providers</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>6. Data Security</h2>
          <p style={{ marginBottom: 16 }}>
            We implement industry-standard security measures to protect your information:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>Encryption in transit (HTTPS/TLS)</li>
            <li>Secure payment processing through Stripe (PCI-DSS compliant)</li>
            <li>Access controls and authentication</li>
            <li>Regular security reviews</li>
          </ul>
          <p style={{ marginTop: 16 }}>
            However, no method of transmission or storage is 100% secure. We cannot guarantee
            absolute security.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>7. Data Retention</h2>
          <p>
            We retain your account information for as long as your account is active. Course
            progress and feedback are retained to provide ongoing access. You may request
            deletion of your account and associated data at any time by contacting us.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>8. Your Rights</h2>
          <p style={{ marginBottom: 16 }}>Depending on your location, you may have the right to:</p>
          <ul style={{ marginLeft: 24 }}>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict certain processing</li>
            <li>Data portability</li>
          </ul>
          <p style={{ marginTop: 16 }}>
            To exercise these rights, contact us at{' '}
            <a href="mailto:help@athena.pe" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
              help@athena.pe
            </a>
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>9. Cookies and Tracking</h2>
          <p style={{ marginBottom: 16 }}>
            We use essential cookies for authentication and site functionality. We may use
            analytics tools to understand how users interact with our platform.
          </p>
          <p>
            You can control cookies through your browser settings, but disabling essential
            cookies may affect site functionality.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>10. Third-Party Services</h2>
          <p style={{ marginBottom: 16 }}>Our Services integrate with:</p>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Clerk:</strong> Authentication (<a href="https://clerk.com/privacy" style={{ color: '#1a1a1a', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
            <li><strong>Stripe:</strong> Payment processing (<a href="https://stripe.com/privacy" style={{ color: '#1a1a1a', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
            <li><strong>Anthropic:</strong> AI processing for resume feedback and interview evaluation (<a href="https://www.anthropic.com/privacy" style={{ color: '#1a1a1a', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
            <li><strong>Cloudflare:</strong> Cloud storage for uploaded files</li>
            <li><strong>Vimeo/YouTube:</strong> Educational video hosting</li>
            <li><strong>Vercel:</strong> Application hosting</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>11. Children&apos;s Privacy</h2>
          <p>
            Our Services are not intended for children under 16. We do not knowingly collect
            information from children. If you believe we have collected data from a child,
            please contact us immediately.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>12. International Users</h2>
          <p>
            Our Services are operated in the United States. If you access our Services from
            outside the US, your information may be transferred to and processed in the US.
            By using our Services, you consent to this transfer.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>13. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of
            significant changes by posting the new policy on this page and updating the
            &quot;Last updated&quot; date.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>14. Contact Us</h2>
          <p>
            For questions about this Privacy Policy or your personal data, please contact us at{' '}
            <a href="mailto:help@athena.pe" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
              help@athena.pe
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
