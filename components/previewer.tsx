'use client';

import { LLMResult } from '@/lib/llmResult';
import * as Handlebars from 'handlebars';
import { useEffect, useMemo, useRef } from 'react';

type Props = {
  template: string | null;
  data: LLMResult;
};

export const Previewer = (props: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const renderedTemplate = useMemo(() => {
    const template = Handlebars.compile(props.template);
    return template(props.data);
  }, [props]);

  useEffect(() => {
    if (iframeRef.current) {
      const blob = new Blob([renderedTemplate], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [renderedTemplate]);

  if (!props.template) {
    return null;
  }

  return (
    <div className="flex justify-center items-start">
      <div className="border-gray-300">
        <iframe
          title="previewer"
          ref={iframeRef}
          className="w-[210mm] h-full min-h-[calc(100vh-233.33px)] transform scale-[0.8]  border shadow-lg"
          onLoad={() => {
            const iframe = iframeRef.current;
            if (iframe) {
              iframe.style.height =
                (iframe.contentWindow?.document.body.scrollHeight ?? 0) +
                20 +
                'px';
              iframe.style.backgroundColor = 'white';
            }
          }}
        />
      </div>
    </div>
  );
};
