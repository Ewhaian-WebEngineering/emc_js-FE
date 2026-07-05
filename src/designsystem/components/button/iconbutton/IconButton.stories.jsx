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
    type: 'primary',
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
    type: 'primary',
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
    type: 'secondary',
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
    type: 'secondary',
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
    type: 'transparent',
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
    type: 'transparent',
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
    type: 'primary',
    size: 'md',
    disabled: true,
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};
