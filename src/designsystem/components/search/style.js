import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;

  padding: ${measurement.spacing12};
  gap: ${measurement.spacing8};

  background-color: ${semantic.fillNormalNormal};

  border: ${measurement.borderWidthXs} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusLg};

  input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${semantic.textNormalNormal};
    ${css(typography.body1Regular)};

    &::placeholder {
      color: ${semantic.textNormalAssistive};
    }
  }
`;

export const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: '20px';
  height: '20px';

  color: ${semantic.iconNormalAssistive};
  border: none;
  background-color: transparent;

  cursor: pointer;
`;

export const SearchIconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;
