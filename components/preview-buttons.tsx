'use client';
import { SidebarClose, Download } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import Link from 'next/link';

type Props = {
  templateId: string;
  resumeId: string;
};

export const PreviewButtons = (props: Props) => {
  const { status } = useSession();

  const downloadFile = useCallback(() => {
    console.log('download');
  }, []);

  return (
    <div className="absolute right-[100px] top-[160px] text-white p-4 z-50 flex flex-col gap-4">
      <Link
        className="flex gap-4 bg-secondary-foreground p-4 rounded-md shadow-sm"
        href={`/builder/edit/${props.templateId}/resume/${props.resumeId}`}
      >
        <SidebarClose /> Exit preview
      </Link>
      {status === 'authenticated' ? (
        <button
          className="flex gap-4 bg-primary p-4 rounded-md shadow-sm"
          onClick={() => downloadFile()}
        >
          <Download /> Download file
        </button>
      ) : null}
    </div>
  );
};
