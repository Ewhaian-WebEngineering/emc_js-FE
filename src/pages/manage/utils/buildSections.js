export function buildSections(productGroups, draft) {
  const baseGroups = productGroups
    .map((group) => {
      const entry = draft.groups[group.id];
      if (entry?.status === 'deleted') return null;
      return entry?.status === 'updated' ? { ...group, ...entry.data } : group;
    })
    .filter(Boolean);

  const newGroups = Object.entries(draft.groups)
    .filter(([, entry]) => entry.status === 'created')
    .map(([tempId, entry]) => ({ id: tempId, ...entry.data }));

  const allGroups = [...baseGroups, ...newGroups];

  const allServerProducts = productGroups.flatMap((group) =>
    (group.products ?? []).map((product) => ({
      ...product,
      groupId: group.id,
    })),
  );

  const overriddenProducts = allServerProducts
    .map((product) => {
      const entry = draft.products[product.id];
      if (entry?.status === 'deleted') return null;
      if (entry?.status === 'updated')
        return { ...product, ...entry.data, id: product.id };
      return product;
    })
    .filter(Boolean);

  const draftCreatedProducts = Object.entries(draft.products)
    .filter(([, entry]) => entry.status === 'created')
    .map(([tempId, entry]) => ({ ...entry.data, id: tempId }));

  const allProducts = [...overriddenProducts, ...draftCreatedProducts];
  const byDisplayOrder = (a, b) =>
    (a.displayOrder ?? 0) - (b.displayOrder ?? 0);

  const sections = allGroups.map((group) => ({
    ...group,
    isUngrouped: false,
    products: allProducts
      .filter((p) => p.groupId === group.id)
      .sort(byDisplayOrder),
  }));

  const ungroupedProducts = allProducts
    .filter((p) => !p.groupId)
    .sort(byDisplayOrder);

  return [
    ...sections,
    {
      id: 'ungrouped',
      name: '그룹 없음',
      isUngrouped: true,
      products: ungroupedProducts,
    },
  ];
}
