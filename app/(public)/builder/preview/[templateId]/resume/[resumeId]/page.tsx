import { Previewer } from '@/components/previewer';
import { LLMResult } from '@/lib/llmResult';
import db from '@/prisma/db';
import { PreviewButtons } from '@/components/preview-buttons';
import { getServerSession } from 'next-auth';
import logger from '@/lib/logger';
import { authOptions } from '@/lib/authOption';

type Props = {
  params: {
    templateId: string;
    resumeId: string;
  };
  searchParams: {
    from?: string;
  };
};

export default async function PreviewPage(props: Props) {
  const session = await getServerSession({ ...authOptions });
  const from = props.searchParams.from;
  logger.info('session: ' + JSON.stringify(session));

  if (from === 'signin') {
    await db.resume.update({
      where: {
        id: props.params.resumeId,
      },
      data: {
        userId: session?.user.id,
      },
    });
  }

  const template = await db.template.findFirstOrThrow({
    where: {
      id: parseInt(props.params.templateId),
    },
  });

  const resume = await db.resume.findUnique({
    where: {
      id: props.params.resumeId,
    },
    include: {
      experience: true,
      skill: true,
      award: true,
      certification: true,
      education: true,
      reference: true,
      publication: true,
      course: true,
      language: true,
    },
  });

  return (
    <div className="flex relative justify-center items-start m-[-100px] overflow-y-scroll py-4 bg-slate-300">
      <PreviewButtons {...props.params} />
      <Previewer
        template={template.fileName}
        data={resume as unknown as LLMResult}
      />
    </div>
  );
}
