import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  height: 64px;
  background: ${({ $transparent }) =>
    $transparent
      ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%)'
      : semantic.fillNormalWhite};
  padding-inline: ${measurement.spacing16};
  border-bottom: ${({ $border }) =>
    $border
      ? `${measurement.borderWidthSm} solid ${semantic.borderNormalNormal}`
      : 'none'};
  gap: ${({ $gap }) => ($gap ? measurement.spacing4 : measurement.spacing0)};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const HeaderLeft = styled.div`
  flex: ${({ $gap }) => ($gap ? '0 0 auto' : '1')};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const HeaderCenter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ $gap }) => ($gap ? 'flex-start' : 'center')};
`;

export const HeaderRight = styled.div`
  flex: ${({ $gap }) => ($gap ? '0 0 auto' : '1')};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderTitle = styled.span`
  ${typography.headline2Semibold};
  color: ${({ $inverse }) =>
    $inverse ? semantic.textNormalInverse : semantic.textNormalStrong};
`;
