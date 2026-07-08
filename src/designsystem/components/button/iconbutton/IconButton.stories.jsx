import IconButton from './IconButton';
import SearchIcon from '@/assets/svg/20px/ic_search.svg?react';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const PrimaryMd = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};

export const PrimarySm = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};

export const SecondaryMd = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};

export const SecondarySm = {
  args: {
    variant: 'secondary',
    size: 'sm',
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};

export const TransparentMd = {
  args: {
    variant: 'transparent',
    size: 'md',
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};

export const TransparentSm = {
  args: {
    variant: 'transparent',
    size: 'sm',
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};

export const Disabled = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};
