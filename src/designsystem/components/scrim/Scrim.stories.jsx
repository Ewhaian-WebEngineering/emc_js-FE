import { useState } from 'react';
import Scrim from './Scrim';

const meta = {
  title: 'Components/Scrim',
  component: Scrim,
  parameters: {
    layout: 'fullscreen',
  },
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

export const Default = {
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
          Scrim 열기
        </button>
        {open && (
          <Scrim {...args} onClick={() => setOpen(false)}>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '32px 24px',
                width: 320,
                textAlign: 'center',
              }}
            >
              배경 클릭 시 닫힙니다
            </div>
          </Scrim>
        )}
      </>
    );
  },
};

export const NonDismissible = {
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
          Scrim 열기
        </button>
        {open && (
          <Scrim>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '32px 24px',
                width: 320,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
              {...args}
            >
              <p>배경 클릭으로 닫히지 않습니다</p>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => setOpen(false)}
              >
                확인
              </button>
            </div>
          </Scrim>
        )}
      </>
    );
  },
};
