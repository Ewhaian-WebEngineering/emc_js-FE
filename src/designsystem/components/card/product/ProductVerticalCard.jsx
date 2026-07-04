import { formatNumber } from '../../../../utils/formatNumber';
import CardPlaceholder from '../CardPlaceholder';
import {
  ProductVerticalCardContainer,
  ProductVerticalCardContent,
  ProductVerticalCardDescription,
  ProductVerticalCardName,
  ProductVerticalCardPrice,
  ProductVerticalCardThumbnail,
} from './style';

/**
 * 세로형 제품 카드 컴포넌트입니다.
 * 부스 상세 > 제품 목록 섹션, 내 부스 관리 > 미리보기 > 제품 목록 섹션에서 사용됩니다.
 *
 * @param {string} [thumbnail] - 제품 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {string} productName - 제품 이름
 * @param {string} productDescription - 제품 설명
 * @param {number} productPrice - 제품 가격
 * @returns
 */
export default function ProductVerticalCard({
  thumbnail,
  productName,
  productDescription,
  productPrice,
}) {
  return (
    <ProductVerticalCardContainer>
      <ProductVerticalCardThumbnail>
        {thumbnail ? (
          <img src={thumbnail} alt={productName} />
        ) : (
          <CardPlaceholder />
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
