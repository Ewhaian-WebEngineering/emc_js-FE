import useModal from '../../../hooks/modal/useModal';
import { ModalProvider } from './ModalContext';

const OPTIONS = [
  { label: '셀러', value: 'seller' },
  { label: '관리자', value: 'admin' },
];

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const meta = {
  title: 'Components/Modal',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ModalProvider>
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Story />
        </div>
      </ModalProvider>
    ),
  ],
};

export default meta;

export const Confirmation = {
  render: () => {
    const { showModal } = useModal();

    const handleClick = async () => {
      await showModal({
        variant: 'confirmation',
        title: '작성 중인 내용이 있어요.',
        description: '지금 나가면 내용이 저장되지 않아요.',
        confirmText: '계속 작성하기',
        cancelText: '나가기',
      });
    };

    return (
      <button style={buttonStyle} onClick={handleClick}>
        모달 열기
      </button>
    );
  },
};

export const Form = {
  render: () => {
    const { showModal } = useModal();

    const handleClick = async () => {
      await showModal({
        variant: 'form',
        title: '셀러/관리자 인증하기',
        description: '해당하는 항목을 선택하세요.',
        placeholder: '선택하세요',
        options: OPTIONS,
        defaultValue: OPTIONS[0],
        confirmText: '확인',
        cancelText: '취소',
      });
    };

    return (
      <button style={buttonStyle} onClick={handleClick}>
        모달 열기
      </button>
    );
  },
};

export const Alert = {
  render: () => {
    const { showModal } = useModal();

    const handleClick = async () => {
      await showModal({
        variant: 'alert',
        title: '등록에 실패했습니다.',
        description: '잠시 후 다시 시도해주세요.',
        cancelText: '나가기',
      });
    };

    return (
      <button style={buttonStyle} onClick={handleClick}>
        모달 열기
      </button>
    );
  },
};
