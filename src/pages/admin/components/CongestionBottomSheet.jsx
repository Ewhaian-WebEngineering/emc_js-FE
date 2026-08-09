import { useState, useEffect } from 'react';
import BottomSheet from '@/designsystem/components/bottomsheet/BottomSheet';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import { CONGESTION_LEVEL } from '@/constants/congestionLevel';
import SelectItem from '@/designsystem/components/select/SelectItem.jsx';
import { CongestionListWrapper, CongestionButtonWrapper } from './style.js';

/**
 * 혼잡도를 선택/저장하는 바텀시트 컴포넌트
 *
 * @param {boolean} isOpen - 바텀시트 열림 여부
 * @param {function} onClose - 바텀시트 닫기 이벤트 핸들러
 * @param {string} [value] - 현재 선택된 혼잡도 값 (CONGESTION_LEVEL의 key: crowded | normal | relaxed)
 * @param {function} onSave - 저장하기 클릭 시 호출되는 함수, 선택된 값을 인자로 전달
 */

export default function CongestionBottomSheet({
  isOpen,
  onClose,
  value,
  onSave,
}) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    if (isOpen) {
      setSelected(value);
    }
  }, [isOpen, value]);

  const isChanged = selected !== value;

  const handleSave = () => {
    if (!isChanged) return;
    onSave?.(selected);
    onClose();
  };

  return (
    <BottomSheet
      variant="header"
      isOpen={isOpen}
      onClose={onClose}
      title="혼잡도"
    >
      <CongestionListWrapper>
        {Object.entries(CONGESTION_LEVEL).map(([key, { label }]) => (
          <SelectItem
            key={key}
            label={label}
            size="lg"
            selected={selected === key}
            onClick={() => setSelected(key)}
          />
        ))}
      </CongestionListWrapper>

      <CongestionButtonWrapper>
        <BoxButton
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={!isChanged}
        >
          저장하기
        </BoxButton>
      </CongestionButtonWrapper>
    </BottomSheet>
  );
}
