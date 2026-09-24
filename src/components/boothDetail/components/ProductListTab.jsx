import ProductVerticalCard from '@/designsystem/components/card/product/ProductVerticalCard';
import {
  ProductList,
  ProductListTabContainer,
  ProductListTabHeader,
  ProductListTabContent,
} from './style';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';

const byDisplayOrder = (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0);

function buildDisplayGroups(
  productGroups,
  ungroupedProducts,
  ungroupedDisplayOrder,
) {
  const groups = (productGroups ?? []).map((group) => ({
    ...group,
    isUngrouped: false,
  }));

  const ungroupedGroup = {
    id: 'ungrouped',
    displayOrder: ungroupedDisplayOrder ?? Number.MAX_SAFE_INTEGER,
    products: ungroupedProducts ?? [],
    isUngrouped: true,
  };

  return [...groups, ungroupedGroup]
    .filter((group) => (group.isUngrouped ? group.products.length > 0 : true))
    .sort(byDisplayOrder);
}

export default function ProductListTab({
  productGroups,
  ungroupedProducts = [],
  ungroupedDisplayOrder,
}) {
  const displayGroups = buildDisplayGroups(
    productGroups,
    ungroupedProducts,
    ungroupedDisplayOrder,
  );

  const hasAnyProduct = displayGroups.length > 0;

  if (!hasAnyProduct) {
    return <EmptyState height={600} description="등록된 상품이 없습니다." />;
  }

  return (
    <ProductListTabContainer>
      {displayGroups.map((group) => (
        <ProductListTabContent key={group.id}>
          {!group.isUngrouped && (group.name || group.description) && (
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
    </ProductListTabContainer>
  );
}
