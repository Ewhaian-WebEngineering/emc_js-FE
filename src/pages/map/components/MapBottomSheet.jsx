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
import { BOOTH_ROUTES, SPONSOR_ROUTES } from '@/constants/routes';
import { useEffect, useMemo, useRef, useState } from 'react';
import Tag from '@/designsystem/components/tag/Tag';
import { useMapData } from '@/api/feature/map/useMapData';

const SPONSOR_LOCATION_ALIAS = { 이화이언: 0 };
const SPONSOR_ROWS = 7;

const toSponsorNumber = (location) =>
  SPONSOR_LOCATION_ALIAS[location] ?? Number(location);

const byNumber = (a, b) => a.number - b.number;

const isValid = (number) => Number.isFinite(number);

export default function MapBottomSheet({ isExpanded, selectedBooth }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const itemRefs = useRef({});
  const contentRef = useRef(null);

  const { generalBooths: generalData, sponsorBooths: sponsorData } =
    useMapData();

  const generalBooths = useMemo(
    () =>
      generalData
        .map((booth) => ({
          id: booth.id,
          type: 'general',
          number: booth.boothNumber,
          name: booth.name,
        }))
        .sort(byNumber),
    [generalData],
  );

  const sponsorBooths = useMemo(
    () =>
      sponsorData
        .map((booth) => ({
          id: booth.id,
          type: 'sponsor',
          number: toSponsorNumber(booth.location),
          name: booth.name,
        }))
        .sort(byNumber),
    [sponsorData],
  );

  const filteredBooths =
    activeTab === 'general' ? generalBooths : sponsorBooths;

  const focusedBoothNumber = selectedBooth?.number ?? null;

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

  const getDetailRoute = (booth) =>
    booth.type === 'sponsor'
      ? SPONSOR_ROUTES.DETAIL(booth.id)
      : BOOTH_ROUTES.DETAIL(booth.id);

  const { showModal } = useModal();
  const handleBoothClick = async (booth) => {
    await showModal({
      variant: 'confirmation',
      title: '부스 상세 페이지로 이동할까요?',
      description: '선택한 부스의\n자세한 정보를 확인할 수 있어요.',
      confirmText: '이동하기',
      cancelText: '취소',
      onConfirm: () => {
        navigate(getDetailRoute(booth));
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
      <BoothListContainer
        $rows={
          activeTab === 'general'
            ? Math.ceil(generalBooths.length / 2)
            : SPONSOR_ROWS
        }
      >
        {filteredBooths.map((booth) => (
          <BoothListItem
            key={booth.id}
            ref={
              isValid(booth.number)
                ? (el) => (itemRefs.current[booth.number] = el)
                : undefined
            }
            boothNumber={isValid(booth.number) ? booth.number : null}
            boothName={booth.name}
            focused={booth.number === focusedBoothNumber}
            onClick={() => {
              if (!isValid(booth.number)) return;
              handleBoothClick(booth);
            }}
          />
        ))}
      </BoothListContainer>
    </BottomSheet>
  );
}
