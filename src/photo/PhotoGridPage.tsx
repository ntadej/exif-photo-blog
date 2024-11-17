'use client';

import { Tags } from '@/tag';
import { Photo } from '.';
import { Cameras } from '@/camera';
import { FilmSimulations } from '@/simulation';
import { PATH_GRID } from '@/site/paths';
import PhotoGridSidebar from './PhotoGridSidebar';
import PhotoGridContainer from './PhotoGridContainer';
import { useEffect } from 'react';
import { useAppState } from '@/state/AppState';
import { GetPhotosOptions } from './db';

export default function PhotoGridPage({
  photos,
  photosCount,
  tags,
  cameras,
  simulations,
  sortBy,
}:{
  photos: Photo[]
  photosCount: number
  tags: Tags
  cameras: Cameras
  simulations: FilmSimulations
  sortBy?: GetPhotosOptions['sortBy']
}) {
  const { setSelectedPhotoIds } = useAppState();
  
  useEffect(
    () => () => setSelectedPhotoIds?.(undefined),
    [setSelectedPhotoIds]
  );

  return (
    <PhotoGridContainer
      cacheKey={`page-${PATH_GRID}`}
      photos={photos}
      count={photosCount}
      sidebar={<div className="sticky top-4 space-y-4 mt-[-4px]">
        <PhotoGridSidebar {...{
          tags,
          cameras,
          simulations,
          photosCount,
        }} />
      </div>}
      sortBy={sortBy}
      canSelect
    />
  );
}
