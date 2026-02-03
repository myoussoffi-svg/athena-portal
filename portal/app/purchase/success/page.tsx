import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { purchases, products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Purchase Complete - Athena',
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PurchaseSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Look up the purchase by session ID
  let purchase = null;
  let product = null;

  if (session_id) {
    const result = await db
      .select({
        purchase: purchases,
        product: products,
      })
      .from(purchases)
      .innerJoin(products, eq(purchases.productId, products.id))
      .where(eq(purchases.stripeCheckoutSessionId, session_id))
      .limit(1);

    if (result[0]) {
      purchase = result[0].purchase;
      product = result[0].product;
    }
  }

  // If no specific purchase found, get the user's most recent purchase
  if (!purchase) {
    const result = await db
      .select({
        purchase: purchases,
        product: products,
      })
      .from(purchases)
      .innerJoin(products, eq(purchases.productId, products.id))
      .where(eq(purchases.userId, userId))
      .orderBy(purchases.purchasedAt)
      .limit(1);

    if (result[0]) {
      purchase = result[0].purchase;
      product = result[0].product;
    }
  }

  // Get the track to redirect to
  const grantedTracks = (product?.grantedTrackSlugs || []) as string[];
  const trackSlug = grantedTracks[0];

  return (
    <div style={{
      maxWidth: 600,
      margin: '0 auto',
      padding: '80px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: '#10b981',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>
        Purchase Complete!
      </h1>

      {product && (
        <p style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
          You now have access to <strong>{product.name}</strong>
        </p>
      )}

      {!product && (
        <p style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
          Your purchase has been confirmed. You now have course access.
        </p>
      )}

      <div style={{
        background: '#f8f9fa',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        textAlign: 'left',
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
          What&apos;s Next?
        </h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>Access all course lessons and materials</li>
          <li>Practice with our interview simulator</li>
          <li>Get AI-powered resume feedback</li>
          <li>Track your progress as you learn</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        {trackSlug && (
          <Link
            href={`/track/${trackSlug}`}
            style={{
              display: 'inline-block',
              background: '#1a1a1a',
              color: 'white',
              padding: '12px 32px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Start Learning
          </Link>
        )}

        {!trackSlug && (
          <Link
            href="/track"
            style={{
              display: 'inline-block',
              background: '#1a1a1a',
              color: 'white',
              padding: '12px 32px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Go to Courses
          </Link>
        )}
      </div>

      <p style={{ marginTop: 32, fontSize: 14, color: '#999' }}>
        A confirmation email has been sent to your email address.
      </p>
    </div>
  );
}
