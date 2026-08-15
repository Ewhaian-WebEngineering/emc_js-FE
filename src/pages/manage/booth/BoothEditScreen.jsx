import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useState } from 'react';
import { CategoryContainer } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { DUMMY_BOOTH_DETAIL } from '@/pages/booth/constants/dummyBoothDetail';
import { MANAGE_ROUTES } from '@/constants/routes';

export default function BoothEditScreen() {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const [showBackModal, setShowBackModal] = useState(false);

  // TODO: 실제 API 호출로 부스 상세 정보 조회
  const [boothForm, setBoothForm] = useState(() => ({
    representativeImage: DUMMY_BOOTH_DETAIL.representativeImage,
    boothName: DUMMY_BOOTH_DETAIL.boothName,
    tags: DUMMY_BOOTH_DETAIL.tags,
    operatingTime: DUMMY_BOOTH_DETAIL.operatingTime,
    cash: DUMMY_BOOTH_DETAIL.cash,
    location: DUMMY_BOOTH_DETAIL.location,
    url: DUMMY_BOOTH_DETAIL.url,
    description: DUMMY_BOOTH_DETAIL.description,
    allergyInfo: DUMMY_BOOTH_DETAIL.allergyInfo,
  }));

  const updateField = (field) => (value) => {
    setBoothForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId));
  };

  return (
    <>
      <FillCenterHeader
        onBack={() => setShowBackModal(true)}
        title="부스 수정"
        right={<TextButton onClick={() => {}}>저장</TextButton>}
      />
      <MainImageUploader />
      <CategoryContainer></CategoryContainer>
    </>
  );
}
