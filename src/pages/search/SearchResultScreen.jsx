import SearchHeader from '@/designsystem/components/header/SearchHeader';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import SearchBoothList from '../../components/BoothList';
import { useGoBack } from '@/hooks/useGoBack';
import { SEARCH_ROUTES } from '@/constants/routes';
import { useBoothFilter } from '@/hooks/useBoothFilter';
import BoothFilterBar from '../../components/BoothFilterBar';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { InfiniteScrollLoader } from './style';

export default function SearchResultScreen() {
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);

  const {
    category,
    setCategory,
    sort,
    setSort,
    time,
    setTime,
    booths,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useBoothFilter(query);

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <>
      <SearchHeader
        onBack={handleBack}
        value={searchValue}
        onChange={setSearchValue}
        onDelete={() => {
          navigate(SEARCH_ROUTES.SEARCH, { replace: true });
        }}
        onSearch={() => {
          const trimmed = searchValue.trim();
          if (!trimmed) return;
          navigate(`/search/result?query=${encodeURIComponent(trimmed)}`);
        }}
        border
      />
      <BoothFilterBar
        count={totalCount}
        categoryValue={category}
        onCategoryChange={setCategory}
        sortValue={sort}
        onSortChange={setSort}
        filterValue={time}
        onFilterChange={setTime}
      />
      {isError ? (
        <EmptyState
          variant="md"
          title="검색 중 문제가 발생했어요"
          description={error.message}
          height={450}
        />
      ) : booths.length === 0 ? (
        <EmptyState
          variant="md"
          title="검색 결과가 없습니다."
          description="부스 번호, 이름, 제품명으로 다시 검색해보세요."
          height={450}
        />
      ) : (
        <>
          <SearchBoothList booths={booths} />
          <div ref={observerRef} style={{ height: 1 }} />
          {isFetchingNextPage && (
            <InfiniteScrollLoader>
              <Spinner />
            </InfiniteScrollLoader>
          )}
        </>
      )}
    </>
  );
}
