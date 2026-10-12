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
import { useProductGroupList } from '@/api/feature/product/useProductData';
import { useBoothDraftStore } from '../store/useBoothDraftStore';
import { buildGroupOptions } from '../utils/buildGroupOptions';
import { useEntityGroups } from '@/hooks/useEntityGroups';
import { useParams } from 'react-router-dom';
import { usePhaseGuard } from '@/hooks/config/usePhaseGuard';

export default function ProductFormScreen({ product, onSubmit, submitLabel }) {
  const { showModal } = useModal();
  const goBack = useGoBack();
  const { boothId } = useParams();

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(
    product?.imageUrl ?? '',
  );
  const [hasSaved, setHasSaved] = useState(false);

  const handleThumbnailUpload = (file) => {
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleThumbnailDelete = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleFormSubmit = async (values) => {
    await onSubmit(values, thumbnailFile);
    setBaseline({ values, thumbnailPreview });
    setHasSaved(true);
  };

  const {
    formValues,
    updateField,
    handleBlur,
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

  const [baseline, setBaseline] = useState(() => ({
    values: formValues,
    thumbnailPreview: product?.imageUrl ?? '',
  }));

  const isDirty =
    JSON.stringify(formValues) !== JSON.stringify(baseline.values) ||
    thumbnailPreview !== baseline.thumbnailPreview;

  const { data: productGroups } = useProductGroupList(boothId);
  const draft = useBoothDraftStore();

  const boothGroupOptions = useMemo(
    () => buildGroupOptions(productGroups ?? [], draft.groups),
    [productGroups, draft.groups],
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
  } = useEntityGroups(boothGroupOptions, productGroups, {
    groupId: formValues.groupId,
    onGroupIdChange: (value) => updateField('groupId', value),
  });

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
      dismissible: false,
      onCancel: () => goBack(),
    });
  };

  const isCreateLabel = submitLabel === 'create' && !hasSaved;

  const { isLocked, guard, canEdit, showLockedModal } = usePhaseGuard();

  const guardBlur =
    (field, onBlur) =>
    (...args) => {
      const original = baseline.values[field];
      if (isLocked && formValues[field] !== original) {
        updateField(field, original);
        showLockedModal();
        return;
      }
      onBlur?.(...args);
    };

  const handleSaveClick = () => {
    const lockedChanged =
      ['name', 'price', 'description', 'groupId'].some(
        (f) => formValues[f] !== baseline.values[f],
      ) || thumbnailPreview !== baseline.thumbnailPreview;

    if (isLocked && lockedChanged) {
      showLockedModal();
      return;
    }
    handleSubmit();
  };

  return (
    <>
      <FillCenterHeader
        onBack={handleBack}
        title="제품"
        right={
          <TextButton
            onClick={handleSaveClick}
            disabled={isProductButtonDisabled || !isDirty}
          >
            {isCreateLabel ? '등록' : '저장'}
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
          onBlur={guardBlur('name')}
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
          onBlur={guardBlur('price', handleBlur('price'))}
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
          onBlur={guardBlur('description')}
          maxLength={24}
          hasError={!!visibleErrors.description}
          helperText={visibleErrors.description}
        />

        <ProductImageUploader
          title="제품 이미지"
          isRequired
          imageUrl={thumbnailPreview}
          onUpload={handleThumbnailUpload}
          onBeforeUpload={canEdit}
          onDelete={guard(handleThumbnailDelete)}
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
            placeholder="그룹 없음"
            showActions
            onChange={guard((option) => handleSelectGroup(option))}
            onDelete={guard(handleDeleteGroup)}
            onEdit={guard(handleEditGroup)}
          />
          <BoxButton
            variant="secondary"
            size="sm"
            onClick={guard(handleAddGroup)}
          >
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
        dismissible={false}
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
