import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { useEffect, useRef, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';
import {
  EditorWrapper,
  Toolbar,
  ToolbarButton,
  Divider,
  ContentArea,
  LinkBubbleMenu,
  LinkInput,
  LinkActionButton,
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
  const linkMenuRef = useRef(null);
  const savedSelectionRef = useRef(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkMenu, setShowLinkMenu] = useState(false);
  const { toast } = useToastContext();

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

  useEffect(() => {
    if (showLinkMenu && savedSelectionRef.current && editor) {
      const { from, to } = savedSelectionRef.current;
      editor.chain().setTextSelection({ from, to }).focus().run();
    }
  }, [showLinkMenu, editor]);

  useEffect(() => {
    if (!showLinkMenu) return;

    const handleClickOutside = (e) => {
      if (linkMenuRef.current && !linkMenuRef.current.contains(e.target)) {
        setShowLinkMenu(false);
        setLinkUrl('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    };
  }, [showLinkMenu]);

  if (!editor) return null;

  const setLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      setLinkUrl('');
      setShowLinkMenu(false);
      return;
    }
    const { from, to } = editor.state.selection;
    if (from === to) {
      toast({ message: '링크를 적용할 텍스트를 먼저 드래그해주세요.' });
      return;
    }
    savedSelectionRef.current = { from, to };
    setLinkUrl('');
    setShowLinkMenu(true);
  };

  const applyLink = () => {
    if (!linkUrl.trim()) return;
    editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
    setLinkUrl('');
    setShowLinkMenu(false);
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
          active={editorState.isLink}
          onMouseDown={preventMouseDown}
          onClick={setLink}
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
        <BubbleMenu editor={editor} shouldShow={() => showLinkMenu}>
          <LinkBubbleMenu ref={linkMenuRef}>
            <LinkInput
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  applyLink();
                }
              }}
              placeholder="링크 URL을 입력하세요"
            />
            <LinkActionButton
              type="button"
              onMouseDown={preventMouseDown}
              onClick={applyLink}
            >
              적용
            </LinkActionButton>
          </LinkBubbleMenu>
        </BubbleMenu>
        <EditorContent editor={editor} style={{ width: '100%' }} />
      </ContentArea>
    </EditorWrapper>
  );
}
