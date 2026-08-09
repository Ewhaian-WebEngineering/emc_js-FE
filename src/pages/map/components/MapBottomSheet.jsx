import BottomSheet from '@/designsystem/components/bottomsheet/BottomSheet';
import {
  BoothListContainer,
  InstructionsContainer,
  InstructionsText,
} from '../style';
import { BOOTH_LIST } from '../constants/boothList';
import BoothListItem from './BoothListItem';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { BOOTH_ROUTES } from '@/constants/routes';

export default function MapBottomSheet() {
  const navigate = useNavigate();

  const booths = BOOTH_LIST.map((booth) => ({
    number: booth.number,
    name: booth.name,
  }));

  const { showModal } = useModal();
  const handleBoothClick = async (boothId) => {
    await showModal({
      variant: 'confirmation',
      title: '부스 상세 페이지로 이동할까요?',
      description: '선택한 부스의\n자세한 정보를 확인할 수 있어요.',
      confirmText: '이동하기',
      cancelText: '취소',
      onConfirm: () => {
        navigate(BOOTH_ROUTES.DETAIL(boothId));
      },
      onCancel: () => {},
    });
  };

  return (
    <BottomSheet
      variant="handle"
      isOpen={true}
      defaultSnap="min"
      showScrim={false}
      style={{ zIndex: 10 }}
    >
      <InstructionsContainer>
        <InstructionsText>
          부스를 선택하면
          <br />
          해당 부스 상세페이지로 이동합니다.
        </InstructionsText>
      </InstructionsContainer>
      <BoothListContainer>
        {booths.map((booth) => (
          <BoothListItem
            key={booth.number}
            boothNumber={booth.number}
            boothName={booth.name}
            onClick={() => {
              handleBoothClick(booth.number);
            }}
          />
        ))}
      </BoothListContainer>
    </BottomSheet>
  );
}
