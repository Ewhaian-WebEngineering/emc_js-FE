import { ToastProvider, useToastContext } from './ToastContext';
import { ToastContainer } from './ToastContainer';

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastContainer />
      </ToastProvider>
    ),
  ],
};

export default meta;

function ToastTrigger({ message, action }) {
  const { toast } = useToastContext();

  return (
    <button
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={() => toast({ message, action })}
    >
      토스트
    </button>
  );
}

export const Default = {
  render: () => <ToastTrigger message="저장됐어요." />,
};

export const WithAction = {
  render: () => (
    <ToastTrigger
      message="스크랩했어요."
      action={{
        label: '바로가기',
        onClick: () => alert('이동!'),
      }}
    />
  ),
};
