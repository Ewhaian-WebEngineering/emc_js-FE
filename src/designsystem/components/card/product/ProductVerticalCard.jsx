import { formatNumber } from '@/utils/formatNumber';
import CardPlaceholder from '../../Placeholder';
import {
  ProductVerticalCardContainer,
  ProductVerticalCardContent,
  ProductVerticalCardDescription,
  ProductVerticalCardName,
  ProductVerticalCardPrice,
  ProductVerticalCardSoldOutOverlay,
  ProductVerticalCardThumbnail,
} from './style';
import Image from '../../Image';

/**
 * 세로형 제품 카드 컴포넌트입니다.
 * 부스 상세 > 제품 목록 섹션, 내 부스 관리 > 미리보기 > 제품 목록 섹션에서 사용됩니다.
 *
 * @param {string} [thumbnail] - 제품 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {string} productName - 제품 이름
 * @param {string} productDescription - 제품 설명
 * @param {number} productPrice - 제품 가격
 * @param {boolean} [isSoldOut=false] - 판매 종료 여부
 * @returns
 */
export default function ProductVerticalCard({
  thumbnail,
  productName,
  productDescription,
  productPrice,
  isSoldOut = false,
}) {
  return (
    <ProductVerticalCardContainer>
      <ProductVerticalCardThumbnail>
        {thumbnail ? (
          <Image src={thumbnail} alt={productName} width={1200} />
        ) : (
          <CardPlaceholder />
        )}
        {isSoldOut && (
          <ProductVerticalCardSoldOutOverlay>
            판매 종료
          </ProductVerticalCardSoldOutOverlay>
        )}
      </ProductVerticalCardThumbnail>
      <ProductVerticalCardContent>
        <ProductVerticalCardName>{productName}</ProductVerticalCardName>
        <ProductVerticalCardDescription>
          {productDescription}
        </ProductVerticalCardDescription>
        <ProductVerticalCardPrice>
          {formatNumber(productPrice)}원
        </ProductVerticalCardPrice>
      </ProductVerticalCardContent>
    </ProductVerticalCardContainer>
  );
}
