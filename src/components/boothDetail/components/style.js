import { gray } from '@/designsystem/tokens/colors';
import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import styled from '@emotion/styled';

export const NoticeTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
  margin-inline: -${measurement.spacing16};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing72} ${measurement.spacing16};
  background-color: ${semantic.fillNormalStrong};
`;

export const NoticeTabHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing6};

  h2 {
    ${typography.body2Semibold};
    color: ${gray[950]};
  }
`;

export const NoticeContent = styled.div`
  padding-inline: ${measurement.spacing4};
  ${typography.caption1Regular};
  color: ${semantic.textNormalStrong};
`;

export const ContactTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
  margin-inline: -${measurement.spacing16};
  padding-block: ${measurement.spacing24};
  padding-inline: ${measurement.spacing16};
  background-color: ${semantic.fillNormalWhite};
`;

export const ContactTabTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};

  h2 {
    ${typography.body2Semibold};
    color: ${semantic.textNormalStrong};
  }

  p {
    ${typography.caption1Regular};
    color: ${semantic.textNormalNormal};
  }
`;

export const ContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing12};
  padding: ${measurement.spacing12} ${measurement.spacing16};
  border-radius: ${measurement.borderRadiusXl};
  background-color: ${semantic.fillNormalWhite};
  border: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
  cursor: pointer;
`;

export const InquiryIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${measurement.spacing4};
  border-radius: ${measurement.borderWidthLg};
  background-color: ${semantic.secondaryYellowLighten};
`;

export const ContactUrl = styled.span`
  flex: 1;
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  text-align: left;
`;

export const ProductListTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing40};
  padding-block: ${measurement.spacing20};
`;

export const ProductListTabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;

export const ProductListTabHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};

  h2 {
    ${typography.body1Semibold};
    color: ${semantic.textNormalStrong};
  }

  p {
    ${typography.body2Regular};
    color: ${semantic.textNormalNormal};
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${measurement.spacing16} ${measurement.spacing12};
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100dvh;
`;

export const ModalCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const ModalHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: ${measurement.spacing16};
  padding-right: ${measurement.spacing16};
  min-height: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const PreviewViewport = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: transparent;
`;

export const PreviewStage = styled.div`
  width: fit-content;
  transform-origin: top left;
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;
`;

export const ModalFooter = styled.div`
  flex: 1;
  min-height: 0;
`;
