import Tab from './Tab';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'categoryFilter'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const TwoTabs = {
  args: {
    tabs: [
      {
        label: '소개',
        content: <div style={{ padding: 16 }}>소개 영역</div>,
      },
      {
        label: '제품 목록',
        content: <div style={{ padding: 16 }}>제품 목록 영역</div>,
      },
    ],
  },
};

export const ThreeTabs = {
  args: {
    tabs: [
      {
        label: '제품목록',
        content: <div style={{ padding: 16 }}>제품목록 영역</div>,
      },
      {
        label: '안내사항',
        content: <div style={{ padding: 16 }}>안내사항 영역</div>,
      },
      {
        label: '고객문의',
        content: <div style={{ padding: 16 }}>고객문의 영역</div>,
      },
    ],
  },
};

export const EightTabs = {
  args: {
    variant: 'categoryFilter',
    tabs: [
      {
        label: '전체',
        content: <div style={{ padding: 16 }}>전체 영역</div>,
      },
      {
        label: '비건',
        content: <div style={{ padding: 16 }}>비건 영역</div>,
      },
      {
        label: '친환경',
        content: <div style={{ padding: 16 }}>친환경 영역</div>,
      },
      {
        label: '수제먹거리',
        content: <div style={{ padding: 16 }}>수제먹거리 영역</div>,
      },
      {
        label: '패션/뷰티',
        content: <div style={{ padding: 16 }}>패션/뷰티 영역</div>,
      },
      {
        label: '공예',
        content: <div style={{ padding: 16 }}>공예 영역</div>,
      },
      {
        label: '문구류',
        content: <div style={{ padding: 16 }}>문구류 영역</div>,
      },
      {
        label: '시연/퍼포먼스',
        content: <div style={{ padding: 16 }}>시연/퍼포먼스 영역</div>,
      },
    ],
  },
};
