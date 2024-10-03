import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
} from 'lucide-react';

import { FormatType } from './format-type';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <Menubar
      className="m-1 flex items-center justify-start p-2"
      aria-label="Formatting options"
    >
      <MenubarMenu>
        <MenubarTrigger
          className="mr-1"
          onClick={() => editor.commands.toggleMark('bold')}
        >
          <Bold className="h-4 w-4" />
        </MenubarTrigger>

        <MenubarTrigger
          className="mr-1"
          onClick={() => editor.commands.toggleMark('italic')}
          value="italic"
        >
          <Italic className="h-4 w-4" />
        </MenubarTrigger>

        <MenubarTrigger
          className="mr-1"
          onClick={() => editor.commands.toggleMark('strike')}
        >
          <Strikethrough className="h-4 w-4" />
        </MenubarTrigger>

        <MenubarTrigger
          className="mr-1"
          onClick={() => editor.commands.toggleList('bullet_list', 'list_item')}
        >
          <List className="h-4 w-4" />
        </MenubarTrigger>

        <MenubarTrigger
          className="mr-1"
          onClick={() =>
            editor.commands.toggleList('ordered_list', 'list_item')
          }
        >
          <ListOrdered className="h-4 w-4" />
        </MenubarTrigger>

        <MenubarTrigger
          className="mr-1"
          onClick={() => editor.commands.toggleCodeBlock()}
        >
          <Code className="h-4 w-4" />
        </MenubarTrigger>

        <MenubarTrigger
          className="mr-1"
          onClick={() =>
            editor.commands.toggleMark('blockquote', { force: true })
          }
        >
          <Quote className="h-4 w-4" />
        </MenubarTrigger>

        <FormatType editor={editor} />
      </MenubarMenu>
    </Menubar>
  );
};

export default EditorToolbar;
