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
    type: 'sorting',
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
        type="notice"
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
        type="button"
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
};
