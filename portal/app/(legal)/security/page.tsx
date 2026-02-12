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
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Encryption in Transit:</strong> All data is transmitted over HTTPS/TLS</li>
            <li><strong>Encryption at Rest:</strong> Database and file storage use AES-256 encryption</li>
            <li><strong>Secure Authentication:</strong> Powered by Clerk with support for multi-factor authentication</li>
            <li><strong>Payment Security:</strong> Handled by Stripe (PCI-DSS Level 1 compliant) - we never see your card details</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Data Minimization</h2>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Resume Files:</strong> Automatically deleted within 7 days of processing</li>
            <li><strong>Interview Videos:</strong> Automatically deleted within 30 days</li>
            <li><strong>No Unnecessary Data:</strong> We only collect information required to provide our services</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Infrastructure</h2>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Hosting:</strong> Vercel (SOC 2 Type II compliant)</li>
            <li><strong>Database:</strong> Neon PostgreSQL (SOC 2 Type II compliant)</li>
            <li><strong>File Storage:</strong> Cloudflare R2 with presigned URLs (no public access)</li>
            <li><strong>AI Processing:</strong> Anthropic Claude (data not used for training)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Access Controls</h2>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Session Limits:</strong> Maximum 2 concurrent sessions per account</li>
            <li><strong>Role-Based Access:</strong> Admin functions require explicit authorization</li>
            <li><strong>Audit Logging:</strong> Administrative actions are logged for accountability</li>
          </ul>
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
