import Select from '@/designsystem/components/select/Select';
import { OPERATING_TIME_OPTIONS, SORT_OPTIONS } from '@/constants/filter';
import { BoothCount, ToolBarActions, ToolBarWrapper } from './style';
import Tab from '@/designsystem/components/tab/Tab';
import { CATEGORY_TABS } from '@/constants/categoryTabs';

export default function BoothFilterBar({
  count,
  onCategoryChange,
  sortValue,
  onSortChange,
  filterValue,
  onFilterChange,
}) {
  return (
    <>
      <Tab
        variant="categoryFilter"
        tabs={CATEGORY_TABS}
        onChange={(tab) => onCategoryChange(tab.value)}
      />
      <ToolBar
        count={count}
        sortValue={sortValue}
        onSortChange={onSortChange}
        filterValue={filterValue}
        onFilterChange={onFilterChange}
      />
    </>
  );
}

function ToolBar({
  count,
  sortValue,
  onSortChange,
  filterValue,
  onFilterChange,
}) {
  return (
    <ToolBarWrapper>
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
    </ToolBarWrapper>
  );
}
