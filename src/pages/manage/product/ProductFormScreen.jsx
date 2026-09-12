import { useMemo, useState } from 'react';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useProductForm } from './hooks/useProductForm';
import {
  ProductAddSheetBody,
  ProductAddSheetBottom,
  ProductFormContainer,
  ProductFormOptions,
  ProductFormSection,
  ProductFormTitle,
} from './style';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import { STATUS_OPTIONS } from './constants/status';
import Tag from '@/designsystem/components/tag/Tag';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import ProductImageUploader from '@/designsystem/components/fileuploader/ProductImageUploader';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import Select from '@/designsystem/components/select/Select';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import BottomSheet from '@/designsystem/components/bottomsheet/BottomSheet';
import { useMyBoothData } from '@/api/feature/booth/useBoothData';
import { useBoothDraftStore } from '../store/useBoothDraftStore';
import { buildGroupOptions } from '../utils/buildGroupOptions';
import { useEntityGroups } from '@/hooks/useEntityGroups';

export default function ProductFormScreen({ product, onSubmit, submitLabel }) {
  const { showModal } = useModal();
  const goBack = useGoBack();

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(
    product?.imageUrl ?? '',
  );

  const handleThumbnailUpload = (file) => {
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleThumbnailDelete = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleFormSubmit = (values) => onSubmit(values, thumbnailFile);

  const {
    formValues,
    updateField,
    visibleErrors,
    isButtonDisabled: isProductButtonDisabled,
    handleSubmit,
    handleUploadError,
  } = useProductForm({
    product,
    submitLabel,
    onSubmit: handleFormSubmit,
    hasThumbnail: !!thumbnailPreview,
  });

  const { data: booth } = useMyBoothData();
  const draft = useBoothDraftStore();

  const boothGroupOptions = useMemo(
    () => buildGroupOptions(booth?.productGroups ?? [], draft.groups),
    [booth?.productGroups, draft.groups],
  );

  const {
    groupOptions,
    selectedGroupOption,
    handleSelectGroup,
    handleAddGroup,
    handleDeleteGroup,
    handleEditGroup,
    isEditMode,
    isGroupSheetOpen,
    handleCloseGroupSheet,
    handleCheckBeforeClose,
    newGroup,
    updateNewGroupField,
    isButtonDisabled: isGroupButtonDisabled,
    groupNameError,
    handleConfirmAddGroup,
  } = useEntityGroups(boothGroupOptions, {
    groupId: formValues.groupId,
    onGroupIdChange: (value) => updateField('groupId', value),
  });

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

  return (
    <>
      <FillCenterHeader
        onBack={handleBack}
        title="제품"
        right={
          <TextButton onClick={handleSubmit} disabled={isProductButtonDisabled}>
            {submitLabel === 'create' ? '등록' : '저장'}
          </TextButton>
        }
        border
      />
      <ProductFormContainer>
        <TextField
          title="제품 이름"
          required
          placeholder="제품 이름을 입력해주세요."
          value={formValues.name}
          onChange={(value) => updateField('name', value)}
          maxLength={10}
          hasError={!!visibleErrors.name}
          helperText={visibleErrors.name}
        />

        <TextField
          title="가격 설정"
          required
          placeholder="예) 999,999원"
          value={formValues.price}
          onChange={(value) => updateField('price', value)}
          hasError={!!visibleErrors.price}
          helperText={visibleErrors.price}
        />

        <ProductFormSection>
          <ProductFormTitle>
            판매 여부
            <span>*</span>
          </ProductFormTitle>
          <ProductFormOptions>
            {STATUS_OPTIONS.map((option) => (
              <Tag
                key={String(option.value)}
                label={option.label}
                selected={formValues.isOnSale === option.value}
                onClick={() => updateField('isOnSale', option.value)}
              />
            ))}
          </ProductFormOptions>
        </ProductFormSection>

        <TextArea
          title="제품 설명"
          required
          placeholder="제품의 특징과 구성, 구매 포인트를 간단하게 작성해주세요."
          value={formValues.description}
          onChange={(value) => updateField('description', value)}
          maxLength={24}
          hasError={!!visibleErrors.description}
          helperText={visibleErrors.description}
        />

        <ProductImageUploader
          title="제품 이미지"
          isRequired
          imageUrl={thumbnailPreview}
          onUpload={handleThumbnailUpload}
          onDelete={handleThumbnailDelete}
          isError={!!visibleErrors.thumbnail}
          helperText={
            visibleErrors.thumbnail ??
            '이미지 1개만 업로드할 수 있습니다. (JPG, JPEG, PNG / 최대 10MB)'
          }
          onUploadError={handleUploadError}
        />

        <ProductFormSection>
          <ProductFormTitle>
            제품 그룹 설정
            <span>*</span>
          </ProductFormTitle>
          <Select
            options={groupOptions}
            value={selectedGroupOption}
            onChange={(option) => handleSelectGroup(option)}
            placeholder="그룹 없음"
            showActions
            onDelete={handleDeleteGroup}
            onEdit={handleEditGroup}
          />
          <BoxButton variant="secondary" size="sm" onClick={handleAddGroup}>
            그룹 추가하기
          </BoxButton>
        </ProductFormSection>
      </ProductFormContainer>

      <BottomSheet
        variant="header"
        isOpen={isGroupSheetOpen}
        onClose={handleCloseGroupSheet}
        onBeforeClose={handleCheckBeforeClose}
        title={isEditMode ? '제품 그룹 수정' : '제품 그룹 추가'}
      >
        <ProductAddSheetBody>
          <TextField
            title="그룹 이름"
            required
            placeholder="예) 구움과자류"
            maxLength={20}
            value={newGroup.name}
            onChange={(value) => updateNewGroupField('name', value)}
            hasError={!!groupNameError}
            helperText={groupNameError}
          />

          <TextArea
            title="그룹 설명"
            placeholder="예) 버터와 밀가루를 기반으로 구워낸 쿠키, 마들렌, 스콘 등 다양한 구움과자를 모아둔 카테고리입니다."
            maxLength={50}
            value={newGroup.description}
            onChange={(value) => updateNewGroupField('description', value)}
          />
        </ProductAddSheetBody>

        <ProductAddSheetBottom>
          <BoxButton
            variant="primary"
            size="lg"
            onClick={handleConfirmAddGroup}
            disabled={isGroupButtonDisabled}
          >
            {isEditMode ? '수정하기' : '추가하기'}
          </BoxButton>
        </ProductAddSheetBottom>
      </BottomSheet>
    </>
  );
}
