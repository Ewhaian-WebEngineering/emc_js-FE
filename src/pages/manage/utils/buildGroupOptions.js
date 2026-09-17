const NO_GROUP_OPTION = { value: null, label: '그룹 없음', hideActions: true };

export function buildGroupOptions(productGroups, draftGroups) {
  const base = productGroups
    .map((group) => {
      const entry = draftGroups[group.id];
      if (entry?.status === 'deleted') return null;
      const merged =
        entry?.status === 'updated' ? { ...group, ...entry.data } : group;
      return {
        value: merged.id,
        label: merged.name,
        description: merged.description,
      };
    })
    .filter(Boolean);

  const created = Object.entries(draftGroups)
    .filter(([, entry]) => entry.status === 'created')
    .map(([tempId, entry]) => ({
      value: tempId,
      label: entry.data.name,
      description: entry.data.description,
    }));

  return [NO_GROUP_OPTION, ...base, ...created];
}
