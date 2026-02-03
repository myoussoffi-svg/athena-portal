import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - Athena',
  description: 'Refund Policy for Athena educational courses.',
};

export default function RefundPolicyPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 8 }}>Refund Policy</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Last updated: January 2025</p>

      <div style={{ lineHeight: 1.7 }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>No Refunds Policy</h2>
          <p style={{ marginBottom: 16 }}>
            Due to the digital nature of our educational courses and the immediate access
            granted upon purchase, <strong>all sales are final and non-refundable</strong>.
          </p>
          <p style={{ marginBottom: 16 }}>
            When you purchase a course, you receive instant access to all course content,
            including video lessons, written materials, practice exercises, and interactive
            features. Because digital products cannot be &quot;returned&quot; once accessed, we cannot
            offer refunds.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Before You Purchase</h2>
          <p style={{ marginBottom: 16 }}>
            We encourage you to review all available information before making a purchase:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>Course descriptions and curriculum outlines</li>
            <li>Sample content or previews (when available)</li>
            <li>Frequently asked questions</li>
            <li>Contact us with any questions before purchasing</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Exceptions</h2>
          <p style={{ marginBottom: 16 }}>
            In rare circumstances, we may consider exceptions at our sole discretion:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Duplicate Purchases:</strong> If you accidentally purchased the same course twice</li>
            <li><strong>Technical Issues:</strong> If a verified technical problem on our end prevents you from accessing purchased content and we cannot resolve it</li>
            <li><strong>Unauthorized Transactions:</strong> If your payment method was used without your authorization (please also contact your bank)</li>
          </ul>
          <p style={{ marginTop: 16 }}>
            To request an exception, contact us within 48 hours of your purchase with your
            order details and explanation.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Chargebacks</h2>
          <p style={{ marginBottom: 16 }}>
            Filing a chargeback with your bank instead of contacting us directly will result
            in immediate suspension of your account and access to all purchased content.
          </p>
          <p>
            We encourage you to contact us first at{' '}
            <a href="mailto:help@athena.pe" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
              help@athena.pe
            </a>{' '}
            to resolve any issues before initiating a dispute with your financial institution.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Course Access</h2>
          <p>
            Once purchased, you have lifetime access to the course content, including any
            future updates. Your access remains valid as long as your account is in good
            standing and you comply with our Terms of Service.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Contact Us</h2>
          <p>
            If you have questions about this policy or need assistance, please contact us at{' '}
            <a href="mailto:help@athena.pe" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
              help@athena.pe
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
