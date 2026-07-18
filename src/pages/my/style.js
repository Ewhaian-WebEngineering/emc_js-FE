import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic';
import { measurement } from '../../designsystem/tokens/measurement';
import { typography } from '../../designsystem/tokens/typography';

export const MyHeaderWrapper = styled.div`
  flex-shrink: 0;
`;

export const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const MyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${measurement.spacing20} ${measurement.spacing16}
    ${measurement.spacing0} ${measurement.spacing16};
  gap: ${measurement.spacing32};
`;

export const MyFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${measurement.spacing4};
  margin-bottom: ${measurement.spacing88};
`;

export const MyFooterText = styled.div`
  color: ${semantic.textNormalNormal};
  text-align: center;
  ${typography.body2Regular};
`;

export const LoginGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

export const LoginText = styled.h2`
  display: flex;
  align-items: center;
  color: ${semantic.textPrimaryNormal};
  ${typography.headlineBd};
`;
