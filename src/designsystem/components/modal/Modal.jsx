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
  options,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  // 드롭다운
  const [selectedOption, setSelectedOption] = useState('');

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
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          )}
        </ModalContent>
        <ModalButtonContainer>
          {variant === 'alert' ? (
            <BoxButton type="secondary" size="md" onClick={handleCancel}>
              {cancelText}
            </BoxButton>
          ) : (
            <ModalButtonGroup>
              <BoxButton type="secondary" size="md" onClick={handleCancel}>
                {cancelText}
              </BoxButton>
              <BoxButton type="primary" size="md" onClick={handleConfirm}>
                {confirmText}
              </BoxButton>
            </ModalButtonGroup>
          )}
        </ModalButtonContainer>
      </ModalContainer>
    </Scrim>
  );
}
