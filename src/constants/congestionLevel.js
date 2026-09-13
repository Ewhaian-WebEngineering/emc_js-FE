import { semantic } from '@/designsystem/tokens/semantic';

export const CONGESTION_LEVEL = {
  green: { label: '여유', color: semantic.statusSuccess },
  yellow: { label: '보통', color: semantic.statusWarning },
  red: { label: '혼잡', color: semantic.statusDanger },
};
