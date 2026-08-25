import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import { useSponsorForm } from './hooks/useSponsorForm';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import { FieldLabel, RichTextField, SponsorFormContainer } from './style';
import CategoryLabel from '@/pages/manage/booth/components/CategoryLabel';
import { BOOTH_CATEGORY_OPTIONS } from '@/pages/manage/booth/constants/CategoryOptions';
import Editor from '../components/Editor';
import ProductImageUploader from '@/designsystem/components/fileuploader/ProductImageUploader';
import AccordionLine from '@/designsystem/components/accordion/AccordionLine';
import {
  ActionButtonContent,
  CategoryLabelHelperText,
} from '@/pages/manage/booth/style';
import { useToggleMap } from '@/pages/manage/booth/hooks/useToggleMap';
import SponsorItemList from './item/components/SponsorItemList';
import { useSponsorItemSections } from './hooks/useSponsorItemSections';

export default function SponsorFormScreen({ sponsor, onSubmit, submitLabel }) {
  const { showModal } = useModal();
  const goBack = useGoBack();

  const [expanded, toggleExpanded] = useToggleMap(['itemList']);

  const {
    formValues,
    updateField,
    visibleErrors,
    isButtonDisabled,
    handleSubmit,
    handleUploadError,
  } = useSponsorForm({ sponsor, submitLabel, onSubmit });

  const {
    itemSections,
    setItemSections,
    handleEditItem,
    handleDeleteItem,
    itemsError,
    validateItems,
  } = useSponsorItemSections(sponsor);

  const handleBack = async () => {
    await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      cancelText: '나가기',
      confirmText: '계속 작성하기',
      onCancel: () => goBack(),
    });
  };

  const handleSave = () => {
    const itemError = validateItems();
    if (itemError) return;

    handleSubmit();
  };

  return (
    <>
      <FillCenterHeader
        onBack={handleBack}
        title="협찬사"
        right={
          <TextButton onClick={handleSave} disabled={isButtonDisabled}>
            {submitLabel === 'create' ? '등록' : '저장'}
          </TextButton>
        }
        border
      />

      <MainImageUploader
        imageUrl={formValues.profileImage}
        onUpload={(file) =>
          updateField('profileImage', URL.createObjectURL(file))
        }
        onDelete={() => updateField('profileImage', '')}
        onUploadError={handleUploadError}
      />

      <SponsorFormContainer>
        <TextField
          title="이름"
          required
          placeholder="협찬사 이름을 입력해주세요."
          value={formValues.name}
          onChange={(value) => updateField('name', value)}
          hasError={!!visibleErrors.name}
          helperText={visibleErrors.name}
        />

        <TextField
          title="위치"
          description="변경 불가"
          value={`${formValues.location}번 부스`}
          disabled
        />

        <CategoryLabel
          title="운영 시간"
          options={BOOTH_CATEGORY_OPTIONS.operatingTime}
          selected={formValues.operatingTime}
          onChange={(value) => updateField('operatingTime', value)}
          hasError={!!visibleErrors.operatingTime}
          helperText={visibleErrors.operatingTime}
        />

        <TextField
          title="URL"
          placeholder="공식 SNS 등 외부 채널 링크를 등록해보세요."
          value={formValues.url}
          onChange={(value) => updateField('url', value)}
        />

        <TextField
          title="협찬사 한 줄 소개"
          required
          placeholder="협찬사를 한 줄로 소개해주세요."
          value={formValues.shortDescription}
          onChange={(value) => updateField('shortDescription', value)}
          maxLength={50}
          hasError={!!visibleErrors.shortDescription}
          helperText={visibleErrors.shortDescription}
        />

        <RichTextField>
          <FieldLabel>
            협찬사 소개
            <span>*</span>
          </FieldLabel>
          <Editor
            content={formValues.description}
            onChange={(value) => updateField('description', value)}
          />
        </RichTextField>

        <ProductImageUploader
          title="프로필 이미지"
          isRequired
          imageUrl={formValues.profileImage}
          onUpload={(file) =>
            updateField('profileImage', URL.createObjectURL(file))
          }
          onDelete={() => updateField('profileImage', '')}
          isError={!!visibleErrors.profileImage}
          helperText={
            visibleErrors.profileImage ??
            '이미지 1개만 업로드할 수 있습니다. (JPG, JPEG, PNG / 최대 10MB)'
          }
          onUploadError={handleUploadError}
        />
      </SponsorFormContainer>

      <AccordionLine
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
            // TODO: 협찬품 등록 페이지 이동
          }}
        />
        <SponsorItemList
          sections={itemSections}
          onSectionsChange={setItemSections}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      </AccordionLine>
    </>
  );
}
