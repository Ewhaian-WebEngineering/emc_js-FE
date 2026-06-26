import { useState } from 'react';
import Select from './Select';

const OPTIONS = [
  { label: '항목 1', value: 'item1' },
  { label: '항목 2', value: 'item2' },
  { label: '항목 3', value: 'item3' },
  { label: '항목 4', value: 'item4' },
  { label: '항목 5', value: 'item5' },
  { label: '항목 6', value: 'item6' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options: OPTIONS,
    placeholder: '선택하세요',
  },
};

export default meta;

export const DefaultMd = {
  args: {
    size: 'md',
  },
};

export const DefaultSm = {
  args: {
    size: 'sm',
  },
};

export const WithDefaultValueMd = {
  args: {
    size: 'md',
    defaultValue: { label: '항목 1', value: 'item1' },
  },
};

export const WithDefaultValueSm = {
  args: {
    size: 'sm',
    defaultValue: { label: '항목 1', value: 'item1' },
  },
};

export const ErrorMd = {
  render: (args) => {
    const [error, setError] = useState(true);

    return (
      <Select
        {...args}
        error={error}
        onChange={(option) => {
          setError(false);
          args.onChange?.(option);
        }}
        defaultValue={{ label: '항목 1', value: 'item1' }}
      />
    );
  },
  args: {
    size: 'md',
  },
};

export const ErrorSm = {
  render: (args) => {
    const [error, setError] = useState(true);

    return (
      <Select
        {...args}
        error={error}
        onChange={(option) => {
          setError(false);
          args.onChange?.(option);
        }}
      />
    );
  },
  args: {
    size: 'sm',
  },
};

export const DisabledMd = {
  args: {
    size: 'md',
    disabled: true,
  },
};

export const DisabledSm = {
  args: {
    size: 'sm',
    disabled: true,
  },
};

export const DisabledWithValueMd = {
  args: {
    size: 'md',
    disabled: true,
    defaultValue: { label: '항목 1', value: 'item1' },
  },
};

export const DisabledWithValueSm = {
  args: {
    size: 'sm',
    disabled: true,
    defaultValue: { label: '항목 1', value: 'item1' },
  },
};

export const WithDisabledOptions = {
  args: {
    size: 'md',
    options: [
      { label: '항목 1', value: 'item1' },
      { label: '항목 2', value: 'item2', disabled: true },
      { label: '항목 3', value: 'item3' },
      { label: '항목 4', value: 'item4', disabled: true },
      { label: '항목 5', value: 'item5' },
    ],
  },
};

export const WithActionsMd = {
  render: (args) => {
    const [options, setOptions] = useState(OPTIONS);

    return (
      <Select
        {...args}
        options={options}
        showActions
        onDelete={(option) => {
          setOptions((prev) => prev.filter((o) => o.value !== option.value));
        }}
        onEdit={(option) => {
          alert(`수정: ${option.label}`);
        }}
      />
    );
  },
  args: {
    size: 'md',
  },
};
