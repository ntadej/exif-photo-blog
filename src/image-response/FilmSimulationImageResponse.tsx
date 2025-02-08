import { SITE_COPYRIGHT } from '@/site/config';
import { Photo } from '../photo';
import ImageCaption from './components/ImageCaption';
import ImageContainer from './components/ImageContainer';
import ImageCopyright from './components/ImageCopyright';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import {
  labelForFilmSimulation,
} from '@/vendors/fujifilm';
import PhotoFilmSimulationIcon from 
  '@/simulation/PhotoFilmSimulationIcon';
import { FilmSimulation } from '@/simulation';
import { NextImageSize } from '@/services/next-image';

export default function FilmSimulationImageResponse({
  simulation,
  photos,
  width,
  height,
  fontFamily,
}: {
  simulation: FilmSimulation,
  photos: Photo[]
  width: NextImageSize
  height: number
  fontFamily: string
}) {  
  return (
    <ImageContainer {...{
      width,
      height,
      ...photos.length === 0 && { background: 'black' },
    }}>
      <ImagePhotoGrid
        {...{
          photos,
          width,
          height,
        }}
      />
      <ImageCaption {...{
        width,
        height,
        fontFamily,
        icon: <PhotoFilmSimulationIcon
          simulation={simulation}
          height={height * .081}
          style={{ transform: `translateY(${height * .001}px)`}}
        />,
      }}>
        {labelForFilmSimulation(simulation).medium.toLocaleUpperCase()}
      </ImageCaption>
      {SITE_COPYRIGHT &&
        <ImageCopyright {...{
          width,
          height,
          fontFamily,
        }}>
          &copy; {SITE_COPYRIGHT}
        </ImageCopyright>}
    </ImageContainer>
  );
}
