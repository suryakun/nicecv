import { Editor } from '@/components/resume-editor';
import { TemplateDTO } from '@/lib/dto/template.dto';
import { LLMResult } from '@/lib/llmResult';
import db from '@/prisma/db';

type Props = {
  params: {
    templateId: string;
    resumeId: string;
  };
};

export default async function EditPage(props: Props) {
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
    <div className="h-full flex flex-col gap-8 px-4 py-4">
      <Editor
        template={template as TemplateDTO}
        resume={resume as unknown as LLMResult}
      />
    </div>
  );
}
