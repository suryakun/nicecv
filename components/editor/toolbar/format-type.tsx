import * as React from 'react';
import { Editor } from '@tiptap/react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormatTypeProps {
  editor: Editor;
}

export function FormatType({ editor }: FormatTypeProps) {
  const value = () => {
    if (editor.isActive('paragraph')) return 'paragraph';
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    if (editor.isActive('heading', { level: 4 })) return 'h4';
    if (editor.isActive('heading', { level: 5 })) return 'h5';
    if (editor.isActive('heading', { level: 6 })) return 'h6';
  };

  const onChange = (value: string) => {
    switch (value) {
      case 'paragraph':
        editor.commands.toggleWrap('paragraph');
        break;
      case 'h1':
        editor.commands.toggleWrap('heading', { level: 1 });
        break;
      case 'h2':
        editor.commands.toggleWrap('heading', { level: 2 });
        break;
      case 'h3':
        editor.commands.toggleWrap('heading', { level: 3 });
        break;
      case 'h4':
        editor.commands.toggleWrap('heading', { level: 4 });
        break;
      case 'h5':
        editor.commands.toggleWrap('heading', { level: 5 });
        break;
      case 'h6':
        editor.commands.toggleWrap('heading', { level: 6 });
        break;
    }
  };

  return (
    <Select onValueChange={onChange} defaultValue={value()} value={value()}>
      <SelectTrigger className="h-8 w-[120px] invisible sm:visible">
        <SelectValue placeholder="Select format" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="h1">H1</SelectItem>
          <SelectItem value="h2">H2</SelectItem>
          <SelectItem value="h3">H3</SelectItem>
          <SelectItem value="h4">H4</SelectItem>
          <SelectItem value="h5">H5</SelectItem>
          <SelectItem value="h6">H6</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
