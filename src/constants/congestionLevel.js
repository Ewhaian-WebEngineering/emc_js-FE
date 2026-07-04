import { semantic } from '@/designsystem/tokens/semantic';

export const CONGESTION_LEVEL = {
  crowded: { label: '혼잡', color: semantic.statusDanger },
  normal: { label: '보통', color: semantic.statusWarning },
  relaxed: { label: '여유', color: semantic.statusSuccess },
};
