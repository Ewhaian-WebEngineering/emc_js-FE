let listeners = new Set();

let state = {
  sponsorId: null,
  sponsorFields: null,
  originalFields: null,
  thumbnail: { file: null, preview: null, removed: false },
  items: {},
  groups: {},
};

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return state;
}

function setState(partial) {
  state = { ...state, ...partial };
  notify();
}

export function initSponsorDraft(sponsor, { force = false } = {}) {
  const sponsorId = sponsor?.id ?? null;
  if (!force && state.sponsorFields && state.sponsorId === sponsorId) return;

  const fields = {
    name: sponsor?.name ?? '',
    location: sponsor?.location ?? '',
    operationTime: sponsor?.operationTime ?? 'all_day',
    snsUrl: sponsor?.snsUrl ?? '',
    externalUrl: sponsor?.externalUrl ?? '',
    introShort: sponsor?.introShort ?? '',
    description: sponsor?.description ?? '',
    ungroupedDisplayOrder:
      sponsor?.ungroupedDisplayOrder ?? Number.MAX_SAFE_INTEGER,
  };

  setState({
    sponsorId,
    sponsorFields: fields,
    originalFields: fields,
    thumbnail: { file: null, preview: sponsor?.imageUrl ?? '', removed: false },
    items: {},
    groups: {},
  });
}

export function updateSponsorField(field, value) {
  if (!state.sponsorFields) return;
  setState({ sponsorFields: { ...state.sponsorFields, [field]: value } });
}

export function setSponsorThumbnail(file, preview) {
  setState({ thumbnail: { file, preview, removed: false } });
}

export function removeSponsorThumbnail() {
  setState({ thumbnail: { file: null, preview: '', removed: true } });
}

export function upsertSponsorItemDraft(key, entry) {
  setState({ items: { ...state.items, [key]: entry } });
}

export function markSponsorItemDeleted(key) {
  const existing = state.items[key];
  if (existing?.status === 'created') {
    const next = { ...state.items };
    delete next[key];
    setState({ items: next });
    return;
  }
  setState({
    items: {
      ...state.items,
      [key]: { status: 'deleted', data: existing?.data ?? { id: key } },
    },
  });
}

export function upsertSponsorGroupDraft(key, entry) {
  setState({ groups: { ...state.groups, [key]: entry } });
}

export function markSponsorGroupDeleted(key) {
  const existing = state.groups[key];
  if (existing?.status === 'created') {
    const next = { ...state.groups };
    delete next[key];
    setState({ groups: next });
    return;
  }
  setState({
    groups: {
      ...state.groups,
      [key]: { status: 'deleted', data: existing?.data ?? { id: key } },
    },
  });
}

export function reassignSponsorItemsGroup(items, groupId) {
  const updates = {};

  items.forEach((item) => {
    if (state.items[item.id]?.status === 'deleted') return;

    if (item.status === 'created') {
      updates[item.id] = {
        status: 'created',
        data: { ...(state.items[item.id]?.data ?? {}), groupId },
      };
      return;
    }

    updates[item.id] = {
      status: 'updated',
      data: { ...(state.items[item.id]?.data ?? {}), groupId },
    };
  });

  setState({ items: { ...state.items, ...updates } });
}

export function isSponsorDraftDirty() {
  const fieldsChanged =
    JSON.stringify(state.sponsorFields) !==
    JSON.stringify(state.originalFields);

  return (
    fieldsChanged ||
    Object.keys(state.items).length > 0 ||
    Object.keys(state.groups).length > 0 ||
    state.thumbnail.file !== null ||
    state.thumbnail.removed
  );
}

export function resetSponsorDraft() {
  state = {
    sponsorId: null,
    sponsorFields: null,
    originalFields: null,
    thumbnail: { file: null, preview: null, removed: false },
    items: {},
    groups: {},
  };
  notify();
}

export function resetUngroupedDisplayOrder() {
  if (!state.sponsorFields) return;
  setState({
    sponsorFields: {
      ...state.sponsorFields,
      ungroupedDisplayOrder: Number.MAX_SAFE_INTEGER,
    },
  });
}

export function restoreSponsorGroupsAndItems({ groups, items }) {
  setState({ groups, items });
}
