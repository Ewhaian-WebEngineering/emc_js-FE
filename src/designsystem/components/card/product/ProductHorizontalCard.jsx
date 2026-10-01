import Image from '../../Image';
import CardPlaceholder from '../../Placeholder';
import {
  ProductHorizontalCardContainer,
  ProductHorizontalCardContent,
  ProductHorizontalCardDescription,
  ProductHorizontalCardName,
  ProductHorizontalCardThumbnail,
} from './style';

/**
 * 가로형 제품 카드 컴포넌트입니다.
 * 협찬사 상세 화면에서 사용됩니다.
 *
 * @param {string} [thumbnail] - 제품 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {string} productName - 제품 이름
 * @param {string} productDescription - 제품 설명
 */
export default function ProductHorizontalCard({
  thumbnail,
  productName,
  productDescription,
}) {
  return (
    <ProductHorizontalCardContainer>
      <ProductHorizontalCardThumbnail>
        {thumbnail ? (
          <Image src={thumbnail} alt={productName} width={1200} />
        ) : (
          <CardPlaceholder />
        )}
      </ProductHorizontalCardThumbnail>
      <ProductHorizontalCardContent>
        <ProductHorizontalCardName>{productName}</ProductHorizontalCardName>
        <ProductHorizontalCardDescription>
          {productDescription}
        </ProductHorizontalCardDescription>
      </ProductHorizontalCardContent>
    </ProductHorizontalCardContainer>
  );
}
