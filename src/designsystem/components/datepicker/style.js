import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';
import { css } from '@emotion/react';
import { shadow } from '@/designsystem/tokens/shadow';

const BORDER_BY_STATE = {
  default: semantic.borderNormalNormal,
  focus: semantic.borderPrimaryNormal,
  filled: semantic.borderNormalNormal,
  disabled: semantic.borderNormalNormal,
  error: semantic.statusDanger,
  errorEmpty: semantic.statusDanger,
};

const TEXT_BY_STATE = {
  default: semantic.textNormalAssistive,
  focus: semantic.textNormalNormal,
  filled: semantic.textNormalNormal,
  disabled: semantic.textNormalAssistive,
  error: semantic.textNormalNormal,
  errorEmpty: semantic.textNormalAssistive,
};

export const DateField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 44px;
  padding: ${measurement.spacing12} ${measurement.spacing16};

  border: ${measurement.borderWidthSm} solid
    ${({ state }) => BORDER_BY_STATE[state]};
  border-radius: ${measurement.borderRadiusLg};
  background-color: ${semantic.fillNormalWhite};

  ${({ state }) =>
    state === 'disabled' &&
    css`
      background: ${semantic.fillInteractionDisabled};
      cursor: not-allowed;
    `}
`;

export const DateInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;

  ${typography.body2Medium}
  color: ${({ state }) => TEXT_BY_STATE[state]};

  &::placeholder {
    color: ${semantic.textNormalAssistive};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const DateButton = styled.button`
  display: flex;
  color: ${semantic.iconNormalAssistive};
  flex-shrink: 0;
  margin-left: ${measurement.spacing4};
  background: transparent;
  border: none;
`;

export const DateFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const DatePickerLabel = styled.label`
  ${typography.body1Semibold}
  color: ${semantic.textNormalNormal};
  gap: ${measurement.spacing4};
  display: flex;

  span {
    color: ${semantic.statusDanger};
  }
`;

export const DatePickerFieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const DatePickerSeparator = styled.div`
  width: 8px;
  height: ${measurement.borderWidthSm};
  background-color: ${semantic.borderNormalStrong};
`;

export const DatePickerAnchor = styled.div`
  position: relative;
`;

export const CalendarPopOver = styled.div`
  position: absolute;
  top: calc(100% + ${measurement.spacing8});
  left: 0;
  z-index: 100;
  width: 100%;
`;

export const DatePickerErrorText = styled.div`
  ${typography.caption1Regular}
  color: ${semantic.statusDanger};
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing20};
  gap: ${measurement.spacing4};
  border-radius: ${measurement.borderRadiusXl};
  background-color: ${semantic.fillNormalWhite};
  box-shadow: ${shadow.shadowStrong};
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarYearLabel = styled.span`
  ${typography.headline2Semibold}
  color: ${semantic.textNormalStrong};
`;

export const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing16};
`;

export const CalendarNavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;

  border: none;
  background: transparent;
  cursor: pointer;

  color: ${semantic.secondaryPinkDefault};
  padding-block: ${measurement.spacing2};
  gap: ${measurement.spacing16};
`;

export const CalendarMonthLabel = styled.span`
  ${typography.headline1Semibold}
  color: ${semantic.textNormalStrong};
`;

export const CalendarWeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const CalendarWeekday = styled.div`
  ${typography.body2Semibold}
  color: ${semantic.textNormalAssistive};
  text-align: center;
  padding-block: 10px;
`;

export const CalendarDayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 10px;
`;

export const CalendarDayCell = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  position: relative;
  margin: 0 auto;
  border: none;
  border-radius: ${measurement.borderRadiusRounded};
  background: transparent;

  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  ${typography.headline1Medium}

  ${({ isOutsideMonth }) =>
    isOutsideMonth &&
    css`
      color: ${semantic.textNormalAssistive};
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${semantic.secondaryPinkDefault};
      color: ${semantic.textNormalInverse};
    `}
  
  ${({ isSelected, isOutsideMonth }) =>
    !isSelected &&
    !isOutsideMonth &&
    css`
      color: ${semantic.textNormalStrong};
    `}
`;
