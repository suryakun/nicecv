import { TemplateSelector } from "@/components/template-selector.form";
import type { TemplateDTO } from "@/lib/dto/template.dto";
import db from "@/prisma/db";

export default async function TemplateSelectPage() {
  const templates: TemplateDTO[] = await db.template.findMany();
  return (
    <div className="h-screen">
      <TemplateSelector templates={templates} />
    </div>
  )
}