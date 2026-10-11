import { useRef } from 'react';
import UploadIcon from '@/assets/svg/24px/ic_upload.svg?react';
import CircleCloseIcon from '@/assets/svg/20px/ic_circle_close.svg?react';
import { semantic } from '../../tokens/semantic';
import {
  ProductImageUploaderBox,
  ProductImageUploaderButton,
  ProductImageUploaderContainer,
  ProductImageUploaderDeleteButton,
  ProductImageUploaderHelperText,
  ProductImageUploaderLabel,
  ProductImageUploaderRequired,
} from './style';
import Image from '../Image';

const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

/**
 * 제품 이미지를 업로드/삭제하는 컴포넌트입니다.
 *
 * @param {string} title - 필드 라벨
 * @param {boolean} [isRequired] - 필수 표시(*) 여부
 * @param {string} [imageUrl] - 업로드된 이미지 URL, 없으면 업로드 버튼 표시
 * @param {function} onUpload - 이미지 파일 선택 시 호출되는 함수
 * @param {function} [onDelete] - 이미지 삭제 버튼 클릭 시 호출되는 함수
 * @param {boolean} [isError] - 에러 상태 여부
 * @param {string} [helperText] - 안내 문구, 에러 상태일 때는 에러 문구로 사용
 * @param {function} [onUploadError] - 업로드 실패 시 호출되는 함수
 * @param {string} [accept='image/*'] - 업로드 가능한 파일 타입
 * @param {function} [onBeforeUpload] - 업로드 창 열기 전 호출, false 반환 시 중단
 */
export default function ProductImageUploader({
  title,
  isRequired,
  helperText,
  isError,
  imageUrl,
  onUpload,
  onDelete,
  onUploadError,
  accept = 'image/*',
  onBeforeUpload,
}) {
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    if (onBeforeUpload?.() === false) return;
    inputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidType = ACCEPTED_TYPES.includes(file.type);
    const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      onUploadError?.(handleUploadClick);
      event.target.value = '';
      return;
    }

    onUpload?.(file);
    event.target.value = '';
  };

  return (
    <ProductImageUploaderContainer>
      <ProductImageUploaderLabel>
        {title}
        {isRequired && (
          <ProductImageUploaderRequired>*</ProductImageUploaderRequired>
        )}
      </ProductImageUploaderLabel>

      <ProductImageUploaderBox hasError={isError}>
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt={title} />
            <ProductImageUploaderDeleteButton onClick={onDelete}>
              <CircleCloseIcon color={semantic.iconNormalAssistive} />
            </ProductImageUploaderDeleteButton>
          </>
        ) : (
          <ProductImageUploaderButton onClick={handleUploadClick}>
            <UploadIcon
              width="40"
              height="40"
              color={semantic.iconNormalAssistive}
            />
          </ProductImageUploaderButton>
        )}
      </ProductImageUploaderBox>

      <ProductImageUploaderHelperText hasError={isError}>
        {helperText}
      </ProductImageUploaderHelperText>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        hidden
      />
    </ProductImageUploaderContainer>
  );
}
