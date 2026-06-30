import CardPlaceholder from '../CardPlaceholder';
import {
  ProductHorizontalCardContainer,
  ProductHorizontalCardContent,
  ProductHorizontalCardDescription,
  ProductHorizontalCardName,
  ProductHorizontalCardThumbnail,
} from './style';

export default function ProductHorizontalCard({
  thumbnail,
  productName,
  productDescription,
}) {
  return (
    <ProductHorizontalCardContainer>
      <ProductHorizontalCardThumbnail>
        {thumbnail ? (
          <img src={thumbnail} alt={productName} />
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
