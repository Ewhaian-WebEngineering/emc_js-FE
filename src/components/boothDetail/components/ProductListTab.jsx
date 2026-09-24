import ProductVerticalCard from '@/designsystem/components/card/product/ProductVerticalCard';
import {
  ProductList,
  ProductListTabContainer,
  ProductListTabHeader,
  ProductListTabContent,
} from './style';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';

const byDisplayOrder = (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0);

export default function ProductListTab({
  productGroups,
  ungroupedProducts = [],
}) {
  const sortedGroups = [...(productGroups ?? [])].sort(byDisplayOrder);
  const sortedUngrouped = [...ungroupedProducts].sort(byDisplayOrder);

  const hasGrouped = productGroups?.length > 0;
  const hasUngrouped = ungroupedProducts.length > 0;

  if (!hasGrouped && !hasUngrouped) {
    return <EmptyState height={600} description="등록된 상품이 없습니다." />;
  }

  return (
    <ProductListTabContainer>
      {sortedGroups.map((group) => (
        <ProductListTabContent key={group.id}>
          {(group.name || group.description) && (
            <ProductListTabHeader>
              {group.name && <h2>{group.name}</h2>}
              {group.description && <p>{group.description}</p>}
            </ProductListTabHeader>
          )}
          <ProductList>
            {[...group.products].sort(byDisplayOrder).map((product) => (
              <ProductVerticalCard
                key={product.id}
                thumbnail={product.imageUrl}
                productName={product.name}
                productDescription={product.description}
                productPrice={product.price}
                isSoldOut={product.isSoldOut}
              />
            ))}
          </ProductList>
        </ProductListTabContent>
      ))}

      {hasUngrouped && (
        <ProductListTabContent>
          <ProductList>
            {sortedUngrouped.map((product) => (
              <ProductVerticalCard
                key={product.id}
                thumbnail={product.imageUrl}
                productName={product.name}
                productDescription={product.description}
                productPrice={product.price}
                isSoldOut={product.isSoldOut}
              />
            ))}
          </ProductList>
        </ProductListTabContent>
      )}
    </ProductListTabContainer>
  );
}
