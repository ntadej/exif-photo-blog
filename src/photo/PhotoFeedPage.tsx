import {
  INFINITE_SCROLL_FEED_MULTIPLE,
  Photo,
} from '.';
import PhotosLarge from './PhotosLarge';
import PhotosLargeInfinite from './PhotosLargeInfinite';
import { GetPhotosOptions } from './db';

export default function PhotoFeedPage({
  photos,
  photosCount,
  sortBy,
}:{
  photos: Photo[]
  photosCount: number,
  sortBy?: GetPhotosOptions['sortBy']
}) {
  return (
    <div className="space-y-1">
      <PhotosLarge {...{ photos }} />
      {photosCount > photos.length &&
        <PhotosLargeInfinite
          initialOffset={photos.length}
          itemsPerPage={INFINITE_SCROLL_FEED_MULTIPLE}
          sortBy={sortBy}
        />}
    </div>
  );
}
