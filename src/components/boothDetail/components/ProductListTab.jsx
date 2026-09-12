import ProductVerticalCard from '@/designsystem/components/card/product/ProductVerticalCard';
import {
  ProductList,
  ProductListTabContainer,
  ProductListTabHeader,
  ProductListTabContent,
} from './style';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';

export default function ProductListTab({ productGroups }) {
  if (!productGroups?.length) {
    return <EmptyState height={600} description="등록된 상품이 없습니다." />;
  }

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
