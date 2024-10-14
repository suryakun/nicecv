'use client';
import type { TemplateDTO } from '@/lib/dto/template.dto';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type TemplateSelectorProps = {
  templates: TemplateDTO[];
};

export const TemplateSelector = (props: TemplateSelectorProps) => {
  const params = useSearchParams();
  const resumeId = params.get('resumeId');

  return (
    <div className="h-full pt-[120px] flex flex-col gap-8 p-4 bg-white ">
      <h1 className="text-3xl text-center">Select a Template</h1>
      <div className="flex flex-wrap">
        {props.templates.map((template) => (
          <div
            className="flex flex-col gap-2 transition-transform transform hover:scale-105"
            key={template.id}
          >
            <div className="p-4 shadow-lg border">
              <Link
                href={`/builder/edit/${template.id}/resume/${resumeId ?? ''}`}
              >
                <Image
                  src={`/${template.name}.jpg`}
                  alt={template.name || 'template'}
                  width={300}
                  height={400}
                  className="h-auto"
                />
              </Link>
            </div>
            <h2 className="text-xl text-center">{template.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
