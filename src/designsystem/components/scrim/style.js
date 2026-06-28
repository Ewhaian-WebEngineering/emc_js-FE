import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';

export const ScrimContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${semantic.materialNormal};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
