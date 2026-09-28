import FillRightHeader from '@/designsystem/components/header/FillRightHeader';
import SearchIcon from '@/assets/svg/28px/ic_search.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { PagerItem, PagerWrapper, ScreenWrapper, SearchButton } from './style';
import { SEARCH_ROUTES } from '@/constants/routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BoothList from '@/components/BoothList';
import { useBoothFilter } from '@/hooks/useBoothFilter';
import BoothFilterBar from '@/components/BoothFilterBar';
import { useBoothData } from '@/api/feature/booth/useBoothData';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { InfiniteScrollLoader } from '@/components/common/style';
import { CATEGORY_TABS } from '@/constants/categoryTabs';
import { useMemo, useRef } from 'react';
import useHorizontalPager from './hooks/useHorizontalPages';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import ErrorScreen from '@/components/common/ErrorScreen';

const CATEGORY_LIST = CATEGORY_TABS.map((tab) => tab.value);

export default function BoothScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';

  const { category, setCategory, sort, setSort, time, setTime } =
    useBoothFilter(initialCategory);

  const pagerRef = useRef(null);

  const currentIndex = useMemo(
    () => CATEGORY_LIST.indexOf(category),
    [category],
  );

  const { onScroll, scrollToIndex } = useHorizontalPager({
    pagerRef,
    items: CATEGORY_LIST,
    activeItem: category,
    onActiveChange: setCategory,
  });

  const handleCategoryChange = (nextCategory) => {
    const idx = CATEGORY_LIST.indexOf(nextCategory);
    if (idx === -1) return;
    scrollToIndex(idx);
    setCategory(nextCategory);
  };

  const { totalCount, isError, isPending, isPaused, refetch } = useBoothData({
    category,
    sort,
    time,
    limit: 20,
  });

  if (isError || (isPending && isPaused)) {
    return <ErrorScreen onRetry={() => refetch()} />;
  }

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
        categoryTabs={CATEGORY_TABS}
        categoryValue={category}
        sortValue={sort}
        onSortChange={setSort}
        filterValue={time}
        onFilterChange={setTime}
        onCategoryChange={handleCategoryChange}
      />

      <PagerWrapper ref={pagerRef} onScroll={onScroll}>
        {CATEGORY_LIST.map((cat, idx) => (
          <PagerItem key={cat}>
            {Math.abs(idx - currentIndex) <= 1 ? (
              <CategoryPanel category={cat} sort={sort} time={time} />
            ) : null}
          </PagerItem>
        ))}
      </PagerWrapper>
    </ScreenWrapper>
  );
}

function CategoryPanel({ category, sort, time }) {
  const {
    boothListData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
  } = useBoothData({ category, sort, time, limit: 20 });

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isPending) {
    return (
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    );
  }

  if (boothListData.length === 0) {
    return (
      <EmptyState
        variant="md"
        title="조건에 맞는 부스가 없어요."
        description="카테고리나 필터를 변경해보세요."
        height={375}
      />
    );
  }

  return (
    <>
      <BoothList booths={boothListData} />
      <div ref={observerRef} style={{ height: 1 }} />
      {isFetchingNextPage && (
        <InfiniteScrollLoader>
          <Spinner />
        </InfiniteScrollLoader>
      )}
    </>
  );
}
