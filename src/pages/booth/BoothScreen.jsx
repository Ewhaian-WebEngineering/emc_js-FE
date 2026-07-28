import FillRightHeader from '@/designsystem/components/header/FillRightHeader';
import SearchIcon from '@/assets/svg/28px/ic_search.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { SearchButton } from './style';
import { SEARCH_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { DUMMY_BOOTHS } from '../../constants/dummyBooths';
import BoothList from '@/components/BoothList';
import { useBoothFilter } from '@/hooks/useBoothFilter';
import BoothFilterBar from '@/components/BoothFilterBar';

export default function BoothScreen() {
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
    <>
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
        count={booths.length}
        sortValue={sortOption}
        onSortChange={setSortOption}
        filterValue={filterOption}
        onFilterChange={setFilterOption}
        onCategoryChange={setCategory}
      />
      <BoothList booths={booths} />
    </>
  );
}
