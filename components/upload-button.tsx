'use client';

import { retrievePDF } from '@/app/(public)/builder/actions';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const UploadButton = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSizeInBytes) {
        redirect(`/builder/select?error=file-size`);
        return;
      }
      setLoading(true);
      e.currentTarget.form?.requestSubmit();
    }
  };

  const loadingSpinner = (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center gap-4 bg-gray-100 flex-col bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      <h3>Analizing your CV. Please wait...</h3>
      <h2>It may take a few seconds</h2>
    </div>
  );

  return (
    <>
      {loading && isBrowser && createPortal(loadingSpinner, document.body)}
      <form
        action={retrievePDF}
        className="flex justify-center items-center flex-col w-full"
      >
        <Image
          onClick={() => inputRef.current?.click()}
          src={'/upload.svg'}
          alt="upload-img"
          width={100}
          height={130}
        />
        <input
          name="file"
          disabled={loading}
          type="file"
          className="invisible w-full"
          accept="application/pdf"
          max={'1MB'}
          ref={inputRef}
          onChange={onChange}
        />
      </form>
    </>
  );
};
