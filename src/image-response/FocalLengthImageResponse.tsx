import { SITE_COPYRIGHT } from '@/site/config';
import type { Photo } from '../photo';
import ImageCaption from './components/ImageCaption';
import ImageContainer from './components/ImageContainer';
import ImageCopyright from './components/ImageCopyright';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import type { NextImageSize } from '@/services/next-image';
import { TbCone } from 'react-icons/tb';
import { formatFocalLength } from '@/focal';

export default function FocalLengthImageResponse({
  focal,
  photos,
  width,
  height,
  fontFamily,
}: {
  focal: number,
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
        icon: <TbCone
          size={height * .075}
          style={{
            transform: `translateY(${height * .002}px) rotate(270deg)`,
            marginRight: height * .01,
          }}
        />,
      }}>
        {formatFocalLength(focal)}
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
