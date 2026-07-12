import { useState } from 'react';
import TextInput from './TextInput';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    placeholder: '내용을 입력해 주세요.',
    maxLength: 1000,
    disabled: false,
    hasError: false,
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
    <TextInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = {
  render: Template,
  args: {
    isPassword: true,
    placeholder: '관리자 코드을 입력해 주세요.',
  },
};
