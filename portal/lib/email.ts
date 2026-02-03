/**
 * Email utilities using Resend
 *
 * Handles transactional emails:
 * - Purchase confirmation
 * - Welcome email
 * - Password reset (handled by Clerk)
 */

import { Resend } from 'resend';

// Initialize Resend client
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

// Email sender configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'Athena <noreply@athena.pe>';
const SUPPORT_EMAIL = process.env.EMAIL_SUPPORT || 'help@athena.pe';

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send purchase confirmation email
 */
export async function sendPurchaseConfirmationEmail(
  to: string,
  data: {
    userName: string;
    productName: string;
    amountPaid: string; // Formatted, e.g., "$285.00"
    purchaseDate: string;
    loginUrl: string;
  }
): Promise<SendEmailResult> {
  const resend = getResendClient();

  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Welcome to ${data.productName} - Athena`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">

  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-size: 24px; font-weight: 600; margin: 0; color: #1a1a1a;">Athena</h1>
  </div>

  <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">Welcome, ${data.userName}!</h2>

  <p style="margin-bottom: 16px;">Thank you for purchasing <strong>${data.productName}</strong>.</p>

  <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 24px 0;">
    <p style="margin: 0 0 8px 0;"><strong>Order Details</strong></p>
    <p style="margin: 0; color: #666;">Amount: ${data.amountPaid}</p>
    <p style="margin: 0; color: #666;">Date: ${data.purchaseDate}</p>
  </div>

  <p style="margin-bottom: 24px;">You now have lifetime access to the course. Log in to start learning:</p>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${data.loginUrl}" style="display: inline-block; background: #1a1a1a; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 500;">Access Your Course</a>
  </div>

  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

  <p style="color: #666; font-size: 14px; margin-bottom: 8px;">Need help? Contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #1a1a1a;">${SUPPORT_EMAIL}</a></p>

  <p style="color: #999; font-size: 12px; margin-top: 32px;">
    Athena Recruiting and Training<br>
    This email was sent to ${to}
  </p>

</body>
</html>
      `,
      text: `
Welcome, ${data.userName}!

Thank you for purchasing ${data.productName}.

Order Details:
- Amount: ${data.amountPaid}
- Date: ${data.purchaseDate}

You now have lifetime access to the course. Log in to start learning:
${data.loginUrl}

Need help? Contact us at ${SUPPORT_EMAIL}

Athena Recruiting and Training
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email send error:', error);
    return { success: false, error: message };
  }
}

/**
 * Send welcome email after signup
 */
export async function sendWelcomeEmail(
  to: string,
  data: {
    userName: string;
    loginUrl: string;
  }
): Promise<SendEmailResult> {
  const resend = getResendClient();

  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Welcome to Athena',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">

  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-size: 24px; font-weight: 600; margin: 0; color: #1a1a1a;">Athena</h1>
  </div>

  <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">Welcome, ${data.userName}!</h2>

  <p style="margin-bottom: 16px;">Your account has been created. You're ready to start your journey into finance.</p>

  <p style="margin-bottom: 24px;">Browse our courses and start preparing for your investment banking or private equity interviews.</p>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${data.loginUrl}" style="display: inline-block; background: #1a1a1a; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 500;">Explore Courses</a>
  </div>

  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

  <p style="color: #666; font-size: 14px;">Questions? Contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #1a1a1a;">${SUPPORT_EMAIL}</a></p>

  <p style="color: #999; font-size: 12px; margin-top: 32px;">
    Athena Recruiting and Training<br>
    This email was sent to ${to}
  </p>

</body>
</html>
      `,
      text: `
Welcome, ${data.userName}!

Your account has been created. You're ready to start your journey into finance.

Browse our courses and start preparing for your investment banking or private equity interviews.

Explore Courses: ${data.loginUrl}

Questions? Contact us at ${SUPPORT_EMAIL}

Athena Recruiting and Training
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email send error:', error);
    return { success: false, error: message };
  }
}

/**
 * Send refund confirmation email
 */
export async function sendRefundConfirmationEmail(
  to: string,
  data: {
    userName: string;
    productName: string;
    refundAmount: string;
    refundDate: string;
  }
): Promise<SendEmailResult> {
  const resend = getResendClient();

  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Refund Processed - ${data.productName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">

  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-size: 24px; font-weight: 600; margin: 0; color: #1a1a1a;">Athena</h1>
  </div>

  <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">Refund Processed</h2>

  <p style="margin-bottom: 16px;">Hi ${data.userName},</p>

  <p style="margin-bottom: 16px;">We've processed a refund for your purchase of <strong>${data.productName}</strong>.</p>

  <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 24px 0;">
    <p style="margin: 0 0 8px 0;"><strong>Refund Details</strong></p>
    <p style="margin: 0; color: #666;">Amount: ${data.refundAmount}</p>
    <p style="margin: 0; color: #666;">Date: ${data.refundDate}</p>
  </div>

  <p style="margin-bottom: 16px;">The refund will appear on your original payment method within 5-10 business days, depending on your bank.</p>

  <p style="margin-bottom: 16px;">Your access to the course has been revoked.</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

  <p style="color: #666; font-size: 14px;">Questions? Contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #1a1a1a;">${SUPPORT_EMAIL}</a></p>

  <p style="color: #999; font-size: 12px; margin-top: 32px;">
    Athena Recruiting and Training<br>
    This email was sent to ${to}
  </p>

</body>
</html>
      `,
      text: `
Refund Processed

Hi ${data.userName},

We've processed a refund for your purchase of ${data.productName}.

Refund Details:
- Amount: ${data.refundAmount}
- Date: ${data.refundDate}

The refund will appear on your original payment method within 5-10 business days, depending on your bank.

Your access to the course has been revoked.

Questions? Contact us at ${SUPPORT_EMAIL}

Athena Recruiting and Training
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email send error:', error);
    return { success: false, error: message };
  }
}
