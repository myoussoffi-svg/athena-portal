'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const grantAccess = async (productSlug: string) => {
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/grant-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`✓ Access granted to ${productSlug}`);
      } else {
        setStatus(`✗ Error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div style={{ padding: 48 }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: 48 }}>
        <h1>Admin</h1>
        <p>Please sign in to access admin features.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 48 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Admin Panel</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>
        Signed in as: {user.emailAddresses[0]?.emailAddress}
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Grant Course Access</h2>
        <p style={{ color: '#666', marginBottom: 16, fontSize: 14 }}>
          Click a button to grant yourself free access to a course (for testing).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => grantAccess('investment-banking-interview-prep')}
            disabled={isLoading}
            style={{
              padding: '12px 20px',
              background: '#1a1a1a',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: 14,
              textAlign: 'left',
            }}
          >
            Grant: Investment Banking Interview Prep ($250)
          </button>

          <button
            onClick={() => grantAccess('private-equity-interview-prep')}
            disabled={isLoading}
            style={{
              padding: '12px 20px',
              background: '#666',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: 14,
              textAlign: 'left',
            }}
          >
            Grant: Private Equity Interview Prep ($345) - Not Active
          </button>
        </div>

        {status && (
          <p style={{
            marginTop: 16,
            padding: 12,
            background: status.startsWith('✓') ? '#dcfce7' : '#fee2e2',
            borderRadius: 8,
            fontSize: 14,
          }}>
            {status}
          </p>
        )}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>User Management</h2>
        <Link
          href="/admin/users"
          style={{
            display: 'block',
            padding: '12px 20px',
            background: '#f5f5f5',
            color: '#1a1a1a',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          View User Profiles & Outreach Data →
        </Link>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Quick Links</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: 8 }}>
            <Link href="/track/investment-banking-interview-prep" style={{ color: '#1a1a1a' }}>
              → Go to IB Course
            </Link>
          </li>
          <li style={{ marginBottom: 8 }}>
            <Link href="/courses/investment-banking-interview-prep" style={{ color: '#1a1a1a' }}>
              → IB Course Purchase Page
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
