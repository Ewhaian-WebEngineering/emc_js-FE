import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import {
  CategoryContainer,
  BoothEditContainer,
  CategoryLabelHelperText,
} from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { BOOTH_ROUTES, MANAGE_ROUTES } from '@/constants/routes';
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
import { InfiniteScrollLoader } from '@/components/common/style';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { useBoothDraftStore } from '../store/useBoothDraftStore';
import { useSaveBoothDraft } from './hooks/useSaveBoothDraft';
import {
  isDraftDirty,
  removeThumbnail,
  resetDraft,
  setThumbnail,
} from '../store/boothDraftStore';
import {
  useDeleteNotice,
  useMyBoothData,
  useNoticeList,
} from '@/api/feature/booth/useBoothData';

export default function BoothEditScreen() {
  const { boothId } = useParams();
  const { data: booth, isPending } = useMyBoothData();

  if (isPending) {
    return (
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    );
  }

  return <BoothEditForm booth={booth} boothId={boothId} />;
}

function BoothEditForm({ booth, boothId }) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const draft = useBoothDraftStore();
  const { save, isSaving } = useSaveBoothDraft(booth, boothId);
  const deleteNoticeMutation = useDeleteNotice();
  const { data: noticeList } = useNoticeList(boothId);

  const [expanded, toggleExpanded] = useToggleMap([
    'boothIntroduction',
    'productList',
    'customerInquiry',
    'allergyInfo',
    'notice',
    'announcement',
  ]);

  const { boothForm, updateField, errors, validate } = useBoothForm(
    booth,
    boothId,
  );

  const {
    productSections,
    setProductSections,
    handleEditProduct,
    handleDeleteProduct,
    handleReorderProducts,
    productsError,
    validateProducts,
  } = useProductSections(booth);

  const handleBack = async () => {
    if (!isDraftDirty()) {
      navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId));
      return;
    }

    await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      confirmText: '계속 작성하기',
      cancelText: '나가기',
      onCancel: () => {
        resetDraft();
        navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId));
      },
    });
  };

  const clickDeleteProduct = (productId) => {
    showModal({
      variant: 'danger',
      title: '해당 제품을 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      confirmText: '삭제하기',
      cancelText: '취소',
      onConfirm: () => handleDeleteProduct(productId),
    });
  };

  const handleEditNotice = (noticeId) => {
    const targetNotice = noticeList?.find((notice) => notice.id === noticeId);
    if (!targetNotice) return;

    navigate(BOOTH_ROUTES.EDIT(boothId, noticeId), {
      state: { noticeData: targetNotice },
    });
  };

  const clickDeleteNotice = (noticeId) => {
    showModal({
      variant: 'danger',
      title: '공지사항을 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      confirmText: '삭제하기',
      cancelText: '취소',
      onConfirm: () => {
        deleteNoticeMutation.mutate(noticeId);
      },
    });
  };

  const handleSave = async () => {
    const fieldErrors = validate();
    const productError = validateProducts();
    if (Object.keys(fieldErrors).length > 0 || productError) return;

    try {
      await save(boothForm, draft);
    } catch (error) {
      showModal({
        variant: 'danger',
        title: '저장에 실패했어요.',
        description: error.message || '잠시 후 다시 시도해주세요.',
        confirmText: '확인',
      });
    }
  };

  return (
    <BoothEditContainer>
      <FillCenterHeader
        onBack={handleBack}
        title="부스 수정"
        right={
          <TextButton onClick={handleSave} disabled={isSaving}>
            저장
          </TextButton>
        }
      />

      <MainImageUploader
        imageUrl={draft.thumbnail.preview}
        onUpload={(file) => setThumbnail(file, URL.createObjectURL(file))}
        onDelete={() => removeThumbnail()}
      />

      <CategoryContainer>
        <TextField
          title="이름"
          description="변경 불가"
          value={boothForm.name}
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
          selected={boothForm.categories}
          onChange={updateField('categories')}
          hasError={!!errors.categories}
          helperText={errors.categories}
        />
        <CategoryLabel
          title="비건 / 친환경 카테고리"
          multiple
          exclusiveValue="none"
          options={BOOTH_CATEGORY_OPTIONS.marks}
          selected={boothForm.marks}
          onChange={updateField('marks')}
          hasError={!!errors.marks}
          helperText={errors.marks}
        />
        <CategoryLabel
          title="운영 시간"
          options={BOOTH_CATEGORY_OPTIONS.operatingTime}
          selected={boothForm.operationTime}
          onChange={updateField('operationTime')}
          hasError={!!errors.operationTime}
          helperText={errors.operationTime}
        />
        <CategoryLabel
          title="현금 사용 여부"
          options={BOOTH_CATEGORY_OPTIONS.cash}
          selected={boothForm.isCash}
          onChange={updateField('isCash')}
          hasError={!!errors.isCash}
          helperText={errors.isCash}
        />
        <TextField
          title="URL"
          placeholder="공식 SNS 등 외부 채널 링크를 등록해보세요."
          value={boothForm.externalUrl}
          onChange={updateField('externalUrl')}
        />
      </CategoryContainer>

      <AccordionLine
        title="부스 소개"
        required
        expanded={expanded.boothIntroduction}
        onToggle={() => toggleExpanded('boothIntroduction')}
      >
        <AccordionLine.ContentGuide description="부스의 특징과 제품을 간단하게 소개해주세요." />
        <TextArea
          placeholder="예) 수제로 만든 디저트와 음료를 판매하는 부스로, 신선한 재료와 정성으로 준비한 다양한 메뉴를 만나보실 수 있습니다."
          value={boothForm.description}
          onChange={updateField('description')}
          maxLength={500}
          hasError={!!errors.description}
          helperText={errors.description}
        />
      </AccordionLine>

      <AccordionLine
        title="제품 목록"
        required
        expanded={expanded.productList}
        onToggle={() => toggleExpanded('productList')}
      >
        <AccordionLine.ContentGuide
          description={
            '제품 정보와 이미지를 등록하고,\n그룹을 설정해 카테고리별로 관리할 수 있습니다.'
          }
        />
        {productsError && (
          <CategoryLabelHelperText>{productsError}</CategoryLabelHelperText>
        )}
        <AccordionLine.ActionButton
          buttonText={
            <ActionButtonContent>
              제품 등록하기
              <AddIcon />
            </ActionButtonContent>
          }
          onClick={() => navigate(MANAGE_ROUTES.PRODUCT_CREATE(boothId))}
        />
        <ProductGroupList
          sections={productSections}
          onSectionsChange={setProductSections}
          onEditProduct={handleEditProduct}
          onDeleteProduct={clickDeleteProduct}
          onReorderProducts={handleReorderProducts}
        />
      </AccordionLine>

      <AccordionLine
        title="고객 문의 창구"
        required
        expanded={expanded.customerInquiry}
        onToggle={() => toggleExpanded('customerInquiry')}
      >
        <AccordionLine.ContentGuide description="고객을 위한 소통 창구 링크를 등록해주세요." />
        <TextInput
          value={boothForm.inquiryUrl}
          onChange={(e) => updateField('inquiryUrl')(e.target.value)}
          placeholder="예) https://pf.kakao.com/_jwmVd"
          hasError={!!errors.inquiryUrl}
          helperText={errors.inquiryUrl}
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
          value={boothForm.allergenInfo}
          onChange={updateField('allergenInfo')}
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
          onClick={() => navigate(BOOTH_ROUTES.REGISTER(boothId))}
        />
        {noticeList?.map((notice) => (
          <AdminNoticeCard
            key={notice.id}
            title={notice.title}
            content={notice.content}
            date={notice.date ?? notice.createdAt}
            onEdit={() => handleEditNotice(notice.id)}
            onDelete={() => clickDeleteNotice(notice.id)}
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
          value={boothForm.guides}
          onChange={updateField('guides')}
          maxLength={1000}
        />
      </AccordionLine>
    </BoothEditContainer>
  );
}
