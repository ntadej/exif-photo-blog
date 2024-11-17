'use client';

import AppGrid from '@/components/AppGrid';
import PhotoGrid from './PhotoGrid';
import PhotoGridInfinite from './PhotoGridInfinite';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { ComponentProps, useCallback, useState, ReactNode } from 'react';
import { GRID_SPACE_CLASSNAME } from '@/components';
import { GetPhotosOptions } from './db';

export default function PhotoGridContainer({
  cacheKey,
  photos,
  count,
  animateOnFirstLoadOnly,
  header,
  sidebar,
  canSelect,
  sortBy,
  ...categories
}: {
  cacheKey: string
  count: number
  header?: ReactNode
  sidebar?: ReactNode
  sortBy?: GetPhotosOptions['sortBy']
} & ComponentProps<typeof PhotoGrid>) {
  const [
    shouldAnimateDynamicItems,
    setShouldAnimateDynamicItems,
  ] = useState(false);

  const onAnimationComplete = useCallback(() =>
    setShouldAnimateDynamicItems(true), []);

  return (
    <AppGrid
      contentMain={<div className={clsx(
        header && 'space-y-8 mt-1.5',
      )}>
        {header &&
          <AnimateItems
            type="bottom"
            items={[header]}
            animateOnFirstLoadOnly
          />}
        <div className={GRID_SPACE_CLASSNAME}>
          <PhotoGrid {...{
            photos,
            ...categories,
            animateOnFirstLoadOnly,
            onAnimationComplete,
            canSelect,
          }} />
          {count > photos.length &&
            <PhotoGridInfinite {...{
              cacheKey,
              initialOffset: photos.length,
              ...categories,
              canStart: shouldAnimateDynamicItems,
              animateOnFirstLoadOnly,
              canSelect,
              sortBy,
            }} />}
        </div>
      </div>}
      contentSide={sidebar}
      sideHiddenOnMobile
    />
  );
}
