import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';

export const BannerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;

  border: ${measurement.borderWidthSm} solid ${semantic.borderNormalAssistive};
  border-radius: ${measurement.borderRadiusMd};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
