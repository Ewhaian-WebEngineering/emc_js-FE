import { useState } from 'react';
import Search from './Search';

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Search
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={() => setValue('')}
      />
    );
  },
};
