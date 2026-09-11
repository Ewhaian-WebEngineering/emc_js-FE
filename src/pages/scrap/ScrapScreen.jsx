import EmptyStateIcon from '@/assets/svg/scrap/ic_empty_scrap.svg?react';
import ArrowRightIcon from '@/assets/svg/16px/ic_arrow_right.svg?react';
import BoothFilterBar from '@/components/BoothFilterBar';
import BoothList from '@/components/BoothList';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import FillRightHeader from '@/designsystem/components/header/FillRightHeader';
import { semantic } from '@/designsystem/tokens/semantic';
import {
  EmptyStateButtonTextWrapper,
  ScrapContentWrapper,
  ScrapScreenContainer,
} from './style';
import { useNavigate } from 'react-router-dom';
import { TAB_ROUTES } from '@/constants/routes';
import { useScrapList } from '@/api/feature/scrap/useScrap';
import { InfiniteScrollLoader } from '@/components/common/style';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useBoothFilter } from '@/hooks/useBoothFilter';

export default function ScrapScreen() {
  const navigate = useNavigate();
  const { category, setCategory, sort, setSort, time, setTime } =
    useBoothFilter('all');

  const {
    scrapListData,
    totalCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useScrapList({ category, sort, time });

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const isFiltering = category !== 'all' || time !== 'all';
  const showEmptyState = totalCount === 0 && !isFiltering;

  if (isLoading) {
    return (
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    );
  }

  return (
    <ScrapScreenContainer>
      <FillRightHeader title="스크랩" border />
      <ScrapContentWrapper isEmptyState={showEmptyState}>
        {showEmptyState ? (
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
              count={totalCount}
              categoryValue={category}
              sortValue={sort}
              onSortChange={setSort}
              filterValue={time}
              onFilterChange={setTime}
              onCategoryChange={setCategory}
            />
            <BoothList booths={scrapListData} />
            <div ref={observerRef} style={{ height: 1 }} />
            {isFetchingNextPage && (
              <InfiniteScrollLoader>
                <Spinner />
              </InfiniteScrollLoader>
            )}
          </>
        )}
      </ScrapContentWrapper>
    </ScrapScreenContainer>
  );
}
