import { authOptions } from '@/lib/authOption';
import db from '../../prisma/db';
import { getServerSession } from 'next-auth';
import logger from '@/lib/logger';
import { CustomNavbar } from '@/components/custom-navbar';
import { ResumeGallery, ResumeMap } from '@/components/resume-gallery';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession({ ...authOptions });
  if (!session) {
    redirect('/builder/select');
  }
  const resumes = await db.resume.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  const resumeMaps = resumes.map(
    (resume) =>
      ({
        id: resume.id,
        title: resume.title,
        name: resume.name,
        templateId: resume.templateId,
      }) as ResumeMap,
  );
  logger.info(resumes);

  return (
    <div className="h-screen">
      <CustomNavbar />
      <ResumeGallery resumes={resumeMaps} />
    </div>
  );
}
