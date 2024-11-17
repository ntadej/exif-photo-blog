'use client';

import { PATH_FEED_INFERRED } from '@/app/paths';
import InfinitePhotoScroll from './InfinitePhotoScroll';
import PhotosLarge from './PhotosLarge';
import { GetPhotosOptions } from './db';

export default function PhotosLargeInfinite({
  initialOffset,
  itemsPerPage,
  sortBy,
}: {
  initialOffset: number
  itemsPerPage: number
  sortBy?: GetPhotosOptions['sortBy']
}) {
  return (
    <InfinitePhotoScroll
      cacheKey={`page-${PATH_FEED_INFERRED}`}
      initialOffset={initialOffset}
      itemsPerPage={itemsPerPage}
      sortBy={sortBy}
      wrapMoreButtonInGrid
    >
      {({ photos, onLastPhotoVisible, revalidatePhoto }) =>
        <PhotosLarge
          photos={photos}
          onLastPhotoVisible={onLastPhotoVisible}
          revalidatePhoto={revalidatePhoto}
        />}
    </InfinitePhotoScroll>
  );
}
