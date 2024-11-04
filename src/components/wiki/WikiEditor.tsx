import React, { useState, useEffect } from 'react';
import { useWikiStore } from '../../store/wikiStore';
import { Save, Bold, Italic, List, Heading, Link as LinkIcon } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface WikiEditorProps {
  pageId: string | null;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-200 p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading') ? 'bg-gray-100' : ''}`}
        title="Heading"
      >
        <Heading className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
        title="Add Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function WikiEditor({ pageId }: WikiEditorProps) {
  const { getPage, updatePage } = useWikiStore();
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[calc(100vh-16rem)] p-4'
      }
    }
  });

  useEffect(() => {
    if (pageId) {
      const page = getPage(pageId);
      if (page) {
        setTitle(page.title);
        editor?.commands.setContent(page.content);
      }
    }
  }, [pageId]);

  useEffect(() => {
    const handleAutoSave = async () => {
      if (pageId && editor && title.trim()) {
        try {
          await updatePage(pageId, {
            title,
            content: editor.getHTML()
          });
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    };

    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    setAutoSaveTimeout(setTimeout(handleAutoSave, 2000));

    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [title, editor?.getHTML()]);

  const handleSave = async () => {
    if (!pageId || !editor) return;
    
    setIsSaving(true);
    try {
      await updatePage(pageId, {
        title,
        content: editor.getHTML()
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!pageId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Welcome to the Wiki</h3>
          <p className="text-sm">Select a page to start editing or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl sm:text-2xl font-bold text-gray-900 bg-transparent border-0 outline-none focus:ring-0 w-full sm:w-auto"
          placeholder="Page Title"
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 w-full sm:w-auto justify-center"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <MenuBar editor={editor} />
        <div className="max-w-4xl mx-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}