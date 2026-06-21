import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: ${({ $gap }) => ($gap ? 'flex-start' : 'space-between')};
  align-items: center;
  height: 64px;
  background-color: ${({ $transparent }) =>
    $transparent ? 'transparent' : semantic.fillNormalWhite};
  padding-inline: ${measurement.spacing16};
  border-bottom: ${({ $border }) =>
    $border
      ? `${measurement.borderWidthSm} solid ${semantic.borderNormalNormal}`
      : 'none'};
  gap: ${({ $gap }) => ($gap ? measurement.spacing4 : measurement.spacing0)};
`;

export const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const HeaderCenter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
