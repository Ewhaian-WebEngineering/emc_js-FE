export function normalizeGeneralBooths(apiBooths) {
  return apiBooths.map((b) => ({
    id: b.id,
    boothNumber: b.boothNumber,
    name: b.name,
    type: 'general',
  }));
}

export function normalizeSponsorBooths(apiSponsors) {
  return apiSponsors.map((s) => ({
    id: s.id,
    boothNumber: s.boothNumber ?? null, // TODO: 서버 필드 추가 시 null 처리 제거
    name: s.name,
    type: 'sponsor',
  }));
}
