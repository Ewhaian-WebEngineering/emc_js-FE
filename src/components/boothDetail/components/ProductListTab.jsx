import ProductVerticalCard from '@/designsystem/components/card/product/ProductVerticalCard';
import {
  ProductList,
  ProductListTabContainer,
  ProductListTabHeader,
  ProductListTabContent,
} from './style';

export default function ProductListTab({ productGroups }) {
  return (
    <ProductListTabContainer>
      {productGroups.map((group) => (
        <ProductListTabContent key={group.id}>
          {(group.name || group.description) && (
            <ProductListTabHeader>
              {group.name && <h2>{group.name}</h2>}
              {group.description && <p>{group.description}</p>}
            </ProductListTabHeader>
          )}
          <ProductList>
            {group.products.map((product) => (
              <ProductVerticalCard
                key={product.id}
                thumbnail={product.imageUrl}
                productName={product.name}
                productDescription={product.description}
                productPrice={product.price}
              />
            ))}
          </ProductList>
        </ProductListTabContent>
      ))}
    </ProductListTabContainer>
  );
}
