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

  return (
    <Scrim onClick={handleCancel}>
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
              <BoxButton variant="primary" size="md" onClick={handleConfirm}>
                {confirmText}
              </BoxButton>
            </ModalButtonGroup>
          )}
        </ModalButtonContainer>
      </ModalContainer>
    </Scrim>
  );
}
