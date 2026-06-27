import { useState } from 'react';
import Modal from './Modal';

const OPTIONS = [
  { label: '셀러', value: 'seller' },
  { label: '관리자', value: 'admin' },
];

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Confirmation = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        >
          모달 열기
        </button>
        {open && (
          <Modal
            {...args}
            variant="confirmation"
            title="작성 중인 내용이 있어요."
            description="지금 나가면 내용이 저장되지 않아요."
            confirmText="계속 작성하기"
            cancelText="나가기"
            onConfirm={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </>
    );
  },
};

export const Form = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        >
          모달 열기
        </button>
        {open && (
          <Modal
            {...args}
            variant="form"
            title="셀러/관리자 인증하기"
            description="해당하는 항목을 선택하세요."
            placeholder="선택하세요"
            options={OPTIONS}
            confirmText="확인"
            cancelText="취소"
            onConfirm={(value) => {
              console.log('선택값:', value);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        )}
      </>
    );
  },
};

export const Alert = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        >
          모달 열기
        </button>
        {open && (
          <Modal
            {...args}
            variant="alert"
            title="등록에 실패했습니다."
            description="잠시 후 다시 시도해주세요."
            cancelText="나가기"
            onCancel={() => setOpen(false)}
          />
        )}
      </>
    );
  },
};
