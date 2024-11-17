'use client';

import { INFINITE_SCROLL_GRID_MULTIPLE } from '.';
import InfinitePhotoScroll from './InfinitePhotoScroll';
import PhotoGrid from './PhotoGrid';
import { ComponentProps } from 'react';
import { GetPhotosOptions } from './db';

export default function PhotoGridInfinite({
  cacheKey,
  initialOffset,
  canStart,
  tag,
  camera,
  simulation,
  focal,
  animateOnFirstLoadOnly,
  canSelect,
  sortBy,
}: {
  cacheKey: string
  initialOffset: number
  sortBy?: GetPhotosOptions['sortBy']
} & Omit<ComponentProps<typeof PhotoGrid>, 'photos'>) {
  return (
    <InfinitePhotoScroll
      cacheKey={cacheKey}
      initialOffset={initialOffset}
      itemsPerPage={INFINITE_SCROLL_GRID_MULTIPLE}
      tag={tag}
      camera={camera}
      simulation={simulation}
      sortBy={sortBy}
    >
      {({ photos, onLastPhotoVisible }) =>
        <PhotoGrid {...{
          photos,
          canStart,
          tag,
          camera,
          simulation,
          focal,
          onLastPhotoVisible,
          animateOnFirstLoadOnly,
          canSelect,
        }} />}
    </InfinitePhotoScroll>
  );
}
