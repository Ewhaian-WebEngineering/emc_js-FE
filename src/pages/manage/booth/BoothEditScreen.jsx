import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useState } from 'react';
import { CategoryContainer } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { DUMMY_BOOTH_DETAIL } from '@/pages/booth/constants/dummyBoothDetail';
import { MANAGE_ROUTES } from '@/constants/routes';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import CategoryLabel from './components/CategoryLabel';
import { BOOTH_CATEGORY_OPTIONS } from './constants/CategoryOptions';

export default function BoothEditScreen() {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const [showBackModal, setShowBackModal] = useState(false);

  // TODO: 실제 API 호출로 부스 상세 정보 조회
  const [boothForm, setBoothForm] = useState(() => ({
    representativeImage: DUMMY_BOOTH_DETAIL.representativeImage,
    boothName: DUMMY_BOOTH_DETAIL.boothName,
    tags: DUMMY_BOOTH_DETAIL.tags,
    marks: DUMMY_BOOTH_DETAIL.marks,
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
        right={<TextButton onClick={handleSave}>저장</TextButton>}
      />
      <MainImageUploader />
      <CategoryContainer>
        <TextField
          title="이름"
          description="변경 불가"
          value={boothForm.boothName}
          disabled
        />
        <TextField
          title="위치"
          description="변경 불가"
          value={`${boothForm.location}번 부스`}
          disabled
        />
        <CategoryLabel
          title="카테고리"
          multiple
          options={BOOTH_CATEGORY_OPTIONS.tags}
          selected={boothForm.tags}
          onChange={updateField('tags')}
        />
        <CategoryLabel
          title="비건 / 친환경 카테고리"
          multiple
          exclusiveValue="none"
          options={BOOTH_CATEGORY_OPTIONS.marks}
          selected={boothForm.marks}
          onChange={updateField('marks')}
        />
        <CategoryLabel
          title="운영 시간"
          options={BOOTH_CATEGORY_OPTIONS.operatingTime}
          selected={boothForm.operatingTime}
          onChange={updateField('operatingTime')}
        />
        <CategoryLabel
          title="현금 사용 여부"
          options={BOOTH_CATEGORY_OPTIONS.cash}
          selected={boothForm.cash}
          onChange={updateField('cash')}
        />
      </CategoryContainer>
    </>
  );
}
