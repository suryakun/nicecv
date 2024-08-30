"use client"
import { LLMResult } from "@/lib/llmResult"
import * as Handlebars from 'handlebars';
import { useEffect, useMemo, useRef } from "react";

type Props = {
  template: string | null,
  data: LLMResult,
}

export const Previewer = (props: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const html = useMemo(() => {
    const template = Handlebars.compile(props.template)
    return template(props.data)
  }, [props])

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html
    }
  }, [html])

  if (!props.template) {
    return null;
  }

  return (
    <div className="bg-white max-w-[210mm] h-full w-full flex-shrink-0">
        <iframe ref={iframeRef} className="w-full h-full border-0"
          style={{ transform: "scale(0.9)", transformOrigin: "0 0" }}
          onLoad={() => {
            const iframe = iframeRef.current;
            if (iframe) {
              iframe.style.height = ((iframe.contentWindow?.document.body.scrollHeight ?? 0) + 20) + "px";
              iframe.style.backgroundColor = "white";
            }
          }}
        />
    </div >
  )
}