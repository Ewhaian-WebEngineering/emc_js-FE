import { useState } from 'react';
import Tag from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Sorting = {
  args: {
    label: '태그',
    variant: 'sorting',
    onDelete: () => {
      alert('delete');
    },
  },
};

export const Notice = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Tag
        label="태그"
        variant="notice"
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
};

export const Button = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Tag
        label="태그"
        variant="button"
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
};
