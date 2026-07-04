import DatePicker from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    label: '기간 설정',
    required: true,
  },
};

export const NotRequired = {
  args: {
    label: '기간 설정',
    required: false,
    value: { start: null, end: null },
  },
};

export const Filled = {
  args: {
    label: '기간 설정',
    required: true,
    value: {
      start: new Date(2026, 10, 12),
      end: new Date(2026, 10, 12),
    },
  },
};

export const Disabled = {
  args: {
    label: '기간 설정',
    required: true,
    disabled: true,
    value: { start: null, end: null },
  },
};

export const DisabledFilled = {
  args: {
    label: '기간 설정',
    required: true,
    disabled: true,
    value: {
      start: new Date(2026, 10, 12),
      end: new Date(2026, 10, 12),
    },
  },
};

export const ErrorEmpty = {
  args: {
    label: '기간 설정',
    required: true,
    externalError: '날짜를 모두 선택해주세요.',
    value: { start: null, end: null },
  },
};

export const ErrorFilled = {
  args: {
    label: '기간 설정',
    required: true,
    externalError: '이미 예약된 기간이에요.',
    value: {
      start: new Date(2026, 10, 12),
      end: new Date(2026, 10, 15),
    },
  },
};
