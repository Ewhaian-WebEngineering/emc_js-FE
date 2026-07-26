import Select from '@/designsystem/components/select/Select';
import { BoothCount, SearchToolBarWrapper, ToolBarActions } from '../style';
import { OPERATING_TIME_OPTIONS, SORT_OPTIONS } from '@/constants/filter';

export default function SearchToolBar({
  count,
  sortValue,
  onSortChange,
  filterValue,
  onFilterChange,
}) {
  return (
    <SearchToolBarWrapper>
      <BoothCount>총 {count}개의 부스</BoothCount>
      <ToolBarActions>
        <Select
          size="sm"
          options={SORT_OPTIONS}
          value={sortValue}
          onChange={onSortChange}
        />
        <Select
          size="sm"
          options={OPERATING_TIME_OPTIONS}
          value={filterValue}
          onChange={onFilterChange}
          prefix="운영시간"
        />
      </ToolBarActions>
    </SearchToolBarWrapper>
  );
}
