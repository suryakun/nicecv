import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import db from '../../../../prisma/db';
import { authOptions } from '@/lib/authOption';
import logger from '@/lib/logger';

export async function GET(
  req: NextRequest,
  { params }: { params: { resumeId: string } },
) {
  const { resumeId } = params;

  const session = await getServerSession({ req, ...authOptions });

  const resume = await db.resume.findUnique({
    where: {
      id: resumeId,
    },
  });

  logger.info(JSON.stringify(resume));
  logger.info(JSON.stringify(session?.user));

  if (resume?.userId !== session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Define the path to the PDF file based on the resumeId
  const pdfDirectory = path.join(process.cwd(), 'pdf');
  const pdfPath = path.join(pdfDirectory, `${resumeId}.pdf`);

  // Check if the file exists
  if (!fs.existsSync(pdfPath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  // Read the PDF file
  const fileBuffer = fs.readFileSync(pdfPath);

  // Set the response headers
  const headers = new Headers();
  headers.set('Content-Type', 'application/pdf');
  headers.set('Content-Disposition', `attachment; filename="${resumeId}.pdf"`);

  // Return the PDF file as a response
  return new NextResponse(fileBuffer, { headers });
}
