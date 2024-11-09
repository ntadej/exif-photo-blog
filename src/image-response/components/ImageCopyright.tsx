import { ReactNode } from 'react';

const GRADIENT_STOPS = 'rgba(0,0,0,0), rgba(0,0,0,0.2), rgba(0,0,0,0.6)';

export default function ImageCaption({
  height,
  fontFamily,
  children,
}: {
  width: number
  height: number
  fontFamily: string
  children: ReactNode
}) {
  const paddingEdge = height * .07;
  const paddingContent = height * .2;
  return (
    <div style={{
      display: 'flex',
      position: 'absolute',
      paddingLeft: height * .0875,
      paddingRight: height * .0875,
      color: 'white',
      backgroundBlendMode: 'multiply',
      fontFamily,
      fontSize: height *.06,
      gap: '1rem', // Mimic mono font space metric
      lineHeight: 1,
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: paddingContent,
      paddingBottom: paddingEdge,
      background: `linear-gradient(to bottom, ${GRADIENT_STOPS})`,
      justifyContent: 'flex-end',
    }}>
      <div
        style={{
          display: 'flex',
          gap: height * .048,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
    </div>
  );
}
