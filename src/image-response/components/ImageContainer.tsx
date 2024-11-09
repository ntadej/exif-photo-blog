import { ReactNode } from 'react';
import ImageCopyright from './ImageCopyright';
import { SITE_COPYRIGHT } from '@/site/config';

export default function ImageContainer({
  width,
  height,
  fontFamily,
  background = 'transparent',
  children,
}: {
  width: number
  height: number
  fontFamily: string
  background?: 'transparent' | 'black'
  children: ReactNode
}) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background,
      width,
      height,
    }}>
      {children}

      {SITE_COPYRIGHT &&
        <ImageCopyright {...{
          width,
          height,
          fontFamily,
        }}>
          &copy; {SITE_COPYRIGHT}
        </ImageCopyright>}
    </div>
  );
}
