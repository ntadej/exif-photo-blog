import {
  INFINITE_SCROLL_FEED_INITIAL,
  generateOgImageMetaForPhotos,
} from '@/photo';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { Metadata } from 'next/types';
import { cache } from 'react';
import { getPhotos, getPhotosMeta } from '@/photo/db/query';
import PhotoFeedPage from '@/photo/PhotoFeedPage';

export const dynamic = 'force-static';
export const maxDuration = 60;
const sort = 'takenAtAsc';

const getPhotosCached = cache(() => getPhotos({
  limit: INFINITE_SCROLL_FEED_INITIAL,
  sortBy: sort,
}));

export async function generateMetadata(): Promise<Metadata> {
  const photos = await getPhotosCached()
    .catch(() => []);
  return generateOgImageMetaForPhotos(photos);
}

export default async function OldestFirstPage() {
  const [
    photos,
    photosCount,
  ] = await Promise.all([
    getPhotosCached()
      .catch(() => []),
    getPhotosMeta({sortBy: sort})
      .then(({ count }) => count)
      .catch(() => 0),
  ]);

  return (
    photos.length > 0
      ? <PhotoFeedPage {...{ photos, photosCount, sortBy: sort }} />
      : <PhotosEmptyState />
  );
}
