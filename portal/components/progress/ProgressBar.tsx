'use client';

interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({
  completed,
  total,
  showLabel = true,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total && total > 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`
          flex-1 bg-slate-100 rounded-full overflow-hidden
          ${size === 'sm' ? 'h-1.5' : 'h-2'}
        `}
      >
        <div
          className={`
            h-full transition-all duration-300 ease-out rounded-full
            ${isComplete ? 'bg-emerald-500' : 'bg-indigo-500'}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span
          className={`
            text-slate-500 whitespace-nowrap
            ${size === 'sm' ? 'text-xs' : 'text-sm'}
          `}
        >
          {completed}/{total}
        </span>
      )}
    </div>
  );
}
