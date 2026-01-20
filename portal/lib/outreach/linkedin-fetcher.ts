/**
 * LinkedIn Profile Fetcher
 *
 * Uses Jina Reader (r.jina.ai) to extract content from LinkedIn profiles.
 * This is a free service that converts web pages to markdown.
 *
 * LinkedIn may block some requests, so we handle failures gracefully.
 */

export interface LinkedInProfile {
  headline: string | null;
  about: string | null;
  experience: string[];
  education: string[];
  rawContent: string;
  fetchedAt: string;
}

export interface LinkedInFetchResult {
  success: boolean;
  profile: LinkedInProfile | null;
  error: string | null;
}

/**
 * Fetch LinkedIn profile content via Jina Reader
 */
export async function fetchLinkedInProfile(linkedinUrl: string): Promise<LinkedInFetchResult> {
  try {
    // Validate URL
    const url = new URL(linkedinUrl);
    if (url.hostname !== 'linkedin.com' && url.hostname !== 'www.linkedin.com') {
      return {
        success: false,
        profile: null,
        error: 'Invalid LinkedIn URL',
      };
    }

    // Use Jina Reader to fetch the page content
    const jinaUrl = `https://r.jina.ai/${linkedinUrl}`;

    const response = await fetch(jinaUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
        // Add a reasonable timeout
      },
      signal: AbortSignal.timeout(15000), // 15 second timeout
    });

    if (!response.ok) {
      // Check for common failure modes
      if (response.status === 403 || response.status === 401) {
        return {
          success: false,
          profile: null,
          error: 'LinkedIn blocked access. Profile may be private or require authentication.',
        };
      }
      return {
        success: false,
        profile: null,
        error: `Failed to fetch profile: ${response.status}`,
      };
    }

    const content = await response.text();

    // Check if we got meaningful content
    if (!content || content.length < 100) {
      return {
        success: false,
        profile: null,
        error: 'Could not extract profile content. Profile may be private.',
      };
    }

    // Check for common LinkedIn blocking patterns
    if (content.includes('authwall') || content.includes('Sign in') || content.includes('Join now')) {
      return {
        success: false,
        profile: null,
        error: 'LinkedIn requires authentication to view this profile.',
      };
    }

    // Parse the content to extract structured info
    const profile = parseLinkedInContent(content);

    return {
      success: true,
      profile,
      error: null,
    };
  } catch (error) {
    // Handle timeout
    if (error instanceof Error && error.name === 'TimeoutError') {
      return {
        success: false,
        profile: null,
        error: 'Request timed out. Please try again.',
      };
    }

    return {
      success: false,
      profile: null,
      error: error instanceof Error ? error.message : 'Unknown error fetching profile',
    };
  }
}

/**
 * Format experience entry to clearly show Title at Company
 */
function formatExperienceEntry(lines: string[]): string {
  if (lines.length === 0) return '';

  // First line is usually the job title
  const title = lines[0];

  // Second line is usually the company
  const company = lines.length > 1 ? lines[1] : '';

  // Third line or beyond may have dates
  const dateInfo = lines.find(l =>
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b.*\d{4}/.test(l) ||
    /\d{4}\s*[-–—]\s*(Present|\d{4})/.test(l)
  ) || '';

  // Format clearly: "Title at Company (Dates)"
  if (company && !company.includes(title)) {
    const formatted = dateInfo
      ? `${title} at ${company} (${dateInfo})`
      : `${title} at ${company}`;
    return formatted;
  }

  // Fallback: join with clear separator
  return lines.slice(0, 3).join(' | ');
}

/**
 * Parse the raw content from Jina Reader to extract structured LinkedIn data
 */
function parseLinkedInContent(content: string): LinkedInProfile {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  let headline: string | null = null;
  let about: string | null = null;
  const experience: string[] = [];
  const education: string[] = [];

  let currentSection: 'none' | 'about' | 'experience' | 'education' = 'none';
  const aboutLines: string[] = [];
  const expLines: string[] = [];
  const eduLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Try to find the headline (usually near the top, after the name)
    if (!headline && i < 20 && !lowerLine.includes('linkedin') && line.length > 10 && line.length < 150) {
      // Look for typical headline patterns (title at company, or descriptive headline)
      if (line.includes(' at ') || line.includes(' | ') || line.includes('·')) {
        headline = line;
      }
    }

    // Detect section headers
    if (lowerLine === 'about' || lowerLine.startsWith('about ')) {
      currentSection = 'about';
      continue;
    } else if (lowerLine === 'experience' || lowerLine.startsWith('experience ')) {
      currentSection = 'experience';
      continue;
    } else if (lowerLine === 'education' || lowerLine.startsWith('education ')) {
      currentSection = 'education';
      continue;
    } else if (lowerLine === 'skills' || lowerLine === 'licenses' || lowerLine === 'certifications' ||
               lowerLine === 'recommendations' || lowerLine === 'interests' || lowerLine === 'activity') {
      // End of relevant sections
      currentSection = 'none';
      continue;
    }

    // Collect content based on current section
    if (currentSection === 'about' && aboutLines.length < 20) {
      aboutLines.push(line);
    } else if (currentSection === 'experience' && expLines.length < 30) {
      expLines.push(line);
    } else if (currentSection === 'education' && eduLines.length < 15) {
      eduLines.push(line);
    }
  }

  // Process collected content
  if (aboutLines.length > 0) {
    about = aboutLines.join(' ').slice(0, 1500); // Limit length
  }

  // Group experience lines into roles - preserve exact job titles
  // LinkedIn typically formats as: Title, Company, Dates, Description
  let currentRole: string[] = [];
  for (const line of expLines) {
    // Date patterns or company indicators often signal a new role entry
    const isDateLine = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b.*\d{4}/.test(line) ||
                       /\d{4}\s*[-–—]\s*(Present|\d{4})/.test(line);

    if (isDateLine && currentRole.length > 0) {
      // Include the date with the current role, then start fresh
      currentRole.push(line);
      experience.push(formatExperienceEntry(currentRole));
      currentRole = [];
    } else if (currentRole.length >= 4 && line.length > 50) {
      // Long line after we have title/company/dates is likely description - skip to keep it concise
      continue;
    } else {
      currentRole.push(line);
    }
  }
  if (currentRole.length > 0) {
    experience.push(formatExperienceEntry(currentRole));
  }

  // Group education similarly
  let currentEdu: string[] = [];
  for (const line of eduLines) {
    if (/\d{4}/.test(line) && currentEdu.length > 0) {
      education.push(currentEdu.join(' | '));
      currentEdu = [line];
    } else {
      currentEdu.push(line);
    }
  }
  if (currentEdu.length > 0) {
    education.push(currentEdu.join(' | '));
  }

  return {
    headline,
    about,
    experience: experience.slice(0, 5), // Limit to 5 most recent
    education: education.slice(0, 3), // Limit to 3
    rawContent: content.slice(0, 5000), // Keep first 5000 chars as backup
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Format LinkedIn profile for inclusion in email generation prompt
 */
export function formatProfileForPrompt(profile: LinkedInProfile): string {
  const parts: string[] = [];

  if (profile.headline) {
    parts.push(`Headline: ${profile.headline}`);
  }

  if (profile.about) {
    parts.push(`About: ${profile.about}`);
  }

  if (profile.experience.length > 0) {
    parts.push(`Recent Experience:\n${profile.experience.map(e => `- ${e}`).join('\n')}`);
  }

  if (profile.education.length > 0) {
    parts.push(`Education:\n${profile.education.map(e => `- ${e}`).join('\n')}`);
  }

  if (parts.length === 0) {
    // Fall back to raw content summary
    return `LinkedIn profile content (summary):\n${profile.rawContent.slice(0, 1000)}`;
  }

  return parts.join('\n\n');
}
