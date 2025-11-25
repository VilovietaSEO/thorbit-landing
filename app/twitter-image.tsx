import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Thorbit - AI Agent Swarms for SEO';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const features = [
    'AI Agent Swarms',
    'Knowledge Graph',
    'Topical Authority Score',
    'Entity Coverage',
    'Content Lab',
    'Internal Linking',
    'Gap Analysis',
    'Campaign Architect',
  ];

  // Fetch Inter font (similar geometric sans-serif to GT Flexa)
  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp18.ttf'
  ).then((res) => res.arrayBuffer());

  const interBlack = await fetch(
    'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp18.ttf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FDFBF7',
          padding: '60px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter',
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C4704F20 0%, #D9A85420 100%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0D737720 0%, #7FA9B320 100%)',
            display: 'flex',
          }}
        />

        {/* Top bar with brand accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #C4704F 0%, #D9A854 50%, #0D7377 100%)',
            display: 'flex',
          }}
        />

        {/* Logo / Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#2C2419',
              letterSpacing: '-1px',
            }}
          >
            Thorbit
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            marginTop: '-20px',
          }}
        >
          <h1
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#2C2419',
              lineHeight: 1.15,
              margin: 0,
              maxWidth: '900px',
              letterSpacing: '-1px',
            }}
          >
            <span style={{ color: '#C4704F' }}>AI Agent Swarms</span> That
            Automate Research, Analysis, and{' '}
            <span style={{ color: '#0D7377' }}>SEO Execution</span>
          </h1>

          <p
            style={{
              fontSize: '24px',
              color: '#5C5347',
              marginTop: '24px',
              maxWidth: '700px',
              fontWeight: 700,
            }}
          >
            See what Google sees. Visualize your topical authority.
          </p>
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: 'auto',
          }}
        >
          {features.map((feature, i) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '50px',
                backgroundColor: i % 3 === 0 ? '#C4704F15' : i % 3 === 1 ? '#0D737715' : '#D9A85415',
                border: `1.5px solid ${i % 3 === 0 ? '#C4704F40' : i % 3 === 1 ? '#0D737740' : '#D9A85440'}`,
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: i % 3 === 0 ? '#C4704F' : i % 3 === 1 ? '#0D7377' : '#D9A854',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#2C2419',
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: '#7FA9B3',
              fontWeight: 700,
            }}
          >
            thorbit.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBlack,
          style: 'normal',
          weight: 900,
        },
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
