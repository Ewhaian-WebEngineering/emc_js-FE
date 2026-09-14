import BottomSheet from '@/designsystem/components/bottomsheet/BottomSheet';
import {
  BoothListContainer,
  InstructionsContainer,
  InstructionsText,
  TabRow,
} from '../style';
import BoothListItem from './BoothListItem';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { BOOTH_ROUTES } from '@/constants/routes';
import { useEffect, useRef, useState } from 'react';
import Tag from '@/designsystem/components/tag/Tag';
import { useMapData } from '@/api/feature/map/useMapData';

export default function MapBottomSheet({ isExpanded, selectedBooth }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const itemRefs = useRef({});
  const contentRef = useRef(null);

  const { generalBooths: generalData, sponsorBooths: sponsorData } =
    useMapData();

  const generalBooths = generalData.map((booth) => ({
    id: booth.id,
    number: booth.boothNumber,
    name: booth.name,
  }));

  const sponsorBooths = sponsorData.map((booth) => ({
    id: booth.id,
    number: booth.boothNumber ?? null, // TODO: 서버 필드 추가 시 null 처리 제거
    name: booth.name,
  }));

  const focusedBoothNumber = selectedBooth?.number ?? null;

  const filteredBooths =
    activeTab === 'general' ? generalBooths : sponsorBooths;

  useEffect(() => {
    if (!selectedBooth) return;
    setActiveTab(selectedBooth.type);
  }, [selectedBooth]);

  useEffect(() => {
    if (!selectedBooth) {
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    itemRefs.current[selectedBooth.number]?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [selectedBooth, activeTab]);

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
      contentRef={contentRef}
      variant="handle"
      isOpen={true}
      defaultSnap="min"
      snap={isExpanded ? 'half' : 'min'}
      showScrim="none"
      dismissible={false}
      style={{ zIndex: 10 }}
    >
      <InstructionsContainer>
        <InstructionsText>
          부스를 선택하면
          <br />
          해당 부스 상세페이지로 이동합니다.
        </InstructionsText>
      </InstructionsContainer>
      <TabRow>
        <Tag
          label="일반 부스"
          variant="button"
          selected={activeTab === 'general'}
          onClick={() => setActiveTab('general')}
        />
        <Tag
          label="협찬사 부스"
          variant="button"
          selected={activeTab === 'sponsor'}
          onClick={() => setActiveTab('sponsor')}
        />
      </TabRow>
      <BoothListContainer>
        {filteredBooths.map((booth) => (
          <BoothListItem
            key={booth.id}
            ref={
              booth.number !== null
                ? (el) => (itemRefs.current[booth.number] = el)
                : undefined
            }
            boothNumber={booth.number}
            boothName={booth.name}
            focused={booth.number === focusedBoothNumber}
            disabled={booth.number === null}
            onClick={() => {
              if (booth.number === null) return;
              handleBoothClick(booth.id);
            }}
          />
        ))}
      </BoothListContainer>
    </BottomSheet>
  );
}
