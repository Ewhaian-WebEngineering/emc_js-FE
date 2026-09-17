import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const Wrapper = styled.div``;

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${measurement.spacing8};
  align-self: stretch;
  border-radius: ${measurement.borderRadiusXl};
  border: ${measurement.borderWidthXs} solid
    ${({ hasError }) =>
      hasError ? semantic.statusDanger : semantic.borderNormalNormal};
  background: ${semantic.fillNormalWhite};
  overflow: hidden;
`;

export const Toolbar = styled.div`
  display: flex;
  padding: ${measurement.spacing12} 0 ${measurement.spacing8}
    ${measurement.spacing16};
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
  background: ${({ active }) =>
    active ? semantic.fillInteractionDisabled : 'transparent'};
  border-radius: ${measurement.borderRadiusSm};
  cursor: pointer;
  color: #333;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${semantic.fillInteractionDisabled};
  }
`;

export const Divider = styled.div`
  align-self: stretch;
  border-bottom: ${measurement.borderWidthXs} solid
    ${({ hasError }) =>
      hasError ? semantic.statusDanger : semantic.borderNormalNormal};
`;

export const ContentArea = styled.div`
  display: flex;
  height: 220px;
  padding: ${measurement.spacing12} ${measurement.spacing16};
  align-items: flex-start;
  gap: 62px;
  flex-shrink: 0;
  align-self: stretch;
  overflow-y: auto;

  .ProseMirror {
    width: 100%;
    outline: none;
    font-size: 15px;
    color: ${semantic.textNormalStrong};
  }

  .ProseMirror p.is-editor-empty:first-of-type::before {
    content: attr(data-placeholder);
    float: left;
    color: ${semantic.textNormalAssistive};
    pointer-events: none;
    height: 0;
  }

  .ProseMirror hr {
    width: 100%;
    border: none;
    border-top: ${measurement.borderRadiusSm} solid
      ${semantic.borderNormalNormal};
    margin: ${measurement.spacing12} 0;
  }

  .ProseMirror blockquote {
    border-left: 3px solid ${semantic.borderNormalNormal};
    padding-left: 12px;
    margin-left: 0;
    color: #666;
  }

  .ProseMirror a {
    color: ${semantic.textPrimaryNormal};
    text-decoration: underline;
    cursor: pointer;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
    margin: 8px 0;
  }
`;
export const CongestionListWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};
`;

export const CongestionButtonWrapper = styled.div`
  padding: ${measurement.spacing12} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};

  & > button {
    width: 100%;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${measurement.spacing4};
`;

export const SectionTitle = styled.p`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  margin-top: ${({ isFirst }) => (isFirst ? 0 : `${measurement.spacing28}`)};
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const LinkBubbleMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: ${semantic.fillNormalWhite};
  border: 1px solid ${semantic.borderNormalNormal};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const LinkInput = styled.input`
  width: 220px;
  padding: 6px 8px;
  border: 1px solid ${semantic.fillNormalStrong};
  border-radius: 4px;
  outline: none;
  ${typography.body2};
`;

export const LinkActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background: ${semantic.fillNormalNormal};
  cursor: pointer;

  &:hover {
    background: ${semantic.fillNormalStrong};
  }
`;

export const ErrorText = styled.p`
  margin: 8px 0 0;
  font-size: 12px;
  color: ${semantic.statusDanger};
  visibility: ${({ hasError }) => (hasError ? 'visible' : 'hidden')};
`;
