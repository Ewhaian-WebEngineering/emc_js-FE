import { useRef } from 'react';
import UploadIcon from '@/assets/svg/20px/ic_upload.svg?react';
import { semantic } from '../../tokens/semantic';
import {
  MainImageUploaderActionBar,
  MainImageUploaderPreview,
  MainImageUploaderWrapper,
} from './style';
import Placeholder from '../Placeholder';

/**
 * 대표 이미지를 업로드/삭제하는 컴포넌트입니다.
 *
 * @param {string} [imageUrl] - 업로드된 대표 이미지 URL, 없으면 placeholder 표시
 * @param {function} onUpload - 이미지 파일 선택 시 호출되는 함수
 * @param {function} [onDelete] - 대표 이미지 삭제 버튼 클릭 시 호출되는 함수
 * @param {string} [accept='image/*'] - 업로드 가능한 파일 타입
 */
export default function MainImageUploader({
  imageUrl,
  onUpload,
  onDelete,
  accept = 'image/*',
}) {
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload?.(file);
    }
    event.target.value = '';
  };

  return (
    <MainImageUploaderWrapper>
      <MainImageUploaderPreview>
        {imageUrl ? (
          <img src={imageUrl} alt="대표 이미지" />
        ) : (
          <Placeholder logoSize="35%" />
        )}
      </MainImageUploaderPreview>

      {imageUrl ? (
        <MainImageUploaderActionBar variant="delete" onClick={onDelete}>
          대표 이미지 삭제
        </MainImageUploaderActionBar>
      ) : (
        <MainImageUploaderActionBar
          variant="upload"
          onClick={handleUploadClick}
        >
          <UploadIcon color={semantic.iconNormalInverse} />
          대표 이미지 업로드
        </MainImageUploaderActionBar>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        hidden
      />
    </MainImageUploaderWrapper>
  );
}
