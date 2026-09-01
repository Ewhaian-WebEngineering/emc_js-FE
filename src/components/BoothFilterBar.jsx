import Select from '@/designsystem/components/select/Select';
import { OPERATING_TIME_OPTIONS, SORT_OPTIONS } from '@/constants/filter';
import { BoothCount, ToolBarActions, ToolBarWrapper } from './style';
import Tab from '@/designsystem/components/tab/Tab';
import { CATEGORY_TABS } from '@/constants/categoryTabs';

export default function BoothFilterBar({
  count,
  categoryValue,
  onCategoryChange,
  sortValue,
  onSortChange,
  filterValue,
  onFilterChange,
}) {
  const activeTabIndex = CATEGORY_TABS.findIndex(
    (tab) => tab.value === categoryValue,
  );

  return (
    <>
      <Tab
        variant="categoryFilter"
        tabs={CATEGORY_TABS}
        activeTab={activeTabIndex !== -1 ? activeTabIndex : 0}
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
  const selectedSort = SORT_OPTIONS.find((opt) => opt.value === sortValue);
  const selectedFilter = OPERATING_TIME_OPTIONS.find(
    (opt) => opt.value === filterValue,
  );

  return (
    <ToolBarWrapper>
      <BoothCount>총 {count}개의 부스</BoothCount>
      <ToolBarActions>
        <Select
          size="sm"
          options={SORT_OPTIONS}
          value={selectedSort}
          onChange={(option) => onSortChange(option.value)}
          align="right"
        />
        <Select
          size="sm"
          options={OPERATING_TIME_OPTIONS}
          value={selectedFilter}
          onChange={(option) => onFilterChange(option.value)}
          prefix="운영시간"
          align="right"
        />
      </ToolBarActions>
    </ToolBarWrapper>
  );
}
