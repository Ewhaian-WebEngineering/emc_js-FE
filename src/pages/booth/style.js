import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import styled from '@emotion/styled';

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
`;

export const NoticeContentText = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;

export const WhiteSpace = styled.div`
  height: ${measurement.spacing128};
`;
