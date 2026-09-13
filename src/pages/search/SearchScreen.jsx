import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import SearchHeader from '@/designsystem/components/header/SearchHeader';
import Tag from '@/designsystem/components/tag/Tag';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchContent,
  RecentSearchSection,
  SearchSectionHeader,
  SearchSectionTitle,
  RecentSearchList,
  TrendingBoothSection,
  UpdateTimeStamp,
} from './style';
import { SectionTitle } from '../home/style';
import TrendingBoothList from './components/TrendingBoothList';
import { useGoBack } from '@/hooks/useGoBack';
import { SEARCH_ROUTES } from '@/constants/routes';
import { useSearchData } from '@/api/feature/search/useSearchData';
import { useRecentSearches } from './hooks/useRecentSearches';
import { useAuth } from '@/api/feature/auth/useAuth';

export default function SearchScreen() {
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const { userId } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const { recentSearches, addSearch, removeSearch, clearAll } =
    useRecentSearches(userId);

  const { popularBooths } = useSearchData();

  return (
    <>
      <SearchHeader
        onBack={handleBack}
        value={searchValue}
        onChange={setSearchValue}
        onDelete={() => setSearchValue('')}
        onSearch={() => {
          const trimmed = searchValue.trim();
          if (!trimmed) return;
          addSearch(trimmed);
          navigate(
            `${SEARCH_ROUTES.SEARCH_RESULT}?query=${encodeURIComponent(trimmed)}`,
          );
        }}
        border
      />

      <SearchContent>
        <RecentSearchSection>
          <SearchSectionHeader>
            <SearchSectionTitle>최근 검색어</SearchSectionTitle>
            <LinkButton
              variant="secondary"
              size="sm"
              onClick={() => clearAll()}
            >
              모두 삭제
            </LinkButton>
          </SearchSectionHeader>
          <RecentSearchList>
            {recentSearches.length === 0 ? (
              <EmptyState
                variant="sm"
                description="부스 번호, 이름, 제품명으로 다시 검색해보세요."
                height={72}
              />
            ) : (
              recentSearches.map((search, index) => (
                <Tag
                  key={index}
                  variant="sorting"
                  label={search}
                  onDelete={() => {
                    removeSearch(index);
                  }}
                  onClick={() => {
                    navigate(
                      `${SEARCH_ROUTES.SEARCH_RESULT}?query=${encodeURIComponent(search)}`,
                    );
                  }}
                />
              ))
            )}
          </RecentSearchList>
        </RecentSearchSection>

        <TrendingBoothSection>
          <SearchSectionHeader>
            <SectionTitle>실시간 인기 부스</SectionTitle>
            <UpdateTimeStamp>
              오늘 {popularBooths.updatedAt} 기준
            </UpdateTimeStamp>
          </SearchSectionHeader>
          {popularBooths.booths.length === 0 ? (
            <EmptyState
              variant="sm"
              description="인기 부스를 집계 중이에요. 잠시 후 다시 확인해주세요."
              height={132}
            />
          ) : (
            <TrendingBoothList trendingBooths={popularBooths.booths} />
          )}
        </TrendingBoothSection>
      </SearchContent>
    </>
  );
}
