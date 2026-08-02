import { Fragment } from 'react';
import ProductVerticalCard from '@/designsystem/components/card/product/ProductVerticalCard';
import {
  ProductList,
  ProductListTabContainer,
  ProductListTabHeader,
} from './style';

export default function ProductListTab({ productGroups }) {
  return (
    <ProductListTabContainer>
      {productGroups.map((group) => (
        <Fragment key={group.id}>
          <ProductListTabHeader>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
          </ProductListTabHeader>
          <ProductList>
            {group.products.map((product) => (
              <ProductVerticalCard
                key={product.id}
                thumbnail={product.thumbnail}
                productName={product.name}
                productDescription={product.description}
                productPrice={product.price}
              />
            ))}
          </ProductList>
        </Fragment>
      ))}
    </ProductListTabContainer>
  );
}
