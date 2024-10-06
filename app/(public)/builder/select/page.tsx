import { SelectError } from '@/components/select-error';
import { TemplateSelector } from '@/components/template-selector.form';
import type { TemplateDTO } from '@/lib/dto/template.dto';
import db from '@/prisma/db';

export default async function TemplateSelectPage() {
  const templates: TemplateDTO[] = await db.template.findMany();
  return (
    <div className="h-screen">
      <SelectError />
      <TemplateSelector templates={templates} />
    </div>
  );
}
