import Header from './Header';
import LogoText from '@/assets/svg/logo/ic_logo_main.svg?react';
import SearchIcon from '@/assets/svg/28px/ic_search.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';

/**
 * 로고와 검색 진입 버튼으로 구성된 Header입니다.
 *
 * @param {function} onSearchClick - 검색 버튼 클릭 이벤트 핸들러
 * @param {boolean} [border=false] - Header 하단에 border를 표시할지 여부
 */
export default function HomeHeader({ onSearchClick, border = false }) {
  return (
    <Header
      left={<LogoText />}
      right={
        <SearchIcon
          onClick={onSearchClick}
          color={semantic.iconNormalNormal}
          style={{ cursor: 'pointer' }}
        />
      }
      border={border}
    />
  );
}
