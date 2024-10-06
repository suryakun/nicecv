import { NextApiRequest } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { resumeId: string } },
) {
  const { resumeId } = params;
  const filePath = path.join(process.cwd(), 'pdf', `${resumeId}.png`);

  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 404 });
  }
}
