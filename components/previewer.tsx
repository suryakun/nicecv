'use client';

import { LLMResult } from 'lib/llmResult';
import * as Handlebars from 'handlebars';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  template: string | null;
  data: LLMResult;
};

export const Previewer = (props: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState('297mm');
  const renderedTemplate = useMemo(() => {
    const template = Handlebars.compile(props.template);
    return template(props.data);
  }, [props]);

  useEffect(() => {
    if (iframeRef.current) {
      const blob = new Blob([renderedTemplate], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;

      const updateIframeHeight = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          const height =
            iframeRef.current.contentWindow.document.body.scrollHeight;
          setIframeHeight(`${height}px`);
        }
      };

      iframeRef.current.onload = updateIframeHeight;

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [renderedTemplate]);

  if (!props.template) {
    return null;
  }

  return (
    <div className="flex justify-center p-[12mm] tranform scale-[0.8] bg-white items-start">
      <div className="pt-[45px] w-[210mm]">
        <iframe
          title="previewer"
          ref={iframeRef}
          className="w-full border-none"
          style={{
            height: iframeHeight,
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
        />
      </div>
    </div>
  );
};
