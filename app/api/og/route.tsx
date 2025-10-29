import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Helper function to split title into readable lines while preserving grammar
function splitTitleIntoLines(title: string): string[] {
  // Clean up the title
  const cleanTitle = title.trim()

  // If title is very short, return as single line
  if (cleanTitle.length <= 35) {
    return [cleanTitle]
  }

  // Split by words while preserving grammar
  const words = cleanTitle.split(/\s+/)
  const lines: string[] = []
  let currentLine = ''
  const maxCharsPerLine = 45 // Optimal for readability

  words.forEach((word, index) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word

    // Start new line if current line would be too long
    if (testLine.length > maxCharsPerLine && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })

  // Add remaining words
  if (currentLine) {
    lines.push(currentLine)
  }

  // Return all lines (no arbitrary limit)
  return lines
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Blog Post'
    const category = searchParams.get('category') || ''

    // Split title into readable lines
    const titleLines = splitTitleIntoLines(title)

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
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #22c55e 100%)',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
            }}
          />

          {/* Category badge */}
          {category && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                left: 50,
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: 24,
                fontWeight: 600,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
              }}
            >
              {category}
            </div>
          )}

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 80px',
              maxWidth: '1000px',
            }}
          >
            {titleLines.map((line, index) => {
              // Dynamic font sizing based on number of lines
              let fontSize = 80
              if (titleLines.length === 1) fontSize = 96
              else if (titleLines.length === 2) fontSize = 84
              else if (titleLines.length === 3) fontSize = 72
              else if (titleLines.length >= 4) fontSize = 64

              return (
                <div
                  key={index}
                  style={{
                    fontSize,
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 1.15,
                    marginBottom: index < titleLines.length - 1 ? 12 : 0,
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    letterSpacing: '-0.02em',
                    display: 'flex',
                  }}
                >
                  {line}
                </div>
              )
            })}
          </div>

          {/* Footer branding */}
          <div
            style={{
              position: 'absolute',
              bottom: 50,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: 'white',
                opacity: 0.95,
                display: 'flex',
              }}
            >
              owais.io
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'white',
                opacity: 0.7,
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: 'white',
                opacity: 0.8,
                display: 'flex',
              }}
            >
              Tech Blog
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
    console.error('Error generating OG image:', e.message)
    return new Response('Failed to generate image', { status: 500 })
  }
}
