import SearchHeader from '@/designsystem/components/header/SearchHeader';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DUMMY_BOOTHS } from '../../constants/dummyBooths';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import SearchBoothList from '../../components/BoothList';
import { useGoBack } from '@/hooks/useGoBack';
import { SEARCH_ROUTES } from '@/constants/routes';
import { useBoothFilter } from '@/hooks/useBoothFilter';
import BoothFilterBar from '../../components/BoothFilterBar';

export default function SearchResultScreen() {
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);
  const {
    setCategory,
    sortOption,
    setSortOption,
    filterOption,
    setFilterOption,
    booths,
  } = useBoothFilter(DUMMY_BOOTHS);

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
        count={booths.length}
        onCategoryChange={setCategory}
        sortValue={sortOption}
        onSortChange={setSortOption}
        filterValue={filterOption}
        onFilterChange={setFilterOption}
      />
      {booths.length === 0 ? (
        <EmptyState
          variant="sm"
          title="검색 결과가 없습니다."
          description="부스 번호, 이름, 제품명으로 다시 검색해보세요."
        />
      ) : (
        <SearchBoothList booths={booths} />
      )}
    </>
  );
}
