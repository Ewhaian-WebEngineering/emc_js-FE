import styled from '@emotion/styled';
import { gray } from '../../tokens/colors';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';
import BackgroundImage from '@/assets/img/img_checker.png';

export const MainImageUploaderWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 3;
  overflow: hidden;
  border-radius: ${measurement.borderRadiusRectangle};
  background-color: ${gray[200]};
`;

export const MainImageUploaderPreview = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MainImageUploaderActionBar = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${measurement.spacing8};

  width: 100%;
  padding: ${measurement.spacing12} ${measurement.spacing16};
  border: none;
  background-color: ${semantic.materialNormal};
  cursor: pointer;

  ${typography.body1Medium};
  color: ${({ variant }) =>
    variant === 'delete' ? semantic.statusDanger : semantic.textNormalInverse};
`;

export const ProductImageUploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const ProductImageUploaderLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};

  ${typography.body1Semibold};
  color: ${semantic.textNormalNormal};
`;

export const ProductImageUploaderRequired = styled.span`
  ${typography.body1Semibold};
  color: ${semantic.statusDanger};
`;

export const ProductImageUploaderBox = styled.div`
  position: relative;
  width: 82px;
  height: 82px;

  border: ${measurement.borderWidthXs} solid
    ${({ hasError }) =>
      hasError ? semantic.statusDanger : semantic.borderNormalStrong};
  border-radius: ${measurement.borderRadiusLg};
  overflow: hidden;

  background-image: url(${BackgroundImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductImageUploaderButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
`;

export const ProductImageUploaderDeleteButton = styled.button`
  position: absolute;
  top: ${measurement.spacing2};
  right: ${measurement.spacing2};

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  cursor: pointer;
`;

export const ProductImageUploaderHelperText = styled.span`
  ${typography.caption1Regular};
  color: ${({ hasError }) =>
    hasError ? semantic.statusDanger : semantic.textNormalAssistive};
`;
