import EmptyStateIcon from '@/assets/svg/scrap/ic_empty_scrap.svg?react';
import ArrowRightIcon from '@/assets/svg/16px/ic_arrow_right.svg?react';
import BoothFilterBar from '@/components/BoothFilterBar';
import BoothList from '@/components/BoothList';
import { DUMMY_BOOTHS } from '@/constants/dummyBooths';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import FillRightHeader from '@/designsystem/components/header/FillRightHeader';
import { semantic } from '@/designsystem/tokens/semantic';
import { useBoothFilter } from '@/hooks/useBoothFilter';
import {
  EmptyStateButtonTextWrapper,
  ScrapContentWrapper,
  ScrapScreenContainer,
} from './style';
import { useNavigate } from 'react-router-dom';
import { TAB_ROUTES } from '@/constants/routes';

export default function ScrapScreen() {
  const navigate = useNavigate();
  const {
    setCategory,
    sortOption,
    setSortOption,
    filterOption,
    setFilterOption,
    booths,
  } = useBoothFilter(DUMMY_BOOTHS);

  return (
    <ScrapScreenContainer>
      <FillRightHeader title="스크랩" border />
      <ScrapContentWrapper boothCount={booths.length}>
        {booths.length === 0 ? (
          <EmptyState
            Icon={EmptyStateIcon}
            title="아직 스크랩한 부스가 없어요!"
            description={
              <>
                부스 탭에서 관심 있는 부스를 스크랩하고
                <br />
                한곳에 모아보세요.
              </>
            }
            buttonText={
              <EmptyStateButtonTextWrapper>
                부스 보러가기
                <ArrowRightIcon color={semantic.iconNormalInverse} />
              </EmptyStateButtonTextWrapper>
            }
            onButtonClick={() => {
              navigate(TAB_ROUTES.BOOTH);
            }}
          />
        ) : (
          <>
            <BoothFilterBar
              count={booths.length}
              sortValue={sortOption}
              onSortChange={setSortOption}
              filterValue={filterOption}
              onFilterChange={setFilterOption}
              onCategoryChange={setCategory}
            />
            <BoothList booths={booths} />
          </>
        )}
      </ScrapContentWrapper>
    </ScrapScreenContainer>
  );
}
