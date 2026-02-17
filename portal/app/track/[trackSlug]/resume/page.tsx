import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ResumeFeedbackPage } from './ResumeFeedbackPage';

interface PageProps {
  params: Promise<{ trackSlug: string }>;
}

export default async function ResumePageWrapper({ params }: PageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const { trackSlug } = await params;

  return <ResumeFeedbackPage trackSlug={trackSlug} />;
}

export const metadata = {
  title: 'Resume Feedback | Athena',
  description: 'Get AI-powered feedback on your resume for finance recruiting',
};
