import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const MainFooter = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: ${measurement.spacing32} ${measurement.spacing20};
  gap: ${measurement.spacing20};
  background-color: ${semantic.fillNormalNormal};
`;

export const Symbol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${measurement.spacing6};
`;

export const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${measurement.spacing12};
`;

export const Description = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;

export const DonationInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${measurement.spacing12};
  color: ${semantic.textNormalNormal};
`;

export const DonationLabel = styled.span`
  ${typography.body2Semibold};
`;

export const DonationInfo = styled.span`
  ${typography.body2Regular};
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${measurement.spacing12};
`;

export const Link = styled.a`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  text-decoration: none;
`;

export const LinkDivider = styled.span`
  width: 1px;
  height: 12px;
  background-color: ${semantic.borderNormalStrong};
`;

export const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};

  ${typography.caption1Regular};
  color: ${semantic.textNormalAssistive};
`;

export const Terms = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${measurement.spacing8};
`;

export const TermLink = styled.a`
  ${typography.caption1Regular};
  color: ${semantic.textNormalAssistive};
  text-decoration: none;
`;

export const TermDivider = styled.span`
  width: 1px;
  height: 10px;
  background-color: ${semantic.borderNormalStrong};
`;
