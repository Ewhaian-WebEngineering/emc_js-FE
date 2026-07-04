import { useState } from 'react';
import BottomSheet from './BottomSheet';

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const meta = {
  title: 'Components/BottomSheet',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
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

const ContentArea = () => (
  <div style={{ padding: '16px' }}>
    {Array.from({ length: 10 }).map((_, i) => (
      <p key={i} style={{ marginBottom: '12px' }}>
        스크롤 콘텐츠 {i + 1}
      </p>
    ))}
  </div>
);

export const Normal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button style={buttonStyle} onClick={() => setIsOpen(true)}>
          Normal 열기
        </button>
        <BottomSheet
          variant="normal"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showScrim
        >
          <ContentArea />
        </BottomSheet>
      </>
    );
  },
};

export const Handle = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button style={buttonStyle} onClick={() => setIsOpen(true)}>
          Handle 열기
        </button>
        <BottomSheet
          variant="handle"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultSnap="half"
          showScrim
        >
          <ContentArea />
        </BottomSheet>
      </>
    );
  },
};

export const HandleWithHeader = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button style={buttonStyle} onClick={() => setIsOpen(true)}>
          HandleWithHeader 열기
        </button>
        <BottomSheet
          variant="handleWithHeader"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Title"
          defaultSnap="half"
          onFull={() => {
            setIsOpen(false);
            alert('Full Screen');
          }}
          showScrim
        >
          <ContentArea />
        </BottomSheet>
      </>
    );
  },
};

export const Header = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button style={buttonStyle} onClick={() => setIsOpen(true)}>
          Header 열기
        </button>
        <BottomSheet
          variant="header"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showScrim={false}
        >
          <ContentArea />
        </BottomSheet>
      </>
    );
  },
};
