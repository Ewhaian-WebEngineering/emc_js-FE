import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { CategoryContainer, BoothEditContainer } from './style';
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
import { useBoothForm } from './hooks/useBoothForm';
import { useProductSections } from './hooks/useProductSections';
import { useToggleMap } from './hooks/useToggleMap';
import useModal from '@/hooks/modal/useModal';

export default function BoothEditScreen() {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const { showModal } = useModal();

  const [expanded, toggleExpanded] = useToggleMap([
    'boothIntroduction',
    'productList',
    'customerInquiry',
    'allergyInfo',
    'notice',
    'announcement',
  ]);

  const {
    boothForm,
    updateField,
    handleEditNotice,
    handleDeleteNotice,
    getValidationError,
  } = useBoothForm(DUMMY_BOOTH_DETAIL);

  const {
    productSections,
    setProductSections,
    handleEditProduct,
    handleDeleteProduct,
    hasAnyProduct,
  } = useProductSections(DUMMY_BOOTH_DETAIL);

  const handleBack = async () => {
    await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      confirmText: '계속 작성하기',
      cancelText: '나가기',
      onCancel: () => {
        navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId));
      },
    });
  };

  const handleSave = () => {
    const error = getValidationError();
    if (error) {
      alert(error);
      return;
    }

    if (!hasAnyProduct) {
      alert('제품을 하나 이상 등록해주세요.');
      return;
    }

    navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId));
  };

  return (
    <BoothEditContainer>
      <FillCenterHeader
        onBack={handleBack}
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
          value={boothForm.url}
          onChange={updateField('url')}
        />
      </CategoryContainer>

      <AccordionLine
        title="부스 소개"
        required={true}
        expanded={expanded.boothIntroduction}
        onToggle={() => toggleExpanded('boothIntroduction')}
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
        expanded={expanded.productList}
        onToggle={() => toggleExpanded('productList')}
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
        expanded={expanded.customerInquiry}
        onToggle={() => toggleExpanded('customerInquiry')}
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
        expanded={expanded.allergyInfo}
        onToggle={() => toggleExpanded('allergyInfo')}
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
        expanded={expanded.notice}
        onToggle={() => toggleExpanded('notice')}
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
        expanded={expanded.announcement}
        onToggle={() => toggleExpanded('announcement')}
      >
        <AccordionLine.ContentGuide description="방문자가 알아야 할 유의사항이나 제한 내용을 작성해주세요." />
        <TextArea
          placeholder="예) 현장 결제 시 제품 1과 제품 2는 인당 구매 제한이 있습니다."
          value={boothForm.announcement}
          onChange={updateField('announcement')}
          maxLength={1000}
        />
      </AccordionLine>
    </BoothEditContainer>
  );
}
