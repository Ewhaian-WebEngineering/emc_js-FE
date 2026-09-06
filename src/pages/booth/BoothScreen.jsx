import FillRightHeader from '@/designsystem/components/header/FillRightHeader';
import SearchIcon from '@/assets/svg/28px/ic_search.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ScreenWrapper, SearchButton } from './style';
import { SEARCH_ROUTES } from '@/constants/routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BoothList from '@/components/BoothList';
import { useBoothFilter } from '@/hooks/useBoothFilter';
import BoothFilterBar from '@/components/BoothFilterBar';
import { useBoothData } from '@/api/feature/booth/useBoothData';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { InfiniteScrollLoader } from '@/components/common/style';

export default function BoothScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';

  const { category, setCategory, sort, setSort, time, setTime } =
    useBoothFilter(initialCategory);

  const {
    boothListData,
    totalCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useBoothData({ category, sort, time, limit: 20 });

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <ScreenWrapper>
      <FillRightHeader
        title="부스"
        right={
          <SearchButton
            onClick={() => {
              navigate(SEARCH_ROUTES.SEARCH);
            }}
          >
            <SearchIcon color={semantic.iconNormalNormal} />
          </SearchButton>
        }
        border
      />
      <BoothFilterBar
        count={totalCount}
        categoryValue={category}
        sortValue={sort}
        onSortChange={setSort}
        filterValue={time}
        onFilterChange={setTime}
        onCategoryChange={setCategory}
      />
      {isLoading ? (
        <InfiniteScrollLoader>
          <Spinner />
        </InfiniteScrollLoader>
      ) : (
        <>
          <BoothList booths={boothListData} />
          <div ref={observerRef} style={{ height: 1 }} />
          {isFetchingNextPage && (
            <InfiniteScrollLoader>
              <Spinner />
            </InfiniteScrollLoader>
          )}
        </>
      )}
    </ScreenWrapper>
  );
}
