'use server';
import fs from 'fs/promises';
import { LLMResult } from '@/lib/llmResult';
import FileProcess from '@/lib/form-process';
import { redirect } from 'next/navigation';
import db from '@/prisma/db';

export async function retrievePDF(formData: FormData) {
  let resumeId = '';
  const file = formData.get('file') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const timestamp = new Date().getTime();
  const filePath = `./uploads/${timestamp}.pdf`;
  await fs.writeFile(filePath, buffer);

  const aiResult: LLMResult = await FileProcess(filePath);
  const user = await db.user.upsert({
    where: {
      email: aiResult.email,
    },
    update: {},
    create: {
      email: aiResult.email,
      name: aiResult.name,
    },
  });

  const createResume = await db.resume.create({
    data: {
      userId: user.id,
      name: aiResult.name,
      phone: aiResult.phone,
      email: aiResult.email,
      address: aiResult.address,
      title: aiResult.title,
      summary: aiResult.summary,
      links: aiResult.links,
      hobbies: aiResult.hobbies,
      experience: {
        create: aiResult.experience,
      },
      skill: {
        create: aiResult.skill,
      },
      course: {
        create: aiResult.course,
      },
      award: {
        create: aiResult.award,
      },
      language: {
        create: aiResult.language,
      },
      reference: {
        create: aiResult.reference,
      },
      certification: {
        create: aiResult.certification,
      },
      publication: {
        create: aiResult.publication,
      },
      education: {
        create: aiResult.education,
      },
    },
  });
  resumeId = createResume.id;
  redirect(`/builder/select?resumeId=${resumeId}`);
}
