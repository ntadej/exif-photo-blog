'use client';

import SiteGrid from '@/components/SiteGrid';
import PhotoGrid from './PhotoGrid';
import PhotoGridInfinite from './PhotoGridInfinite';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { ComponentProps, useCallback, useState } from 'react';
import { GetPhotosOptions } from './db';

export default function PhotoGridContainer({
  cacheKey,
  photos,
  count,
  tag,
  camera,
  simulation,
  focal,
  animateOnFirstLoadOnly,
  header,
  sidebar,
  canSelect,
  sortBy,
}: {
  cacheKey: string
  count: number
  header?: JSX.Element
  sidebar?: JSX.Element
  sortBy?: GetPhotosOptions['sortBy']
} & ComponentProps<typeof PhotoGrid>) {
  const [
    shouldAnimateDynamicItems,
    setShouldAnimateDynamicItems,
  ] = useState(false);

  const onAnimationComplete = useCallback(() =>
    setShouldAnimateDynamicItems(true), []);

  const initialOffset = photos.length;

  return (
    <SiteGrid
      contentMain={<div className={clsx(
        header && 'space-y-8 mt-1.5',
      )}>
        {header &&
          <AnimateItems
            type="bottom"
            items={[header]}
            animateOnFirstLoadOnly
          />}
        <div className="space-y-0.5 sm:space-y-1">
          <PhotoGrid {...{
            photos,
            tag,
            camera,
            simulation,
            focal,
            animateOnFirstLoadOnly,
            onAnimationComplete,
            canSelect,
          }} />
          {count > initialOffset &&
            <PhotoGridInfinite {...{
              cacheKey,
              initialOffset,
              canStart: shouldAnimateDynamicItems,
              tag,
              camera,
              simulation,
              focal,
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
