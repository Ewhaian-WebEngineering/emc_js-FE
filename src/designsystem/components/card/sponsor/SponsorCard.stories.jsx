import SponsorCard from './SponsorCard';

const meta = {
  title: 'Components/SponsorCard',
  component: SponsorCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '343px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    sponsorName:
      '협찬사 이름 영역입니다. 협찬사 이름 영역입니다. 협찬사 이름 영역입니다.',
    sponsorDescription:
      '협찬사 소개글 최대 2줄입니다. 협찬사 소개글 최대 2줄입니다. 협찬사 소개글 최대 2줄입니다. 협찬사 소개글 최대 2줄입니다.',
    thumbnails: ['', '', ''],
  },
};
