'use client';

import { PATH_ROOT } from '@/site/paths';
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
      cacheKey={`page-${PATH_ROOT}`}
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
