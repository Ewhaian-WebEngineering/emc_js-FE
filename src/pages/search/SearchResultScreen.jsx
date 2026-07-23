import { CATEGORY_TABS } from '@/constants/categoryTabs';
import SearchHeader from '@/designsystem/components/header/SearchHeader';
import Tab from '@/designsystem/components/tab/Tab';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DUMMY_BOOTHS } from './constants/dummyBooths';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import SearchBoothList from './components/SearchBoothList';

export default function SearchResultScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);
  const [category, setCategory] = useState('all');

  const booths = useMemo(() => {
    if (category === 'all') return DUMMY_BOOTHS;
    return DUMMY_BOOTHS.filter((booth) => booth.badges.includes(category));
  }, [category]);

  return (
    <>
      <SearchHeader
        onBack={() => {
          navigate(-1);
        }}
        value={searchValue}
        onChange={setSearchValue}
        onDelete={() => {
          setSearchValue('');
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
