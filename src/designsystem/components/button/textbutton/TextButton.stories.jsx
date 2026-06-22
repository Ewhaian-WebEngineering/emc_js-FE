import TextButton from './TextButton';

const meta = {
  title: 'Components/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const PrimaryMd = {
  args: {
    type: 'primary',
    size: 'md',
    children: '텍스트',
  },
};

export const PrimarySm = {
  args: {
    type: 'primary',
    size: 'sm',
    children: '텍스트',
  },
};

export const PrimaryXs = {
  args: {
    type: 'primary',
    size: 'xs',
    children: '텍스트',
  },
};

export const SecondaryMd = {
  args: {
    type: 'secondary',
    size: 'md',
    children: '텍스트',
  },
};

export const SecondarySm = {
  args: {
    type: 'secondary',
    size: 'sm',
    children: '텍스트',
  },
};

export const SecondaryXs = {
  args: {
    type: 'secondary',
    size: 'xs',
    children: '텍스트',
  },
};

export const DisabledMd = {
  args: {
    type: 'primary',
    size: 'md',
    children: '텍스트',
    disabled: true,
  },
};

export const DisabledSm = {
  args: {
    type: 'primary',
    size: 'sm',
    children: '텍스트',
    disabled: true,
  },
};

export const DisabledXs = {
  args: {
    type: 'primary',
    size: 'xs',
    children: '텍스트',
    disabled: true,
  },
};
