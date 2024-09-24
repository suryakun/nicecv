import { Editor } from '@/components/resume-editor';
import { TemplateDTO } from '@/lib/dto/template.dto';
import db from '@/prisma/db';

type Props = {
  params: {
    templateId: string;
  };
};

export default async function EditPage(props: Props) {
  const template = await db.template.findFirstOrThrow({
    where: {
      id: parseInt(props.params.templateId),
    },
  });

  return (
    <div className="h-full flex flex-col gap-8 px-4 py-4">
      <Editor template={template as TemplateDTO} resume={null} />
    </div>
  );
}
