import PDFParser from 'pdf2json';

export interface PdfExtractResult {
  text: string;
  pageCount: number;
  wordCount: number;
}

/**
 * Extract text content from a PDF buffer using pdf2json
 * @param pdfBuffer - The PDF file as a Buffer
 * @returns Extracted text, page count, and word count
 */
export async function extractPdfText(pdfBuffer: Buffer): Promise<PdfExtractResult> {
  return new Promise((resolve, reject) => {
    try {
      const pdfParser = new PDFParser();

      pdfParser.on('pdfParser_dataError', (errData: { parserError: Error }) => {
        console.error('PDF extraction error:', errData.parserError);
        reject(new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.'));
      });

      pdfParser.on('pdfParser_dataReady', (pdfData: { Pages: Array<{ Texts: Array<{ R: Array<{ T: string }> }> }> }) => {
        try {
          const pageCount = pdfData.Pages.length;

          // Extract text from all pages
          let fullText = '';
          for (const page of pdfData.Pages) {
            for (const textItem of page.Texts) {
              for (const textRun of textItem.R) {
                // Decode URI-encoded text
                fullText += decodeURIComponent(textRun.T) + ' ';
              }
            }
            fullText += '\n';
          }

          const text = fullText.trim();

          // Count words (split on whitespace, filter empty strings)
          const words = text.split(/\s+/).filter((word: string) => word.length > 0);
          const wordCount = words.length;

          resolve({
            text,
            pageCount,
            wordCount,
          });
        } catch (parseError) {
          console.error('PDF text extraction error:', parseError);
          reject(new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.'));
        }
      });

      // Parse the PDF buffer
      pdfParser.parseBuffer(pdfBuffer);
    } catch (error) {
      console.error('PDF extraction error:', error);
      reject(new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.'));
    }
  });
}

/**
 * Validate PDF metadata against constraints
 * @param metadata - Extracted PDF metadata
 * @param maxPages - Maximum allowed pages
 * @param minWords - Minimum required words
 */
export function validatePdfMetadata(
  metadata: { pageCount: number; wordCount: number },
  maxPages: number = 2,
  minWords: number = 50
): { valid: boolean; error?: string } {
  if (metadata.pageCount > maxPages) {
    return {
      valid: false,
      error: `Resume must be ${maxPages} pages or fewer (found ${metadata.pageCount} pages)`,
    };
  }

  if (metadata.wordCount < minWords) {
    return {
      valid: false,
      error: `Resume appears too short (found ${metadata.wordCount} words, minimum ${minWords})`,
    };
  }

  return { valid: true };
}
