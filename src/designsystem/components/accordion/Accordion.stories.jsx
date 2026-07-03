import { useState } from 'react';
import AccordionLine from './AccordionLine';

const meta = {
  title: 'Components/Accordion',
  component: AccordionLine,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'md'],
    },
  },
};

export default meta;

function Template({ children, ...args }) {
  const [expanded, setExpanded] = useState(args.expanded ?? false);

  return (
    <div style={{ width: 375 }}>
      <AccordionLine
        {...args}
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
      >
        {children}
      </AccordionLine>
    </div>
  );
}

export const Lg = {
  render: (args) => (
    <Template {...args}>
      <AccordionLine.ContentGuide description="설명영역입니다. 설명영역입니다. 설명영역입니다." />
      <AccordionLine.ActionButton
        buttonText="텍스트 +"
        onClick={() => alert('clicked')}
      />
    </Template>
  ),
  args: {
    title: '아코디언 타이틀 영역',
    required: true,
    size: 'lg',
    expanded: true,
  },
};

export const Md = {
  render: (args) => (
    <Template {...args}>
      <AccordionLine.ContentGuide description="설명영역입니다. 설명영역입니다. 설명영역입니다." />
    </Template>
  ),
  args: {
    title: '아코디언 타이틀 영역',
    subtitle: '2024-01-01',
    size: 'md',
    expanded: true,
  },
};
