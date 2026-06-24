import { DeleteButton, SearchWrapper } from './style';
import { semantic } from '../../tokens/semantic';
import { useState } from 'react';
import SearchIcon from '../../../assets/svg/20px/ic_search.svg?react';
import DeleteIcon from '../../../assets/svg/20px/ic_circle_close.svg?react';

export default function Search({ value, onChange, onDelete }) {
  const [focused, setFocused] = useState(false);

  return (
    <SearchWrapper focused={focused}>
      <SearchIcon width="20" height="20" color={semantic.iconNormalAssistive} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="내용을 입력해 주세요."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value && (
        <DeleteButton
          onMouseDown={(e) => e.preventDefault()}
          onClick={onDelete}
        >
          <DeleteIcon />
        </DeleteButton>
      )}
    </SearchWrapper>
  );
}
