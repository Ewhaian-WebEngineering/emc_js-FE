import Header from './Header';
import Search from '../search/Search';
import ArrowLeftIcon from '@/assets/svg/28px/ic_arrow_left.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';

/**
 * 뒤로가기 버튼과 검색 입력창으로 구성된 Header입니다.
 *
 * @param {function} onBack - 뒤로가기 버튼 클릭 이벤트 핸들러
 * @param {string} value - 검색어
 * @param {function} onChange - 검색어 변경 이벤트 핸들러
 * @param {function} [onDelete] - 검색어 삭제 버튼 클릭 이벤트 핸들러
 * @param {function} [onSearch] - 검색 버튼 클릭 이벤트 핸들러
 */
export default function SearchHeader({
  onBack,
  value,
  onChange,
  onDelete,
  onSearch,
  border = false,
}) {
  return (
    <Header
      left={
        <ArrowLeftIcon onClick={onBack} color={semantic.iconNormalNormal} />
      }
      center={
        <Search
          value={value}
          onChange={onChange}
          onDelete={onDelete}
          onSearch={onSearch}
        />
      }
      gap
      border={border}
    />
  );
}
