'use client';

import { useState, useCallback } from 'react';
import { ImportPreviewTable } from './ImportPreviewTable';
import type { ImportPreviewRow, ImportPreviewResponse } from '@/lib/outreach/schemas';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

type Step = 'upload' | 'preview' | 'importing' | 'complete';

export function BulkImportModal({ isOpen, onClose, onImportComplete }: BulkImportModalProps) {
  const [step, setStep] = useState<Step>('upload');
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ImportPreviewResponse | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [importResult, setImportResult] = useState<{ imported: number; errors: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetState = useCallback(() => {
    setStep('upload');
    setError(null);
    setPreview(null);
    setSelectedRows(new Set());
    setImportResult(null);
    setIsLoading(false);
  }, []);

  const handleClose = () => {
    resetState();
    onClose();
  };

  const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: Record<string, string> = {};
      headers.forEach((header, j) => {
        row[header] = values[j] || '';
      });
      rows.push(row);
    }

    return rows;
  };

  const parseCSVLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    return values;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsLoading(true);

    try {
      let rows: Record<string, string>[] = [];

      if (file.name.endsWith('.csv')) {
        const text = await file.text();
        rows = parseCSV(text);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        // For Excel files, we need xlsx library
        // For now, show an error asking for CSV
        setError('Excel files (.xlsx) require the xlsx library. Please convert to CSV or use a CSV file.');
        setIsLoading(false);
        return;
      } else {
        setError('Please upload a CSV or Excel file.');
        setIsLoading(false);
        return;
      }

      if (rows.length === 0) {
        setError('No data found in file. Make sure your file has headers and data rows.');
        setIsLoading(false);
        return;
      }

      // Send to API for preview
      const response = await fetch('/api/outreach/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'preview', rows }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process file');
      }

      setPreview(data);
      // Select all valid rows by default
      const validRowNumbers = data.rows
        .filter((r: ImportPreviewRow) => r.errors.length === 0)
        .map((r: ImportPreviewRow) => r.rowNumber);
      setSelectedRows(new Set(validRowNumbers));
      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRow = (rowNumber: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowNumber)) {
      newSelected.delete(rowNumber);
    } else {
      newSelected.add(rowNumber);
    }
    setSelectedRows(newSelected);
  };

  const handleToggleAll = () => {
    if (!preview) return;

    const validRows = preview.rows.filter((r) => r.errors.length === 0);
    const allSelected = validRows.every((r) => selectedRows.has(r.rowNumber));

    if (allSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(validRows.map((r) => r.rowNumber)));
    }
  };

  const handleConfirmImport = async () => {
    if (!preview) return;

    setStep('importing');
    setError(null);

    try {
      const selectedPreviewRows = preview.rows.filter((r) => selectedRows.has(r.rowNumber));

      const confirmRows = selectedPreviewRows.map((r) => ({
        firstName: r.firstName,
        lastName: r.lastName,
        bank: r.bank,
        email: r.email || undefined,
        role: r.role,
        linkedinUrl: r.linkedinUrl || undefined,
        connectionType: r.connectionType,
        notes: r.notes || undefined,
        useGeneratedEmail: true,
      }));

      const response = await fetch('/api/outreach/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'confirm', rows: confirmRows }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to import contacts');
      }

      setImportResult({
        imported: data.imported,
        errors: data.errors?.length || 0,
      });
      setStep('complete');
      onImportComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import contacts');
      setStep('preview');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: '100%',
          maxWidth: step === 'preview' ? 900 : 500,
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(10, 10, 10, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
            {step === 'upload' && 'Import Contacts'}
            {step === 'preview' && 'Review Import'}
            {step === 'importing' && 'Importing...'}
            {step === 'complete' && 'Import Complete'}
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer',
              color: 'rgba(10, 10, 10, 0.4)',
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {error && (
            <div
              style={{
                padding: '12px 14px',
                marginBottom: 16,
                borderRadius: 8,
                background: 'rgba(220, 38, 38, 0.08)',
                color: '#dc2626',
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          {step === 'upload' && (
            <div>
              <p style={{ margin: '0 0 16px', color: 'rgba(10, 10, 10, 0.7)', fontSize: 14 }}>
                Upload a CSV file with your contacts. Required columns: First Name, Last Name, Bank/Company.
                Optional: Email, Role, LinkedIn URL, Notes.
              </p>

              <div
                style={{
                  border: '2px dashed rgba(10, 10, 10, 0.12)',
                  borderRadius: 12,
                  padding: 40,
                  textAlign: 'center',
                  cursor: isLoading ? 'wait' : 'pointer',
                  background: 'rgba(10, 10, 10, 0.02)',
                }}
              >
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  style={{ cursor: isLoading ? 'wait' : 'pointer', display: 'block' }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                    {isLoading ? 'Processing...' : 'Click to upload or drag and drop'}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.5)' }}>
                    CSV files supported
                  </div>
                </label>
              </div>

              <div style={{ marginTop: 20 }}>
                <h4 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>
                  Expected Format
                </h4>
                <div
                  style={{
                    background: 'rgba(10, 10, 10, 0.03)',
                    padding: 12,
                    borderRadius: 8,
                    fontFamily: 'monospace',
                    fontSize: 11,
                    overflow: 'auto',
                  }}
                >
                  First Name,Last Name,Bank,Role,Email,LinkedIn<br />
                  John,Smith,Goldman Sachs,Analyst,,<br />
                  Jane,Doe,Morgan Stanley,Associate,jane.doe@ms.com,
                </div>
              </div>
            </div>
          )}

          {step === 'preview' && preview && (
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <StatCard label="Total Rows" value={preview.totalRows} />
                <StatCard label="Valid" value={preview.validRows} color="#16a34a" />
                <StatCard label="Errors" value={preview.errorRows} color="#dc2626" />
                <StatCard label="Banks Matched" value={preview.banksMatched} color="#416D89" />
              </div>

              {preview.banksUnmatched.length > 0 && (
                <div
                  style={{
                    padding: '12px 14px',
                    marginBottom: 16,
                    borderRadius: 8,
                    background: 'rgba(234, 179, 8, 0.1)',
                    color: '#b45309',
                    fontSize: 13,
                  }}
                >
                  <strong>Banks not in database:</strong> {preview.banksUnmatched.join(', ')}
                  <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                    Emails for these contacts won&apos;t be auto-generated.
                  </div>
                </div>
              )}

              <ImportPreviewTable
                rows={preview.rows}
                selectedRows={selectedRows}
                onToggleRow={handleToggleRow}
                onToggleAll={handleToggleAll}
              />
            </div>
          )}

          {step === 'importing' && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Importing contacts...</div>
              <div style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.5)', marginTop: 8 }}>
                This may take a moment.
              </div>
            </div>
          )}

          {step === 'complete' && importResult && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                Import Complete!
              </div>
              <div style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.6)' }}>
                Successfully imported {importResult.imported} contact{importResult.imported !== 1 ? 's' : ''}.
                {importResult.errors > 0 && (
                  <span style={{ color: '#dc2626' }}>
                    {' '}{importResult.errors} row{importResult.errors !== 1 ? 's' : ''} had errors.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(10, 10, 10, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {step === 'preview' && (
            <>
              <button
                onClick={() => setStep('upload')}
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(10, 10, 10, 0.15)',
                  background: 'transparent',
                  color: 'rgba(10, 10, 10, 0.7)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.5)' }}>
                  {selectedRows.size} contact{selectedRows.size !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={handleConfirmImport}
                  disabled={selectedRows.size === 0}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: 'none',
                    background: selectedRows.size === 0 ? 'rgba(10, 10, 10, 0.1)' : '#416D89',
                    color: selectedRows.size === 0 ? 'rgba(10, 10, 10, 0.4)' : '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: selectedRows.size === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  Import {selectedRows.size} Contact{selectedRows.size !== 1 ? 's' : ''}
                </button>
              </div>
            </>
          )}

          {step === 'complete' && (
            <button
              onClick={handleClose}
              style={{
                marginLeft: 'auto',
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: '#416D89',
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color = 'rgba(10, 10, 10, 0.8)',
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div
      style={{
        padding: 12,
        background: 'rgba(10, 10, 10, 0.03)',
        borderRadius: 8,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 600, color }}>{value}</div>
      <div style={{ fontSize: 11, color: 'rgba(10, 10, 10, 0.5)', marginTop: 2 }}>{label}</div>
    </div>
  );
}
