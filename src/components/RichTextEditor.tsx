"use client";

import React, { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Mark, mergeAttributes } from '@tiptap/core';
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  ImageIcon, Type, Loader2, Link as LinkIcon
} from 'lucide-react';
import { uploadToR2 } from '@/lib/upload';

const SmallText = Mark.create({
  name: 'small',
  parseHTML() {
    return [{ tag: 'small' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['small', mergeAttributes(HTMLAttributes, { class: 'text-sm text-slate-500' }), 0];
  },
  addCommands() {
    return {
      toggleSmall: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
    };
  },
});

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const addImageUrl = () => {
    const url = window.prompt('URL Gambar (Pastikan link gambar langsung):');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await uploadToR2(file, "content");
      editor.chain().focus().setImage({ src: publicUrl }).run();
    } catch (err: any) {
      alert("Gagal mengupload gambar: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-slate-50 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('bold') ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('italic') ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('strike') ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      
      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleSmall().run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('small') ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Teks Kecil (Caption)"
      >
        <Type size={14} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-slate-200 font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Heading 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-slate-200 font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Heading 3"
      >
        H3
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('bulletList') ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('orderedList') ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded hover:bg-slate-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200 text-amber-600' : 'text-slate-600'}`}
        type="button"
        title="Justify"
      >
        <AlignJustify size={16} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="p-2 rounded hover:bg-slate-200 text-slate-600 flex items-center gap-1 disabled:opacity-50"
        type="button"
        title="Upload Gambar dari Komputer / HP"
      >
        {uploading ? <Loader2 size={16} className="animate-spin text-amber-600" /> : <ImageIcon size={16} />}
        <span className="text-xs font-medium">{uploading ? "Mengupload..." : "Upload Gambar"}</span>
      </button>

      <button
        onClick={addImageUrl}
        className="p-2 rounded hover:bg-slate-200 text-slate-600 flex items-center gap-1"
        type="button"
        title="Masukkan Gambar via URL"
      >
        <LinkIcon size={14} />
        <span className="text-xs font-medium">Link URL</span>
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      SmallText,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg max-w-none focus:outline-none min-h-[300px] p-4 bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden flex flex-col">
      <MenuBar editor={editor} />
      <div className="flex-grow bg-white cursor-text" onClick={() => editor?.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
