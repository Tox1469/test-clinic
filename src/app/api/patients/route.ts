export const dynamic = 'force-dynamic'

// In-memory store — resets on cold start, but fine for testing
const patients: Record<string, string>[] = []

export async function GET() {
  return Response.json({ patients, count: patients.length })
}

export async function POST(request: Request) {
  const body = await request.json()
  patients.push({ ...body, created_at: new Date().toISOString() })
  return Response.json({ ok: true, count: patients.length })
}

export async function DELETE() {
  patients.length = 0
  return Response.json({ ok: true })
}
