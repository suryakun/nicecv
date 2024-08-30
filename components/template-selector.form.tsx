"use client"
import type { TemplateDTO } from "@/lib/dto/template.dto"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

type TemplateSelectorProps = {
  templates: TemplateDTO[]
}

export const TemplateSelector = (props: TemplateSelectorProps) => {
  const params = useSearchParams();
  const resumeId = params.get("resumeId");

  return (
    <div className="h-full pt-[120px] flex flex-col gap-8">
      <h1 className="text-3xl text-center">Select a Template</h1>
      <div className="flex flex-wrap">
        {props.templates.map((template) => (
          <div key={template.id} className="w-1/4 p-4">
            <Link href={`/builder/edit/${template.id}/resume/${resumeId ?? ''}`}>
              <Image src={`/${template.name}.jpg`} alt={template.name || 'template'} width={300} height={450} className="h-auto"/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}