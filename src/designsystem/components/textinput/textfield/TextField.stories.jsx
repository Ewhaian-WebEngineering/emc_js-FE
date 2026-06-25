import { useState } from 'react';
import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: '제목',
    placeholder: '내용을 입력해 주세요.',
    helperText: '텍스트 도움말',
    maxLength: 1000,
    required: false,
    disabled: false,
    hasError: false,
    description: '부연 설명',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template = (args) => {
  const [value, setValue] = useState('');
  return (
    <TextField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = {
  render: Template,
};

export const Required = {
  render: Template,
  args: { required: true },
};

export const Error = {
  render: Template,
  args: { required: true, hasError: true, helperText: '에러 메시지' },
};

export const Disabled = {
  render: (args) => <TextField {...args} value="내용 입력" />,
  args: { disabled: true },
};
