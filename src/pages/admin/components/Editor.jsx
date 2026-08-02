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

export default function Editor({ content = '', onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
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
    }),
  });

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt('링크 URL을 입력하세요');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: 실제 서비스에서는 여기서 서버에 업로드하고
    // 반환받은 URL을 setImage({ src: uploadedUrl })에 넣는 게 맞습니다.
    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);

    e.target.value = ''; // 같은 파일 다시 선택 가능하도록 초기화
  };

  return (
    <EditorWrapper>
      <Toolbar>
        <ToolbarButton
          active={editorState.isBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <PiTextBLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <PiTextItalicLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <PiTextUnderlineLight />
        </ToolbarButton>
        <ToolbarButton
          active={editorState.isStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <PiTextStrikethroughLight />
        </ToolbarButton>
        <ToolbarButton onClick={setLink} active={editorState.isLink}>
          <PiLinkSimpleLight />
        </ToolbarButton>
        <ToolbarButton onClick={handleImageClick}>
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
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <PiQuotesLight />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
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
