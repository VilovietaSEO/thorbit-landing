import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Thorbit - Topical Authority Measurement Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontData = await fetch(
    new URL('/fonts/gt-flexa/GT-Flexa-Black-Trial.woff2', 'https://thorbit.ai')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FDFBF7',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontFamily: 'GT Flexa',
            fontWeight: 900,
            color: '#2C2419',
            letterSpacing: '-0.02em',
          }}
        >
          Thorbit
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'GT Flexa',
          data: fontData,
          style: 'normal',
          weight: 900,
        },
      ],
    }
  )
}
