import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security - Athena',
  description: 'How Athena protects your data and privacy.',
};

export default function SecurityPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 8 }}>Security</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>How we protect your data</p>

      <div style={{ lineHeight: 1.7 }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Data Protection</h2>
          <p style={{ marginBottom: 16 }}>
            We implement industry-standard security measures to protect your information:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Encryption:</strong> All data is encrypted in transit (TLS) and at rest (AES-256)</li>
            <li><strong>Authentication:</strong> Secure login with support for multi-factor authentication</li>
            <li><strong>Payment Security:</strong> Payment processing is PCI-DSS Level 1 compliant - we never store card details</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Data Minimization</h2>
          <p style={{ marginBottom: 16 }}>
            We only collect data necessary to provide our services, and we don&apos;t keep it longer than needed:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>Uploaded files are automatically deleted after processing</li>
            <li>We retain only the feedback and scores you need for your preparation</li>
            <li>You can request deletion of your data at any time</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Infrastructure</h2>
          <p>
            Our infrastructure is hosted on SOC 2 Type II compliant platforms with automatic
            backups, DDoS protection, and 24/7 monitoring.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Reporting Security Issues</h2>
          <p>
            If you discover a security vulnerability, please report it to{' '}
            <a href="mailto:help@athena.pe" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
              help@athena.pe
            </a>
            . We take all reports seriously and will respond promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
