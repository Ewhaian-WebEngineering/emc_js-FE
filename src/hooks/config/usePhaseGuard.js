import { PHASE_LOCKED_MODAL } from '@/constants/phase';
import useModal from '../modal/useModal';
import { usePhase } from './usePhase';
import { getUserRole } from '@/api/core/tokenStorage';

export function usePhaseGuard() {
  const { isLocked: isPhaseLocked } = usePhase();
  const isLocked = isPhaseLocked && getUserRole() === 'seller';
  const { showModal } = useModal();

  const showLockedModal = () => showModal(PHASE_LOCKED_MODAL);

  const guard =
    (fn) =>
    (...args) => {
      if (isLocked) {
        showLockedModal();
        return;
      }
      return fn?.(...args);
    };

  const canEdit = () => {
    if (isLocked) {
      showLockedModal();
      return false;
    }
    return true;
  };

  return { isLocked, guard, canEdit, showLockedModal };
}
