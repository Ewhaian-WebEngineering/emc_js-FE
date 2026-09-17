let listeners = new Set();

let state = {
  boothId: null,
  boothFields: null,
  originalFields: null,
  thumbnail: { file: null, preview: null, removed: false },
  products: {},
  groups: {},
  notices: {},
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

export function initDraft(boothId, booth) {
  if (state.boothId === boothId && state.boothFields) return;

  const fields = {
    categories: booth.categories,
    isVegan: booth.isVegan,
    isEco: booth.isEco,
    operationTime: booth.operationTime,
    isCash: booth.isCash,
    externalUrl: booth.externalUrl ?? '',
    inquiryUrl: booth.inquiryUrl ?? '',
    description: booth.description ?? '',
    allergenInfo: booth.allergenInfo ?? '',
    guides: booth.guides ?? '',
  };

  setState({
    boothId,
    boothFields: fields,
    originalFields: fields,
    thumbnail: { file: null, preview: booth.thumbnailUrl, removed: false },
    products: {},
    groups: {},
    notices: {},
  });
}

export function updateBoothField(field, value) {
  setState({ boothFields: { ...state.boothFields, [field]: value } });
}

export function setThumbnail(file, preview) {
  setState({ thumbnail: { file, preview, removed: false } });
}

export function removeThumbnail() {
  setState({ thumbnail: { file: null, preview: null, removed: true } });
}

export function upsertProductDraft(key, entry) {
  setState({ products: { ...state.products, [key]: entry } });
}

export function markProductDeleted(key) {
  const existing = state.products[key];
  if (existing?.status === 'created') {
    const next = { ...state.products };
    delete next[key];
    setState({ products: next });
    return;
  }
  setState({
    products: {
      ...state.products,
      [key]: { status: 'deleted', data: existing?.data ?? { id: key } },
    },
  });
}

export function upsertGroupDraft(key, entry) {
  setState({ groups: { ...state.groups, [key]: entry } });
}

export function markGroupDeleted(key) {
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

export function upsertNoticeDraft(key, entry) {
  setState({ notices: { ...state.notices, [key]: entry } });
}

export function markNoticeDeleted(key) {
  const existing = state.notices[key];
  if (existing?.status === 'created') {
    const next = { ...state.notices };
    delete next[key];
    setState({ notices: next });
    return;
  }
  setState({
    notices: {
      ...state.notices,
      [key]: { status: 'deleted', data: existing?.data ?? { id: key } },
    },
  });
}

export function isDraftDirty() {
  const fieldsChanged =
    JSON.stringify(state.boothFields) !== JSON.stringify(state.originalFields);

  return (
    fieldsChanged ||
    Object.keys(state.products).length > 0 ||
    Object.keys(state.groups).length > 0 ||
    Object.keys(state.notices).length > 0 ||
    state.thumbnail.file !== null ||
    state.thumbnail.removed
  );
}

export function resetDraft() {
  state = {
    boothId: null,
    boothFields: null,
    originalFields: null,
    thumbnail: { file: null, preview: null, removed: false },
    products: {},
    groups: {},
    notices: {},
  };
  notify();
}
