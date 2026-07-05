import { SearchIconButton, SearchIconGroup, SearchWrapper } from './style';
import { semantic } from '../../tokens/semantic';
import { useState } from 'react';
import SearchIcon from '@/assets/svg/20px/ic_search.svg?react';
import DeleteIcon from '@/assets/svg/20px/ic_circle_close.svg?react';

/**
 * 검색어를 입력하는 Search 컴포넌트입니다.
 *
 * @param {string} value - 입력된 검색어
 * @param {function} onChange - 입력값이 변경될 때 호출되는 함수
 * @param {function} [onDelete] - 삭제 버튼 클릭 시 호출되는 함수
 */
export default function Search({ value, onChange, onDelete, onSearch }) {
  const [focused, setFocused] = useState(false);

  return (
    <SearchWrapper focused={focused}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="내용을 입력해 주세요."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <SearchIconGroup>
        {value && (
          <SearchIconButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={onDelete}
          >
            <DeleteIcon />
          </SearchIconButton>
        )}
        <SearchIconButton
          onMouseDown={(e) => e.preventDefault()}
          onClick={onSearch}
        >
          <SearchIcon
            width="20"
            height="20"
            color={semantic.iconNormalNormal}
          />
        </SearchIconButton>
      </SearchIconGroup>
    </SearchWrapper>
  );
}
