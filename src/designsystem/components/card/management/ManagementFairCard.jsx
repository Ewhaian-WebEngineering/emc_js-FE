import ArrowRightIcon from '../../../../assets/svg/16px/ic_arrow_right.svg?react';
import ChartIcon from '../../../../assets/svg/24px/ic_chart_bar.svg?react';
import PeopleIcon from '../../../../assets/svg/24px/ic_people.svg?react';
import Divider from '../../divider/Divider';
import ManagementStatRow from './ManagementStatRow';
import { semantic } from '../../../tokens/semantic';
import {
  ManagementCardContainer,
  ManagementFairCardHeader,
  ManagementCardLink,
  ManagementCardStats,
} from './style';
import {
  CONGESTION_TOOLTIP,
  VISITOR_TOOLTIP,
} from '../../../../constants/tooltip';

/**
 * 관리자 부스 정보 카드 컴포넌트입니다.
 * 마이페이지에서 사용됩니다.
 *
 * @param {function} [onLinkClick] - '바로가기' 클릭 시 호출되는 함수
 * @param {number|string} congestionLevel - 현재 혼잡도
 * @param {function} [onCongestionClick] - 혼잡도 항목의 전환 버튼 클릭 시 호출되는 함수
 * @param {number} visitorCount - 방문자 수
 */
export default function ManagementFairCard({
  onLinkClick,
  congestionLevel,
  onCongestionClick,
  visitorCount,
}) {
  return (
    <ManagementCardContainer>
      <ManagementFairCardHeader>종합손물세트 14th</ManagementFairCardHeader>
      <ManagementCardLink onClick={onLinkClick}>
        바로가기
        <ArrowRightIcon />
      </ManagementCardLink>
      <ManagementCardStats>
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
        />
      </ManagementCardStats>
    </ManagementCardContainer>
  );
}
