import { useState } from 'react';
import Scrim from '../scrim/Scrim';
import BoxButton from '../button/boxbutton/BoxButton';
import Select from '../select/Select';
import {
  ModalButtonContainer,
  ModalButtonGroup,
  ModalContainer,
  ModalContent,
} from './style';

/**
 * 알림 또는 입력 폼을 보여주는 Modal 컴포넌트입니다.
 *
 * @param {'confirmation'|'alert'|'form'|'danger'} variant - 모달의 종류
 * @param {string} title - 모달 제목
 * @param {string} [description] - 모달 설명
 * @param {string} [placeholder] - variant가 'form'일 때 Select에 표시할 placeholder
 * @param {*} [defaultValue] - variant가 'form'일 때 Select의 초기 선택 값
 * @param {Array<{label: string, value: *}>} [options] - variant가 'form'일 때 Select의 옵션 목록
 * @param {string} confirmText - 확인 버튼 텍스트
 * @param {string} cancelText - 취소 버튼 텍스트
 * @param {function} [onConfirm] - 확인 버튼 클릭 시 호출되는 함수
 * @param {function} onCancel - 취소 버튼 또는 배경(Scrim) 클릭 시 호출되는 함수
 */
export default function Modal({
  variant,
  title,
  description,
  placeholder,
  defaultValue,
  options,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onDismiss,
}) {
  // 드롭다운
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');

  const handleConfirm = () => {
    onConfirm?.(variant === 'form' ? selectedOption : undefined);
    setSelectedOption('');
  };

  const handleCancel = () => {
    setSelectedOption('');
    onCancel();
  };

  const handleDismiss = () => {
    setSelectedOption('');
    onDismiss();
  };

  return (
    <Scrim onClick={handleDismiss}>
      <ModalContainer>
        <ModalContent>
          <h2>{title}</h2>
          <p>{description}</p>
          {variant === 'form' && (
            <Select
              size="md"
              placeholder={placeholder}
              defaultValue={defaultValue}
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          )}
        </ModalContent>
        <ModalButtonContainer>
          {variant === 'alert' ? (
            <BoxButton variant="secondary" size="md" onClick={handleCancel}>
              {cancelText}
            </BoxButton>
          ) : (
            <ModalButtonGroup>
              <BoxButton variant="secondary" size="md" onClick={handleCancel}>
                {cancelText}
              </BoxButton>
              <BoxButton
                variant={variant === 'danger' ? 'error' : 'primary'}
                size="md"
                onClick={handleConfirm}
              >
                {confirmText}
              </BoxButton>
            </ModalButtonGroup>
          )}
        </ModalButtonContainer>
      </ModalContainer>
    </Scrim>
  );
}
