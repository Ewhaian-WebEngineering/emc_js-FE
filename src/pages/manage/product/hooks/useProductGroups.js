import { GROUP_OPTIONS } from '../constants/groupOptions';

export function useProductGroups({ groupId, onGroupIdChange }) {
  const selectedGroupOption = GROUP_OPTIONS.find(
    (option) => option.value === groupId,
  );

  const handleSelectGroup = (option) => {
    onGroupIdChange(option.value);
  };

  const handleAddGroup = () => {
    // TODO: 그룹 추가 로직 추가
    alert('그룹 추가');
  };

  const handleDeleteGroup = () => {
    // TODO: 그룹 삭제 로직 추가
    alert('그룹 삭제');
  };

  const handleEditGroup = () => {
    // TODO: 그룹 수정 로직 추가
    alert('그룹 수정');
  };

  return {
    groupOptions: GROUP_OPTIONS,
    selectedGroupOption,
    handleSelectGroup,
    handleAddGroup,
    handleDeleteGroup,
    handleEditGroup,
  };
}
