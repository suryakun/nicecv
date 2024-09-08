"use client"

import { retrievePDF } from "@/app/(public)/builder/actions";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const UploadButton = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    e.currentTarget.form?.requestSubmit();
  }

  const loadingSpinner = (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )

  return (
    <>
      {loading && isBrowser && createPortal(loadingSpinner, document.body)}
      <form action={retrievePDF}>
        <input
          name="file"
          disabled={loading}
          type="file"
          className="invisible w-full input_file"
          accept="application/pdf"
          max={"1MB"}
          onChange={onChange}
        />
      </form>
    </>
  )
}