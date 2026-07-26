import { CATEGORY_TABS } from '@/constants/categoryTabs';
import SearchHeader from '@/designsystem/components/header/SearchHeader';
import Tab from '@/designsystem/components/tab/Tab';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DUMMY_BOOTHS } from './constants/dummyBooths';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import SearchBoothList from './components/SearchBoothList';
import { useGoBack } from '@/hooks/useGoBack';
import { SEARCH_ROUTES } from '@/constants/routes';
import SearchToolBar from './components/SearchToolBar';
import { OPERATING_TIME_OPTIONS, SORT_OPTIONS } from '@/constants/filter';

export default function SearchResultScreen() {
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);
  const [category, setCategory] = useState('all');
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const [filterOption, setFilterOption] = useState(OPERATING_TIME_OPTIONS[0]);

  const booths = useMemo(() => {
    if (category === 'all') return DUMMY_BOOTHS;
    return DUMMY_BOOTHS.filter((booth) => booth.badges.includes(category));
  }, [category]);

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
      <Tab
        variant="categoryFilter"
        tabs={CATEGORY_TABS}
        onChange={(tab) => setCategory(tab.value)}
      />
      <SearchToolBar
        count={booths.length}
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
