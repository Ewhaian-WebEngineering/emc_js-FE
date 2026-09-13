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

export default function SponsorFormScreen({ sponsor, onSubmit, submitLabel }) {
  const { showModal } = useModal();
  const goBack = useGoBack();
  const navigate = useNavigate();

  const { sponsorId } = useParams();

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
  } = useSponsorItemSections(sponsor, sponsorId);

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
        onUpload={(file) => updateField('profileImage', file)}
        onDelete={() => updateField('profileImage', null)}
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
          value={formValues.location}
          disabled
        />

        <CategoryLabel
          title="운영 시간"
          options={BOOTH_CATEGORY_OPTIONS.operatingTime}
          selected={formValues.operationTime}
          onChange={(value) => updateField('operationTime', value)}
          hasError={!!visibleErrors.operationTime}
          helperText={visibleErrors.operationTime}
        />

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
          onUpload={(file) => updateField('profileImage', file)}
          onDelete={() => updateField('profileImage', null)}
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
            navigate(ADMIN_ROUTES.SPONSOR_ITEM_CREATE(sponsorId));
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
