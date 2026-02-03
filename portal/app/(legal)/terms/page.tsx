import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Athena',
  description: 'Terms of Service for Athena educational courses and services.',
};

export default function TermsOfServicePage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Last updated: January 2025</p>

      <div style={{ lineHeight: 1.7 }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>1. Agreement to Terms</h2>
          <p style={{ marginBottom: 16 }}>
            By accessing or using Athena&apos;s educational courses and services (&quot;Services&quot;),
            you agree to be bound by these Terms of Service. If you do not agree to these terms,
            please do not use our Services.
          </p>
          <p>
            &quot;Athena,&quot; &quot;we,&quot; &quot;us,&quot; and &quot;our&quot; refer to Athena Recruiting and Training.
            &quot;You&quot; and &quot;your&quot; refer to the individual accessing or using our Services.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>2. Description of Services</h2>
          <p style={{ marginBottom: 16 }}>
            Athena provides online educational courses focused on investment banking and private
            equity interview preparation. Our Services include:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Video lessons and written content</li>
            <li>Practice exercises and quizzes</li>
            <li>Resume feedback tools</li>
            <li>Interview simulation features</li>
          </ul>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of our Services
            at any time without prior notice.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>3. Account Registration</h2>
          <p style={{ marginBottom: 16 }}>
            To access our courses, you must create an account and provide accurate, current,
            and complete information. You are responsible for:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>4. Course Access and Licensing</h2>
          <p style={{ marginBottom: 16 }}>
            Upon purchase, you are granted a limited, non-exclusive, non-transferable license
            to access and view the course content for personal, non-commercial educational purposes.
          </p>
          <p style={{ marginBottom: 16 }}>You may NOT:</p>
          <ul style={{ marginLeft: 24 }}>
            <li>Share, distribute, or resell course content</li>
            <li>Record, download, or reproduce video content</li>
            <li>Share your account credentials with others</li>
            <li>Use the content for commercial training purposes</li>
            <li>Remove or alter any copyright notices</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>5. Payment Terms</h2>
          <p style={{ marginBottom: 16 }}>
            Course purchases are one-time payments processed securely through Stripe.
            All prices are in US dollars unless otherwise stated.
          </p>
          <p>
            By making a purchase, you authorize us to charge your payment method for the
            total amount of your order.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>6. Refund Policy</h2>
          <p style={{ marginBottom: 16 }}>
            All sales are final. Due to the digital nature of our products and immediate
            access granted upon purchase, we do not offer refunds. Please review course
            descriptions carefully before purchasing.
          </p>
          <p>
            For more details, please see our <a href="/refund-policy" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>Refund Policy</a>.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>7. Intellectual Property</h2>
          <p style={{ marginBottom: 16 }}>
            All content, including but not limited to videos, text, graphics, logos, and
            software, is owned by Athena or its licensors and is protected by copyright,
            trademark, and other intellectual property laws.
          </p>
          <p>
            You may not use our trademarks or branding without prior written consent.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>8. User Conduct</h2>
          <p style={{ marginBottom: 16 }}>You agree not to:</p>
          <ul style={{ marginLeft: 24 }}>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of our Services</li>
            <li>Upload malicious code or content</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>9. Disclaimers</h2>
          <p style={{ marginBottom: 16 }}>
            <strong>Educational Purpose Only:</strong> Our courses are for educational purposes
            only and do not constitute professional advice. We do not guarantee employment
            outcomes, job offers, or interview success.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>No Investment Advice:</strong> Nothing in our content should be construed
            as investment, financial, or legal advice. Consult qualified professionals for
            specific guidance.
          </p>
          <p>
            <strong>As-Is Basis:</strong> Our Services are provided &quot;as is&quot; without warranties
            of any kind, express or implied, including but not limited to merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Athena shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising from
            your use of our Services. Our total liability shall not exceed the amount you
            paid for the course.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>11. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to our Services at
            any time for violation of these terms or for any other reason at our sole
            discretion. Upon termination, your license to access course content ends immediately.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>12. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Continued use of our
            Services after changes constitutes acceptance of the new terms. We encourage
            you to review this page periodically.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>13. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of
            the State of Delaware, without regard to conflict of law principles.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>14. Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:help@athena.pe" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
              help@athena.pe
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
