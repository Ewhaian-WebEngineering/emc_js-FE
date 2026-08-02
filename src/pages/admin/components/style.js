import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${measurement.spacing8};
  align-self: stretch;
  border-radius: ${measurement.spacing20};
  border: 1px solid #e0e0e0;
  background: #fff;
  overflow: hidden;
`;

export const Toolbar = styled.div`
  display: flex;
  padding: ${measurement.spacing8};
  align-items: center;
  gap: ${measurement.spacing8};
  align-self: stretch;
`;

export const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${measurement.spacing28};
  height: ${measurement.spacing28};
  border: none;
  background: ${({ active }) => (active ? '#f0f0f0' : 'transparent')};
  border-radius: 6px;
  cursor: pointer;
  color: #333;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

export const Divider = styled.div`
  align-self: stretch;
  border-bottom: 1px solid #e0e0e0;
`;

export const ContentArea = styled.div`
  display: flex;
  height: 220px;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 62px;
  flex-shrink: 0;
  align-self: stretch;
  overflow-y: auto;

  .ProseMirror {
    width: 100%;
    outline: none;
    font-size: 15px;
    color: #333;
  }

  .ProseMirror p.is-editor-empty:first-of-type::before {
    content: attr(data-placeholder);
    float: left;
    color: #b3b3b3;
    pointer-events: none;
    height: 0;
  }

  .ProseMirror hr {
    width: 100%;
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 12px 0;
  }

  .ProseMirror blockquote {
    border-left: 3px solid #e0e0e0;
    padding-left: 12px;
    margin-left: 0;
    color: #666;
  }
`;
