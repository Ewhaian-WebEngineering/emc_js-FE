import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ position: 'relative', width: '375px', height: '80px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const Default = {};
