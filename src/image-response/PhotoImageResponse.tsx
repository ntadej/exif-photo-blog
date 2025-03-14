import { SITE_COPYRIGHT } from '@/site/config';
import { Photo, shouldShowExifDataForPhoto } from '../photo';
import { AiFillApple } from 'react-icons/ai';
import ImageCaption from './components/ImageCaption';
import ImageContainer from './components/ImageContainer';
import ImageCopyright from './components/ImageCopyright';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import { OG_TEXT_BOTTOM_ALIGNMENT } from '@/site/config';
import { NextImageSize } from '@/services/next-image';
import { cameraFromPhoto, formatCameraText } from '@/camera';

export default function PhotoImageResponse({
  photo,
  width,
  height,
  fontFamily,
  isNextImageReady = true,
}: {
  photo: Photo
  width: NextImageSize
  height: number
  fontFamily: string
  isNextImageReady: boolean
}) {
  const caption = [
    photo.model
      ? formatCameraText(cameraFromPhoto(photo), 'short')
      : undefined,
    photo.focalLengthFormatted,
    photo.fNumberFormatted,
    photo.isoFormatted,
  ]
    .join(' ')
    .trim();

  return (
    <ImageContainer {...{ width, height }}>
      <ImagePhotoGrid {...{
        photos: isNextImageReady ? [photo] : [],
        width,
        height,
        ...OG_TEXT_BOTTOM_ALIGNMENT && { imagePosition: 'top' },
      }} />
      {shouldShowExifDataForPhoto(photo) &&
        <ImageCaption {...{
          width,
          height,
          fontFamily,
          ...photo.make === 'Apple' && { icon: <AiFillApple style={{
            marginRight: height * .01,
          }} /> },
        }}>
          {caption}
        </ImageCaption>}
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
};
