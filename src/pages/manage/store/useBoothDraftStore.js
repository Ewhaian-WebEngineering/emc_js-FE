import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot } from './boothDraftStore';

export function useBoothDraftStore() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
