import {
  useMyBoothData,
  useProductGroupList,
} from '@/api/feature/booth/useBoothData';
import { MANAGE_ROUTES } from '@/constants/routes';
import useModal from '@/hooks/modal/useModal';
import { useToast } from '@/hooks/toast/useToast';
import { useGoBack } from '@/hooks/useGoBack';
import { useParams } from 'react-router-dom';
import { useBoothDraftStore } from '../store/useBoothDraftStore';
import { useEffect, useMemo, useState } from 'react';
import {
  getSnapshot,
  initDraft,
  restoreGroupsAndProducts,
} from '../store/boothDraftStore';
import { buildGroupOptions } from '../utils/buildGroupOptions';
import { InfiniteScrollLoader } from '@/components/common/style';
import Spinner from '@/designsystem/components/spinner/Spinner';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import { useEntityGroups } from '@/hooks/useEntityGroups';
import {
  ProductAddSheetBody,
  ProductAddSheetBottom,
  ProductFormSection,
  ProductGroupFormContainer,
} from './style';
import SelectItem from '@/designsystem/components/select/SelectItem';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import BottomSheet from '@/designsystem/components/bottomsheet/BottomSheet';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';

const EMPTY = [];
const noop = () => {};

export default function ProductGroupManageScreen() {
  const { boothId } = useParams();
  const goBack = useGoBack(MANAGE_ROUTES.BOOTH_EDIT(boothId));
  const { showModal } = useModal();
  const { toast } = useToast();
  const { data: booth, isPending } = useMyBoothData(boothId);
  const { data: productGroups } = useProductGroupList(boothId);
  const draft = useBoothDraftStore();

  const [saved, setSaved] = useState(null);

  useEffect(() => {
    if (!booth || saved) return;
    initDraft(boothId, booth);
    const { groups, products } = getSnapshot();
    setSaved({ groups, products });
  }, [booth, boothId, saved]);

  const isDirty =
    saved !== null &&
    (draft.groups !== saved.groups || draft.products !== saved.products);

  const boothGroupOptions = useMemo(
    () => buildGroupOptions(productGroups ?? EMPTY, draft.groups),
    [productGroups, draft.groups],
  );

  const {
    groupOptions,
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
    groupId: null,
    onGroupIdChange: noop,
  });

  const handleSave = () => {
    setSaved({ groups: draft.groups, products: draft.products });
    toast({ message: '변경사항이 저장되었어요.' });
  };

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
        restoreGroupsAndProducts(saved);
        goBack();
      },
    });
  };

  if (isPending) {
    return (
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    );
  }

  return (
    <>
      <FillCenterHeader
        onBack={handleBack}
        title="그룹 설정하기"
        border
        right={
          <TextButton onClick={handleSave} disabled={!isDirty}>
            저장
          </TextButton>
        }
      />

      <ProductGroupFormContainer>
        <ProductFormSection>
          {groupOptions.map((option) => (
            <SelectItem
              key={option.value ?? 'no-group'}
              label={option.label}
              selected={false}
              showActions={!option.hideActions}
              onClick={noop}
              onDelete={() => handleDeleteGroup(option)}
              onEdit={() => handleEditGroup(option)}
            />
          ))}
        </ProductFormSection>

        <BoxButton variant="secondary" size="sm" onClick={handleAddGroup}>
          그룹 추가하기
        </BoxButton>
      </ProductGroupFormContainer>

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
