import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useProductForm } from './hooks/useProductForm';
import {
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
import { useProductGroups } from './hooks/useProductGroups';

export default function ProductFormScreen({ product, onSubmit, submitLabel }) {
  const {
    isCreateMode,
    formValues,
    updateField,
    isSubmitting,
    isSubmittable,
    fieldErrors,
    visibleErrors,
    handleSubmit,
  } = useProductForm({ product, submitLabel, onSubmit });

  const {
    groupOptions,
    selectedGroupOption,
    handleSelectGroup,
    handleAddGroup,
    handleDeleteGroup,
    handleEditGroup,
  } = useProductGroups({
    groupId: formValues.groupId,
    onGroupIdChange: (value) => updateField('groupId', value),
  });

  const handleBack = () => {
    // TODO: 뒤로가기 모달 추가
    alert('go back');
  };

  return (
    <>
      <FillCenterHeader
        onBack={handleBack}
        title="제품"
        right={
          <TextButton
            onClick={handleSubmit}
            disabled={
              isCreateMode ? !isSubmittable || isSubmitting : isSubmitting
            }
          >
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
                key={option.value}
                label={option.label}
                selected={formValues.status === option.value}
                onClick={() => updateField('status', option.value)}
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
          imageUrl={formValues.thumbnail}
          onUpload={(file) =>
            updateField('thumbnail', URL.createObjectURL(file))
          }
          onDelete={() => updateField('thumbnail', '')}
          isError={!!visibleErrors.thumbnail}
          helperText={
            visibleErrors.thumbnail ??
            '이미지 1개만 업로드할 수 있습니다. (JPG, JPEG, PNG / 최대 10MB)'
          }
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
    </>
  );
}
