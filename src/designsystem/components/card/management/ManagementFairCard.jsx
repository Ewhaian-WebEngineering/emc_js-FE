import ArrowRightIcon from '../../../../assets/svg/16px/ic_arrow_right.svg?react';
import ChartIcon from '../../../../assets/svg/24px/ic_chart_bar.svg?react';
import PeopleIcon from '../../../../assets/svg/24px/ic_people.svg?react';
import Divider from '../../divider/Divider';
import ManagementStatRow from './ManagementStatRow';
import { semantic } from '../../../tokens/semantic';
import {
  ManagementFairCardContainer,
  ManagementFairCardHeader,
  ManagementFairCardLink,
  ManagementFairCardStats,
} from './style';
import {
  CONGESTION_TOOLTIP,
  VISITOR_TOOLTIP,
} from '../../../../constants/tooltip';

export default function ManagementFairCard({
  onLinkClick,
  congestionLevel,
  onCongestionClick,
  visitorCount,
}) {
  return (
    <ManagementFairCardContainer>
      <ManagementFairCardHeader>종합손물세트 14th</ManagementFairCardHeader>
      <ManagementFairCardLink onClick={onLinkClick}>
        바로가기
        <ArrowRightIcon />
      </ManagementFairCardLink>
      <ManagementFairCardStats>
        <ManagementStatRow
          icon={<ChartIcon color={semantic.statusDanger} />}
          label="현재 혼잡도"
          tooltip={CONGESTION_TOOLTIP}
          value={congestionLevel}
          valueColor={semantic.statusDanger}
          onActionClick={onCongestionClick}
        />
        <Divider size="sm" />
        <ManagementStatRow
          icon={<PeopleIcon color={semantic.fillPrimaryNormal} />}
          label="방문자 수"
          tooltip={VISITOR_TOOLTIP}
          value={visitorCount}
          valueColor={semantic.textNormalStrong}
        />
      </ManagementFairCardStats>
    </ManagementFairCardContainer>
  );
}
