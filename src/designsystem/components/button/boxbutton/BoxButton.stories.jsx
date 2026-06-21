// BoxButton.stories.jsx
import BoxButton from './BoxButton';

const meta = {
  title: 'Components/BoxButton',
  component: BoxButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const PrimaryLg = {
  args: {
    type: 'primary',
    size: 'lg',
    label: '텍스트',
  },
};

export const PrimaryMd = {
  args: {
    type: 'primary',
    size: 'md',
    label: '텍스트',
  },
};

export const PrimarySm = {
  args: {
    type: 'primary',
    size: 'sm',
    label: '텍스트',
  },
};

export const ErrorLg = {
  args: {
    type: 'error',
    size: 'lg',
    label: '텍스트',
  },
};

export const ErrorMd = {
  args: {
    type: 'error',
    size: 'md',
    label: '텍스트',
  },
};

export const ErrorSm = {
  args: {
    type: 'error',
    size: 'sm',
    label: '텍스트',
  },
};

export const SecondaryLg = {
  args: {
    type: 'secondary',
    size: 'lg',
    label: '텍스트',
  },
};

export const SecondaryMd = {
  args: {
    type: 'secondary',
    size: 'md',
    label: '텍스트',
  },
};

export const SecondarySm = {
  args: {
    type: 'secondary',
    size: 'sm',
    label: '텍스트',
  },
};

export const DisabledLg = {
  args: {
    type: 'primary',
    size: 'lg',
    label: '텍스트',
    disabled: true,
  },
};

export const DisabledMd = {
  args: {
    type: 'primary',
    size: 'md',
    label: '텍스트',
    disabled: true,
  },
};

export const DisabledSm = {
  args: {
    type: 'primary',
    size: 'sm',
    label: '텍스트',
    disabled: true,
  },
};
