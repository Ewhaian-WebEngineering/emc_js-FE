import styled from '@emotion/styled';
import { gray } from '../../tokens/colors';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

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
