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
      // Apply offset due to outline strategy
      'translate-x-[1px]',
      'rounded-[5px]',
      'divide-medium',
      type === 'regular' &&
        'outline-medium shadow-[0_2px_4px_rgba(0,0,0,0.07)]',
    )}>
      {children}
    </div>
  );
};
