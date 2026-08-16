import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import { useRef } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  EditorWrapper,
  Toolbar,
  ToolbarButton,
  Divider,
  ContentArea,
} from './style';
import {
  PiTextBLight,
  PiTextItalicLight,
  PiTextUnderlineLight,
  PiTextStrikethroughLight,
  PiLinkSimpleLight,
  PiImageLight,
  PiQuotesLight,
  PiMinusLight,
} from 'react-icons/pi';

const preventMouseDown = (e) => e.preventDefault();

export default function Editor({ content = '', onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: false,
        linkOnPaste: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image,
      Placeholder.configure({
        placeholder: '이벤트에 대한 상세 내용을 작성해주세요.',
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive('bold') ?? false,
      isItalic: ctx.editor?.isActive('italic') ?? false,
      isUnderline: ctx.editor?.isActive('underline') ?? false,
      isStrike: ctx.editor?.isActive('strike') ?? false,
      isLink: ctx.editor?.isActive('link') ?? false,
      isBlockquote: ctx.editor?.isActive('blockquote') ?? false,
      isImage: ctx.editor?.isActive('image') ?? false,
      isHorizontalRule: ctx.editor?.isActive('horizontalRule') ?? false,
    }),
  });

  if (!editor) return null;

  const setLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const { from, to } = editor.state.selection;
    if (from === to) {
      alert('링크를 적용할 텍스트를 먼저 드래그해주세요.');
      return;
    }

    const url = window.prompt('링크 URL을 입력하세요');
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const handleImageClick = () => {
    if (editor.isActive('image')) {
      editor.chain().focus().deleteSelection().run();
      return;
    }
    fileInputRef.current?.click();
  };

  // TODO : S3 이미지 업로드로 변경
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = await uploadImage(file);

    editor.chain().focus().setImage({ src: imageUrl }).run();

    e.target.value = '';
  };

  const handleHorizontalRuleClick = () => {
    if (editor.isActive('horizontalRule')) {
      editor.chain().focus().deleteSelection().run();
      return;
    }
    editor.chain().focus().setHorizontalRule().run();
  };

  return (
    <EditorWrapper>
      <Toolbar>
        <ToolbarButton
          active={editorState.isBold}
          onMouseDown={preventMouseDown}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <PiTextBLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isItalic}
          onMouseDown={preventMouseDown}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <PiTextItalicLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isUnderline}
          onMouseDown={preventMouseDown}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <PiTextUnderlineLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isStrike}
          onMouseDown={preventMouseDown}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <PiTextStrikethroughLight />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={preventMouseDown}
          onClick={setLink}
          active={editorState.isLink}
        >
          <PiLinkSimpleLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isImage}
          onMouseDown={preventMouseDown}
          onClick={handleImageClick}
        >
          <PiImageLight />
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <ToolbarButton
          active={editorState.isBlockquote}
          onMouseDown={preventMouseDown}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <PiQuotesLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isHorizontalRule}
          onMouseDown={preventMouseDown}
          onClick={handleHorizontalRuleClick}
        >
          <PiMinusLight />
        </ToolbarButton>
      </Toolbar>
      <Divider />
      <ContentArea>
        <EditorContent editor={editor} style={{ width: '100%' }} />
      </ContentArea>
    </EditorWrapper>
  );
}
