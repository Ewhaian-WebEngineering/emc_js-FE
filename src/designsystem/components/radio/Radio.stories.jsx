import { useState } from 'react';
import Radio from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    gap: { control: 'number' },
  },
};

const defaultOptions = [
  { label: '텍스트', value: 'a' },
  { label: '텍스트', value: 'b' },
  { label: '텍스트', value: 'c' },
];

const Template = (args) => {
  const [value, setValue] = useState(args.defaultValue);
  return <Radio {...args} defaultValue={value} onChange={setValue} />;
};

/** 세로 나열 (기본) */
export const Vertical = Template.bind({});
Vertical.args = {
  options: defaultOptions,
  defaultValue: 'a',
  variant: 'vertical',
  gap: 29,
};

/** 가로 나열 */
export const Horizontal = Template.bind({});
Horizontal.args = {
  options: defaultOptions,
  defaultValue: 'a',
  variant: 'horizontal',
  gap: 29,
};
