import CardPlaceholder from '../CardPlaceholder';
import {
  ProductVerticalCardContainer,
  ProductVerticalCardContent,
  ProductVerticalCardDescription,
  ProductVerticalCardName,
  ProductVerticalCardPrice,
  ProductVerticalCardThumbnail,
} from './style';

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
        <ProductVerticalCardPrice>{productPrice}</ProductVerticalCardPrice>
      </ProductVerticalCardContent>
    </ProductVerticalCardContainer>
  );
}
