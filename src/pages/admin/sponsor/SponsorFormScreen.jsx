import { useRef } from 'react';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import { useToggleMap } from '@/pages/manage/booth/hooks/useToggleMap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSponsorForm } from './hooks/useSponsorForm';
import { useSponsorItemSections } from './hooks/useSponsorItemSections';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import { FieldLabel, RichTextField, SponsorFormContainer } from './style';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import CategoryLabel from '@/pages/manage/booth/components/CategoryLabel';
import { BOOTH_CATEGORY_OPTIONS } from '@/pages/manage/booth/constants/CategoryOptions';
import Editor from '../components/Editor';
import ProductImageUploader from '@/designsystem/components/fileuploader/ProductImageUploader';
import AccordionLine from '@/designsystem/components/accordion/AccordionLine';
import {
  ActionButtonContent,
  CategoryLabelHelperText,
} from '@/pages/manage/booth/style';
import { ADMIN_ROUTES } from '@/constants/routes';
import SponsorItemList from './item/components/SponsorItemList';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import { resetSponsorDraft } from './store/sponsorDraftStore';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';

const SECTION_ORDER = [
  { scrollKey: 'name', fields: ['name'] },
  { scrollKey: 'operationTime', fields: ['operationTime'] },
  { scrollKey: 'introShort', fields: ['introShort'] },
  { scrollKey: 'description', fields: ['description'] },
  { scrollKey: 'imageUrl', fields: ['imageUrl'] },
  { scrollKey: 'itemList', accordionKey: 'itemList', isItemSection: true },
];

export default function SponsorFormScreen({
  sponsor,
  onSubmit,
  submitLabel,
  isSaving,
}) {
  const { showModal } = useModal();
  const goBack = useGoBack();
  const navigate = useNavigate();

  const { sponsorId } = useParams();

  const [expanded, toggleExpanded, openSection] = useToggleMap(['itemList']);
  const sectionRefs = useRef({});

  const {
    formValues,
    updateField,
    visibleErrors,
    isButtonDisabled,
    isDirty,
    validateFields,
    handleSubmit,
    handleUploadError,
    hasAttemptedSubmit,
  } = useSponsorForm({ sponsor, submitLabel, onSubmit });

  const {
    itemSections,
    setItemSections,
    handleEditItem,
    handleDeleteItem,
    handleReorderItems,
    handleReorderGroups,
    itemsError,
    validateItems,
  } = useSponsorItemSections(sponsor, sponsorId);

  const handleBack = async () => {
    if (!isDirty) {
      goBack();
      return;
    }

    await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      cancelText: '나가기',
      confirmText: '계속 작성하기',
      onCancel: () => {
        resetSponsorDraft();
        goBack();
      },
    });
  };

  const scrollToFirstError = (fieldErrors, itemError) => {
    const errorFieldKeys = Object.keys(fieldErrors);

    const target = SECTION_ORDER.find((section) => {
      if (section.isItemSection) return !!itemError;
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

  const handleSave = () => {
    const fieldErrors = validateFields();
    const itemError = validateItems();

    if (Object.keys(fieldErrors).length > 0 || itemError) {
      scrollToFirstError(fieldErrors, itemError);
      return;
    }

    handleSubmit();
  };

  return (
    <>
      <FillCenterHeader
        onBack={handleBack}
        title="협찬사"
        right={
          <TextButton
            onClick={handleSave}
            disabled={isButtonDisabled || isSaving}
          >
            {submitLabel === 'create' ? '등록' : '저장'}
          </TextButton>
        }
        border
      />

      <MainImageUploader
        imageUrl={formValues.imageUrl}
        onUpload={(file) => updateField('imageUrl', file)}
        onDelete={() => updateField('imageUrl', null)}
        onUploadError={handleUploadError}
      />

      <SponsorFormContainer>
        <div ref={(el) => (sectionRefs.current.name = el)}>
          <TextField
            title="이름"
            description="변경 불가"
            value={formValues.name}
            disabled
          />
        </div>

        <TextField
          title="위치"
          description="변경 불가"
          value={formValues.location}
          disabled
        />

        <div ref={(el) => (sectionRefs.current.operationTime = el)}>
          <CategoryLabel
            title="운영 시간"
            options={BOOTH_CATEGORY_OPTIONS.operatingTime}
            selected={formValues.operationTime}
            onChange={(value) => updateField('operationTime', value)}
            hasError={!!visibleErrors.operationTime}
            helperText={visibleErrors.operationTime}
          />
        </div>

        <TextField
          title="SNS"
          placeholder="인스타그램 URL을 입력해주세요."
          value={formValues.snsUrl}
          onChange={(value) => updateField('snsUrl', value)}
        />

        <TextField
          title="URL"
          placeholder="공식 사이트 링크를 등록해보세요."
          value={formValues.externalUrl}
          onChange={(value) => updateField('externalUrl', value)}
        />

        <div ref={(el) => (sectionRefs.current.introShort = el)}>
          <TextField
            title="협찬사 한 줄 소개"
            required
            placeholder="협찬사를 한 줄로 소개해주세요."
            value={formValues.introShort}
            onChange={(value) => updateField('introShort', value)}
            maxLength={50}
            hasError={!!visibleErrors.introShort}
            helperText={visibleErrors.introShort}
          />
        </div>

        <div ref={(el) => (sectionRefs.current.description = el)}>
          <RichTextField>
            <FieldLabel>
              협찬사 소개
              <span>*</span>
            </FieldLabel>
            <Editor
              content={formValues.description}
              onChange={(value) => updateField('description', value)}
              forceShowError={hasAttemptedSubmit}
              imageType="sponsor_description"
              ownerId={sponsorId}
              placeholder="협찬사에 대한 상세 내용을 작성해주세요."
            />
          </RichTextField>
        </div>

        <div ref={(el) => (sectionRefs.current.imageUrl = el)}>
          <ProductImageUploader
            title="프로필 이미지"
            isRequired
            imageUrl={formValues.imageUrl}
            onUpload={(file) => updateField('imageUrl', file)}
            onDelete={() => updateField('imageUrl', null)}
            isError={!!visibleErrors.imageUrl}
            helperText={
              visibleErrors.profileImage ??
              '이미지 1개만 업로드할 수 있습니다. (JPG, JPEG, PNG / 최대 10MB)'
            }
            onUploadError={handleUploadError}
          />
        </div>
      </SponsorFormContainer>

      <AccordionLine
        ref={(el) => (sectionRefs.current.itemList = el)}
        title="협찬품 목록"
        required
        expanded={expanded.itemList}
        onToggle={() => toggleExpanded('itemList')}
      >
        <AccordionLine.ContentGuide description="협찬품 정보와 이미지를 등록하고, 협찬품 소개글을 작성할 수 있습니다." />
        {itemsError && (
          <CategoryLabelHelperText>{itemsError}</CategoryLabelHelperText>
        )}
        <AccordionLine.ActionButton
          buttonText={
            <ActionButtonContent>
              협찬품 등록하기
              <AddIcon />
            </ActionButtonContent>
          }
          onClick={() => {
            navigate(ADMIN_ROUTES.SPONSOR_ITEM_CREATE(sponsorId));
          }}
        />
        <SponsorItemList
          sections={itemSections}
          onSectionsChange={setItemSections}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
          onReorderItems={handleReorderItems}
          onReorderGroups={handleReorderGroups}
        />
        <BoxButton
          variant="secondary"
          size="sm"
          onClick={() => {
            navigate(ADMIN_ROUTES.SPONSOR_GROUP_MANAGE(sponsorId));
          }}
        >
          그룹 설정하기
        </BoxButton>
      </AccordionLine>

      <div style={{ height: '144px' }} />
    </>
  );
}
