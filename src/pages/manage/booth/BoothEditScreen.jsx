import { useRef } from 'react';
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
import { useToggleMap } from './hooks/useToggleMap';
import useModal from '@/hooks/modal/useModal';
import { InfiniteScrollLoader } from '@/components/common/style';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { useBoothDraftStore } from '../store/useBoothDraftStore';
import { useSaveBoothDraft } from './hooks/useSaveBoothDraft';
import {
  isDraftDirty,
  markNoticeDeleted,
  removeThumbnail,
  resetDraft,
  setThumbnail,
} from '../store/boothDraftStore';
import {
  useMyBoothData,
  useNoticeList,
  useProductGroupList,
} from '@/api/feature/booth/useBoothData';
import { useProductSections } from '@/pages/admin/sponsor/hooks/useProductSections';
import { useToast } from '@/hooks/toast/useToast';
import { useGoBack } from '@/hooks/useGoBack';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import { usePhaseGuard } from '@/hooks/config/usePhaseGuard';

export default function BoothEditScreen() {
  const { boothId } = useParams();
  const { data: booth, isPending } = useMyBoothData(boothId);

  if (isPending) {
    return (
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    );
  }

  return <BoothEditForm booth={booth} boothId={boothId} />;
}

function buildNoticeList(serverNotices, draftNotices) {
  const overridden = (serverNotices ?? [])
    .map((notice) => {
      const entry = draftNotices[notice.id];
      if (entry?.status === 'deleted') return null;
      if (entry?.status === 'updated') {
        return { ...notice, ...entry.data, status: 'updated' };
      }
      return { ...notice, status: 'server' };
    })
    .filter(Boolean);

  const created = Object.entries(draftNotices)
    .filter(([, entry]) => entry?.status === 'created')
    .map(([tempId, entry]) => ({
      ...entry.data,
      id: tempId,
      status: 'created',
    }));

  return [...created, ...overridden];
}

function BoothEditForm({ booth, boothId }) {
  const navigate = useNavigate();
  const goBack = useGoBack(MANAGE_ROUTES.BOOTH_PREVIEW(boothId));
  const { showModal } = useModal();
  const { toast } = useToast();
  const draft = useBoothDraftStore();
  const { save, isSaving } = useSaveBoothDraft(booth, boothId);
  const { data: rawNoticeList } = useNoticeList(boothId);
  const noticeList = buildNoticeList(rawNoticeList, draft.notices);
  const { data: productGroups } = useProductGroupList(boothId);

  const sectionRefs = useRef({});

  const [expanded, toggleExpanded, openSection] = useToggleMap([
    'boothIntroduction',
    'productList',
    'customerInquiry',
    'allergyInfo',
    'notice',
    'announcement',
  ]);

  const { boothForm, updateField, handleBlur, errors, validate } = useBoothForm(
    booth,
    boothId,
  );

  const {
    productSections,
    setProductSections,
    handleEditProduct,
    handleDeleteProduct,
    handleReorderProducts,
    handleReorderGroups,
    productsError,
    validateProducts,
  } = useProductSections({
    productGroups: booth.productGroups,
    ungroupedProducts: booth.ungroupedProducts,
    booth,
  });

  const handleBack = async () => {
    if (!isDraftDirty()) {
      goBack();
      return;
    }

    await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      cancelText: '나가기',
      confirmText: '계속 작성하기',
      onConfirm: () => {
        return;
      },
      onCancel: () => {
        resetDraft();
        navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId), { replace: true });
      },
      onDismiss: () => {
        return;
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
        markNoticeDeleted(noticeId);
      },
    });
  };

  const SECTION_ORDER = [
    {
      scrollKey: 'categoryContainer',
      fields: ['categories', 'marks', 'operationTime', 'isCash', 'externalUrl'],
    },
    {
      scrollKey: 'boothIntroduction',
      accordionKey: 'boothIntroduction',
      fields: ['description'],
    },
    {
      scrollKey: 'productList',
      accordionKey: 'productList',
      isProductSection: true,
    },
    {
      scrollKey: 'customerInquiry',
      accordionKey: 'customerInquiry',
      fields: ['inquiryUrl'],
    },
  ];

  const scrollToFirstError = (fieldErrors, productError) => {
    const errorFieldKeys = Object.keys(fieldErrors);

    const target = SECTION_ORDER.find((section) => {
      if (section.isProductSection) return !!productError;
      return section.fields.some((field) => errorFieldKeys.includes(field));
    });

    if (!target) return;

    if (target.accordionKey) {
      openSection(target.accordionKey);
    }

    const delay = target.accordionKey ? 350 : 0;
    setTimeout(() => {
      sectionRefs.current[target.scrollKey]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, delay);
  };

  const LOCKED_FIELDS = [
    'categories',
    'isVegan',
    'isEco',
    'operationTime',
    'isCash',
    'externalUrl',
    'inquiryUrl',
    'description',
    'guides',
  ];

  const hasLockedChange = () => {
    const fieldChanged = LOCKED_FIELDS.some(
      (f) =>
        JSON.stringify(draft.boothFields?.[f]) !==
        JSON.stringify(draft.originalFields?.[f]),
    );
    const thumbnailChanged =
      draft.thumbnail.file !== null || draft.thumbnail.removed;
    const groupChanged = Object.keys(draft.groups).length > 0;
    const productAddedOrDeleted = Object.values(draft.products).some(
      (p) => p.status !== 'updated',
    );
    return (
      fieldChanged || thumbnailChanged || groupChanged || productAddedOrDeleted
    );
  };

  const handleSave = async () => {
    if (isLocked && hasLockedChange()) {
      showLockedModal();
      return;
    }

    const fieldErrors = validate();
    const productError = validateProducts();
    if (Object.keys(fieldErrors).length > 0 || productError) {
      scrollToFirstError(fieldErrors, productError);
      return;
    }

    try {
      await save(boothForm, draft);
      toast({ message: '변경사항이 저장되었어요.' });
    } catch {
      // 공통 에러 모달
    }
  };

  const { isLocked, guard, canEdit, showLockedModal } = usePhaseGuard();

  const guardBlur =
    (field, onBlur) =>
    (...args) => {
      const original = draft.originalFields?.[field] ?? '';
      if (isLocked && boothForm[field] !== original) {
        updateField(field)(original);
        showLockedModal();
        return;
      }
      onBlur?.(...args);
    };

  return (
    <BoothEditContainer>
      <FillCenterHeader
        onBack={handleBack}
        title="부스 수정"
        right={
          <TextButton
            onClick={handleSave}
            disabled={isSaving || !isDraftDirty()}
          >
            저장
          </TextButton>
        }
      />

      <MainImageUploader
        imageUrl={draft.thumbnail.preview}
        onUpload={(file) => setThumbnail(file, URL.createObjectURL(file))}
        onBeforeUpload={canEdit}
        onDelete={guard(() => removeThumbnail())}
      />

      <CategoryContainer
        ref={(el) => (sectionRefs.current.categoryContainer = el)}
      >
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
          onChange={guard(updateField('categories'))}
          hasError={!!errors.categories}
          helperText={errors.categories}
        />
        <CategoryLabel
          title="비건 / 친환경 카테고리"
          multiple
          exclusiveValue="none"
          options={BOOTH_CATEGORY_OPTIONS.marks}
          selected={boothForm.marks}
          onChange={guard(updateField('marks'))}
          hasError={!!errors.marks}
          helperText={errors.marks}
        />
        <CategoryLabel
          title="운영 시간"
          options={BOOTH_CATEGORY_OPTIONS.operatingTime}
          selected={boothForm.operationTime}
          onChange={guard(updateField('operationTime'))}
          hasError={!!errors.operationTime}
          helperText={errors.operationTime}
        />
        <CategoryLabel
          title="현금 사용 여부"
          options={BOOTH_CATEGORY_OPTIONS.cash}
          selected={boothForm.isCash}
          onChange={guard(updateField('isCash'))}
          hasError={!!errors.isCash}
          helperText={errors.isCash}
        />
        <TextField
          title="URL"
          placeholder="공식 SNS 등 외부 채널 링크를 등록해보세요."
          value={boothForm.externalUrl}
          onChange={updateField('externalUrl')}
          onBlur={guardBlur('externalUrl', handleBlur('externalUrl'))}
          hasError={!!errors.externalUrl}
          helperText={errors.externalUrl}
        />
      </CategoryContainer>

      <AccordionLine
        ref={(el) => (sectionRefs.current.boothIntroduction = el)}
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
          onBlur={guardBlur('description')}
          maxLength={500}
          hasError={!!errors.description}
          helperText={errors.description}
        />
      </AccordionLine>

      <AccordionLine
        ref={(el) => (sectionRefs.current.productList = el)}
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
          onClick={guard(() => navigate(MANAGE_ROUTES.PRODUCT_CREATE(boothId)))}
        />
        <ProductGroupList
          sections={productSections}
          onSectionsChange={setProductSections}
          onEditProduct={handleEditProduct}
          onDeleteProduct={guard(clickDeleteProduct)}
          readOnly={isLocked}
          onReorderProducts={handleReorderProducts}
          onReorderGroups={handleReorderGroups}
        />
        <BoxButton
          variant="secondary"
          size="sm"
          onClick={guard(() =>
            navigate(MANAGE_ROUTES.PRODUCT_GROUP_MANAGE(boothId)),
          )}
        >
          그룹 설정하기
        </BoxButton>
      </AccordionLine>

      <AccordionLine
        ref={(el) => (sectionRefs.current.customerInquiry = el)}
        title="고객 문의 창구"
        required
        expanded={expanded.customerInquiry}
        onToggle={() => toggleExpanded('customerInquiry')}
      >
        <AccordionLine.ContentGuide description="고객을 위한 소통 창구 링크를 등록해주세요." />
        <TextInput
          value={boothForm.inquiryUrl}
          onChange={(e) => updateField('inquiryUrl')(e.target.value)}
          onBlur={guardBlur('inquiryUrl', handleBlur('inquiryUrl'))}
          placeholder="예) https://pf.kakao.com/_jwmVd"
          hasError={!!errors.inquiryUrl}
          helperText={errors.inquiryUrl}
        />
      </AccordionLine>

      {boothForm.categories.includes('food') && (
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
            maxLength={500}
          />
        </AccordionLine>
      )}

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
          onBlur={guardBlur('guides')}
          maxLength={1000}
        />
      </AccordionLine>
    </BoothEditContainer>
  );
}
