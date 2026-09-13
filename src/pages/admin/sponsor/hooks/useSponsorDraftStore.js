import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../store/sponsorDraftStore';

export function useSponsorDraftStore() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
