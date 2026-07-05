import ToolTip from './ToolTip';
import {
  CONGESTION_TOOLTIP,
  VISITOR_TOOLTIP,
  SCRAP_TOOLTIP,
} from '@/constants/toolTip';

const meta = {
  title: 'Components/ToolTip',
  component: ToolTip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Congestion = {
  args: { content: CONGESTION_TOOLTIP },
};

export const Visitor = {
  args: { content: VISITOR_TOOLTIP },
};

export const Scrap = {
  args: { content: SCRAP_TOOLTIP },
};
