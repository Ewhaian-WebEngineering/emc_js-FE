import PlaceholderLogo from '@/assets/svg/logo/ic_logo_cart_blue.svg?react';
import styled from '@emotion/styled';
import { gray } from '../tokens/colors';
import { measurement } from '../tokens/measurement';

export default function Placeholder({ logoSize = '50%' }) {
  return (
    <PlaceholderWrapper logoSize={logoSize}>
      <PlaceholderLogo />
    </PlaceholderWrapper>
  );
}

const PlaceholderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${gray[200]};
  border-radius: ${measurement.borderRadiusMd};

  & > svg {
    width: ${({ logoSize }) => logoSize};
    height: ${({ logoSize }) => logoSize};
    mix-blend-mode: luminosity;
    opacity: 0.4;
  }
`;
