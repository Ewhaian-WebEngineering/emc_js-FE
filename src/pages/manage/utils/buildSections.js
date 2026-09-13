export function buildSections(
  productGroups,
  draftGroups,
  draftItems,
  ungroupedServerItems = [],
  itemKey = 'products',
) {
  const baseGroups = productGroups
    .map((group) => {
      const entry = draftGroups[group.id];
      if (entry?.status === 'deleted') return null;
      return entry?.status === 'updated' ? { ...group, ...entry.data } : group;
    })
    .filter(Boolean);

  const newGroups = Object.entries(draftGroups)
    .filter(([, entry]) => entry.status === 'created')
    .map(([tempId, entry]) => ({ id: tempId, ...entry.data }));

  const allGroups = [...baseGroups, ...newGroups];

  const groupedServerItems = productGroups.flatMap((group) =>
    (group.products ?? []).map((item) => ({ ...item, groupId: group.id })),
  );

  const ungroupedServerItemsWithGroupId = ungroupedServerItems.map((item) => ({
    ...item,
    groupId: null,
  }));

  const allServerItems = [
    ...groupedServerItems,
    ...ungroupedServerItemsWithGroupId,
  ];

  const overriddenItems = allServerItems
    .map((item) => {
      const entry = draftItems[item.id];
      if (entry?.status === 'deleted') return null;
      if (entry?.status === 'updated')
        return { ...item, ...entry.data, id: item.id };
      return item;
    })
    .filter(Boolean);

  const draftCreatedItems = Object.entries(draftItems)
    .filter(([, entry]) => entry.status === 'created')
    .map(([tempId, entry]) => ({ ...entry.data, id: tempId }));

  const allItems = [...overriddenItems, ...draftCreatedItems];
  const byDisplayOrder = (a, b) =>
    (a.displayOrder ?? 0) - (b.displayOrder ?? 0);

  const sections = allGroups.map((group) => ({
    ...group,
    isUngrouped: false,
    [itemKey]: allItems
      .filter((item) => item.groupId === group.id)
      .sort(byDisplayOrder),
  }));

  const ungroupedItems = allItems
    .filter((item) => !item.groupId)
    .sort(byDisplayOrder);

  return [
    ...sections,
    {
      id: 'ungrouped',
      name: '그룹 없음',
      isUngrouped: true,
      [itemKey]: ungroupedItems,
    },
  ];
}
