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
import AccordionLine from '@/designsystem/components/accordion/AccordionLine';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { ActionButtonContent } from './style';
import ProductGroupList from './components/ProductGroupList';
import TextInput from '@/designsystem/components/textinput/TextInput';
import AdminNoticeCard from '@/designsystem/components/card/admin/AdminNoticeCard';

export default function BoothEditScreen() {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const [showBackModal, setShowBackModal] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    boothIntroduction: false,
    productList: false,
    customerInquiry: false,
    allergyInfo: false,
    notice: false,
    announcement: false,
  });

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    inquiryUrl: DUMMY_BOOTH_DETAIL.inquiryUrl,
    description: DUMMY_BOOTH_DETAIL.description,
    allergyInfo: DUMMY_BOOTH_DETAIL.allergyInfo,
    notice: DUMMY_BOOTH_DETAIL.notice,
    announcement: DUMMY_BOOTH_DETAIL.announcement,
  }));

  const [productSections, setProductSections] = useState(() => [
    ...DUMMY_BOOTH_DETAIL.productGroups.map((group) => ({
      ...group,
      isUngrouped: false,
    })),
    {
      id: 'ungrouped',
      name: '그룹 없음',
      products: DUMMY_BOOTH_DETAIL.products,
      isUngrouped: true,
    },
  ]);

  const handleEditProduct = (productId) => {
    // TODO: 제품 수정 로직 구현
    alert(`제품 ${productId} 수정`);
  };

  const handleDeleteProduct = (productId) => {
    // TODO: 제품 삭제 로직 구현
    setProductSections((prev) =>
      prev.map((section) => ({
        ...section,
        products: section.products.filter(
          (product) => product.id !== productId,
        ),
      })),
    );
  };

  const handleEditNotice = (noticeId) => {
    // TODO: 공지사항 수정 로직 구현
    alert(`공지사항 ${noticeId} 수정`);
  };

  const handleDeleteNotice = (noticeId) => {
    // TODO: 공지사항 삭제 로직 구현
    setBoothForm((prev) => ({
      ...prev,
      notice: prev.notice.filter((notice) => notice.id !== noticeId),
    }));
  };

  const updateField = (field) => (value) => {
    setBoothForm((prev) => ({ ...prev, [field]: value }));
  };

  const REQUIRED_FIELDS = [
    {
      check: () => boothForm.tags.length > 0,
      label: '카테고리',
    },
    {
      check: () => boothForm.marks.length > 0,
      label: '비건 / 친환경 카테고리',
    },
    {
      check: () => boothForm.operatingTime !== null,
      label: '운영 시간',
    },
    {
      check: () => boothForm.cash !== undefined && boothForm.cash !== null,
      label: '현금 사용 여부',
    },
    {
      check: () => boothForm.description?.trim(),
      label: '부스 소개',
    },
    {
      check: () => boothForm.inquiryUrl?.trim(),
      label: '고객 문의 창구',
    },
  ];

  const handleSave = () => {
    const missing = REQUIRED_FIELDS.find(({ check }) => !check());
    if (missing) {
      alert(`${missing.label}을(를) 입력해주세요.`);
      return;
    }

    const hasAnyProduct = productSections.some((s) => s.products.length > 0);
    if (!hasAnyProduct) {
      alert('제품을 하나 이상 등록해주세요.');
      return;
    }

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
        <TextField
          title="URL"
          placeholder="공식 SNS 등 외부 채널 링크를 등록해보세요."
        />
      </CategoryContainer>

      <AccordionLine
        title="부스 소개"
        required={true}
        expanded={expandedSections.boothIntroduction}
        onToggle={() => toggleSection('boothIntroduction')}
      >
        <AccordionLine.ContentGuide description="부스의 특징과 제품을 간단하게 소개해주세요." />
        <TextArea
          placeholder="예) 수제로 만든 디저트와 음료를 판매하는 부스로, 신선한 재료와 정성으로 준비한 다양한 메뉴를 만나보실 수 있습니다."
          value={boothForm.description}
          onChange={updateField('description')}
          maxLength={500}
        />
      </AccordionLine>

      <AccordionLine
        title="제품 목록"
        required={true}
        expanded={expandedSections.productList}
        onToggle={() => toggleSection('productList')}
      >
        <AccordionLine.ContentGuide
          description={
            '제품 정보와 이미지를 등록하고,\n그룹을 설정해 카테고리별로 관리할 수 있습니다.'
          }
        />
        <AccordionLine.ActionButton
          buttonText={
            <ActionButtonContent>
              제품 등록하기
              <AddIcon />
            </ActionButtonContent>
          }
          onClick={() => {
            // TODO: 제품 등록 페이지 이동
            alert('제품 등록');
          }}
        />
        <ProductGroupList
          sections={productSections}
          onSectionsChange={setProductSections}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </AccordionLine>

      <AccordionLine
        title="고객 문의 창구"
        required={true}
        expanded={expandedSections.customerInquiry}
        onToggle={() => toggleSection('customerInquiry')}
      >
        <AccordionLine.ContentGuide description="고객을 위한 소통 창구 링크를 등록해주세요." />
        <TextInput
          value={boothForm.inquiryUrl}
          onChange={(e) => updateField('inquiryUrl')(e.target.value)}
          placeholder="예) https://pf.kakao.com/_jwmVd"
        />
      </AccordionLine>

      <AccordionLine
        title="원재료 / 알레르기 정보"
        expanded={expandedSections.allergyInfo}
        onToggle={() => toggleSection('allergyInfo')}
      >
        <AccordionLine.ContentGuide description="수제 먹거리 부스라면 관련 내용을 꼭 작성해 주세요." />
        <TextArea
          placeholder="예) 밀, 우유, 계란, 초콜릿(대두 포함)"
          value={boothForm.allergyInfo}
          onChange={updateField('allergyInfo')}
          maxLength={1000}
        />
      </AccordionLine>

      <AccordionLine
        title="공지사항"
        expanded={expandedSections.notice}
        onToggle={() => toggleSection('notice')}
      >
        <AccordionLine.ContentGuide description="부스 운영 중 발생하는 공지사항을 등록할 수 있어요." />
        <AccordionLine.ActionButton
          buttonText={
            <ActionButtonContent>
              공지사항 등록하기
              <AddIcon />
            </ActionButtonContent>
          }
          onClick={() => {
            // TODO: 공지사항 등록 페이지 이동
            alert('공지사항 등록');
          }}
        />
        {boothForm.notice.map((notice) => (
          <AdminNoticeCard
            key={notice.id}
            title={notice.title}
            content={notice.content}
            date={notice.date}
            onEdit={() => handleEditNotice(notice.id)}
            onDelete={() => handleDeleteNotice(notice.id)}
          />
        ))}
      </AccordionLine>

      <AccordionLine
        title="안내사항"
        expanded={expandedSections.announcement}
        onToggle={() => toggleSection('announcement')}
      >
        <AccordionLine.ContentGuide description="방문자가 알아야 할 유의사항이나 제한 내용을 작성해주세요." />
        <TextArea
          placeholder="예) 현장 결제 시 제품 1과 제품 2는 인당 구매 제한이 있습니다."
          value={boothForm.announcement}
          onChange={updateField('announcement')}
          maxLength={1000}
        />
      </AccordionLine>
    </>
  );
}
