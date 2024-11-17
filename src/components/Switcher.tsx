import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';

export default function Switcher({
  children,
  type = 'regular',
}: {
  children: ReactNode
  type?: 'regular' | 'borderless'
}) {
  return (
    <div className={clsx(
      'flex overflow-hidden',
      type === 'regular'
        ? 'divide-x divide-gray-300 dark:divide-gray-800'
        : '',
      'border rounded-md',
      type === 'regular'
        ? 'border-medium'
        : 'border-transparent',
      type === 'regular' && 'shadow-xs',
    )}>
      {children}
    </div>
  );
};
