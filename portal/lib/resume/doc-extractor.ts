import mammoth from 'mammoth';

export interface DocExtractResult {
  text: string;
  wordCount: number;
}

/**
 * Extract text content from a Word document (.docx) buffer using mammoth
 * @param docBuffer - The Word document file as a Buffer
 * @returns Extracted text and word count
 */
export async function extractDocText(docBuffer: Buffer): Promise<DocExtractResult> {
  try {
    // Extract raw text from the Word document
    const result = await mammoth.extractRawText({ buffer: docBuffer });

    const text = result.value.trim();

    // Count words (split on whitespace, filter empty strings)
    const words = text.split(/\s+/).filter((word: string) => word.length > 0);
    const wordCount = words.length;

    return {
      text,
      wordCount,
    };
  } catch (error) {
    console.error('Word document extraction error:', error);
    throw new Error('Failed to extract text from Word document. Please ensure the file is a valid .docx file.');
  }
}

/**
 * Validate document metadata against constraints
 * @param metadata - Extracted document metadata
 * @param minWords - Minimum required words
 */
export function validateDocMetadata(
  metadata: { wordCount: number },
  minWords: number = 50
): { valid: boolean; error?: string } {
  if (metadata.wordCount < minWords) {
    return {
      valid: false,
      error: `Resume appears too short (found ${metadata.wordCount} words, minimum ${minWords})`,
    };
  }

  return { valid: true };
}
