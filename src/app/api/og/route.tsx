import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'MandirAI OS'

    // ?subtitle=<subtitle>
    const subtitle = searchParams.get('subtitle') || 'The operating system for divine administration.'

    // ?theme=<hex>
    const themeStr = searchParams.get('theme')
    const themeColor = themeStr ? `#${themeStr}` : '#ea580c' // Default orange-600

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: `radial-gradient(circle at 50% 50%, ${themeColor}33 0%, #0a0a0a 70%)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${themeColor}66`,
              padding: '80px',
              borderRadius: '40px',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontSize: 100, marginBottom: 20 }}>🕉️</div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.02em',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 30,
                color: '#a3a3a3',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(e)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
