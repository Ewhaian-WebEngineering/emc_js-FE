import { useState } from 'react';
import HomeHeader from './HomeHeader';
import FillRightHeader from './FillRightHeader';
import SearchHeader from './SearchHeader';
import FillCenterHeader from './FillCenterHeader';
import TransparentHeader from './TransparentHeader';
import TextButton from '../button/textbutton/TextButton';
import CloseIcon from '@/assets/svg/28px/ic_close.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { layout } from '@/designsystem/tokens/layout';

const meta = {
  title: 'Components/Header',
  component: HomeHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '375px', paddingInline: layout.containerPadding }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Home = {
  render: (args) => <HomeHeader {...args} />,
  args: {
    onSearchClick: () => alert('검색 클릭'),
  },
};

export const FillRight = {
  render: (args) => <FillRightHeader {...args} />,
  args: {
    title: 'Title',
    right: (
      <CloseIcon
        onClick={() => alert('닫기 클릭')}
        color={semantic.iconNormalNormal}
      />
    ),
  },
};

export const Search = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <SearchHeader
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={() => setValue('')}
        onSearch={() => alert(`검색어: ${value}`)}
      />
    );
  },
  args: {
    onBack: () => alert('뒤로가기 클릭'),
  },
};

export const FillCenterWithClose = {
  render: (args) => <FillCenterHeader {...args} />,
  args: {
    onBack: () => alert('뒤로가기 클릭'),
    title: 'Title',
    right: (
      <CloseIcon
        onClick={() => alert('닫기 클릭')}
        color={semantic.iconNormalNormal}
      />
    ),
  },
};

export const FillCenterWithSave = {
  render: (args) => <FillCenterHeader {...args} />,
  args: {
    onBack: () => alert('뒤로가기 클릭'),
    title: 'Title',
    right: (
      <TextButton
        variant="primary"
        size="sm"
        onClick={() => alert('저장 클릭')}
      >
        저장
      </TextButton>
    ),
  },
};

export const FillCenterEmpty = {
  render: (args) => <FillCenterHeader {...args} />,
  args: {
    onBack: () => alert('뒤로가기 클릭'),
    title: 'Title',
  },
};

export const FillCenterNoBack = {
  render: (args) => <FillCenterHeader {...args} />,
  args: {
    title: 'Title',
    right: (
      <CloseIcon
        onClick={() => alert('닫기 클릭')}
        color={semantic.iconNormalNormal}
      />
    ),
  },
};

export const Transparent = {
  render: (args) => <TransparentHeader {...args} />,
  args: {
    onBack: () => alert('뒤로가기 클릭'),
    title: 'Title',
    right: (
      <CloseIcon
        onClick={() => alert('닫기 클릭')}
        color={semantic.iconNormalInverse}
      />
    ),
  },
};
