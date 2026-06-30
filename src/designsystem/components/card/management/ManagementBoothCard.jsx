import { SCRAP_TOOLTIP, VISITOR_TOOLTIP } from '../../../../constants/tooltip';
import ArrowRightIcon from '../../../../assets/svg/16px/ic_arrow_right.svg?react';
import ScrapIcon from '../../../../assets/svg/24px/ic_scrap_fill.svg?react';
import PeopleIcon from '../../../../assets/svg/24px/ic_people.svg?react';
import Divider from '../../divider/Divider';
import ManagementStatRow from './ManagementStatRow';
import { semantic } from '../../../tokens/semantic';
import {
  ManagementBoothCardHeader,
  ManagementBoothCardHeaderTitle,
  ManagementCardContainer,
  ManagementCardLink,
  ManagementCardStats,
} from './style';

export default function ManagementBoothCard({
  boothName,
  onLinkClick,
  scrapCount,
  visitorCount,
}) {
  return (
    <ManagementCardContainer>
      <ManagementBoothCardHeader>
        <ManagementBoothCardHeaderTitle>
          {boothName}
        </ManagementBoothCardHeaderTitle>
        <ManagementCardLink onClick={onLinkClick}>
          바로가기
          <ArrowRightIcon />
        </ManagementCardLink>
      </ManagementBoothCardHeader>
      <ManagementCardStats>
        <ManagementStatRow
          icon={<ScrapIcon color={semantic.secondaryYellowDefault} />}
          label="스크랩 수"
          tooltip={SCRAP_TOOLTIP}
          value={scrapCount}
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
