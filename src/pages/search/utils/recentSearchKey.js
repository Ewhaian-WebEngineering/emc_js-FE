function getGuestId() {
  const KEY = 'guest_id';
  let guestId = localStorage.getItem(KEY);
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem(KEY, guestId);
  }
  return guestId;
}

export function getRecentSearchKey(userId) {
  return userId
    ? `recentSearches:user:${userId}`
    : `recentSearches:guest:${getGuestId()}`;
}
