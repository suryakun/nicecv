import React from 'react';
import Image from 'next/image';
import { EditIcon, Eye } from 'lucide-react';
import Link from 'next/link';

export type ResumeMap = {
  id: string;
  title: string;
  name: string;
  templateId: number;
};

type ResumeGalleryProps = {
  resumes: ResumeMap[];
};

export const ResumeGallery: React.FC<ResumeGalleryProps> = ({ resumes }) => {
  return (
    <div className="p-4 flex flex-col justify-start items-center gap-4 bg-slate-300 min-h-[calc(100vh-75px)]">
      <h2 className="font-bold text-2xl">Your Resumes</h2>
      <div className="grid grid-cols-3 gap-4 ">
        {resumes.map((resume) => (
          <div key={resume.id} className="border bg-white shadow-lg relative">
            <Image
              width={300}
              height={400}
              src={`/api/resume/${resume.id}/image`}
              alt={`Resume ${resume.title}`}
              className="max-h-[400px] overflow-hidden object-top object-cover"
            />
            <div className="absolute inset-0 flex justify-center items-center gap-4 bg-slate-500 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
              <Link
                className="p-2 bg-slate-500 rounded-full text-white"
                href={`/builder/edit/${resume.templateId}/resume/${resume.id}`}
              >
                <EditIcon />
              </Link>
              <Link
                href={`/builder/preview/${resume.templateId}/resume/${resume.id}`}
                className="/builder/edit/1/resume/cm1u48sp1000y1nf3yq3tetix"
              >
                <Eye />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
