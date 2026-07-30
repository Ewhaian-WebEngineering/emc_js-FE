import { useCallback, useEffect, useRef, useState } from 'react';

export function useScrollSpyTabs(tabs, offset = 0) {
  const sectionRefs = useRef({});
  const sectionOffsetsRef = useRef({});
  const activeTabRef = useRef(tabs[0]?.id);
  const isProgrammaticScrollRef = useRef(false);
  const fallbackTimerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const measureOffsets = useCallback(() => {
    const offsets = {};
    for (const tab of tabs) {
      const el = sectionRefs.current[tab.id];
      if (!el) continue;
      offsets[tab.id] = el.getBoundingClientRect().top + window.scrollY;
    }
    sectionOffsetsRef.current = offsets;
  }, [tabs]);

  useEffect(() => {
    measureOffsets();

    const resizeObserver = new ResizeObserver(measureOffsets);
    Object.values(sectionRefs.current).forEach((el) => {
      el && resizeObserver.observe(el);
    });
    window.addEventListener('resize', measureOffsets);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureOffsets);
    };
  }, [measureOffsets]);

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      const currentScrollY = window.scrollY;
      let visibleTab = tabs[0]?.id;

      for (const tab of tabs) {
        const top = sectionOffsetsRef.current[tab.id];
        if (top === undefined) continue;
        if (top - offset <= currentScrollY) {
          visibleTab = tab.id;
        }
      }

      if (activeTabRef.current !== visibleTab) {
        activeTabRef.current = visibleTab;
        setActiveTab(visibleTab);
      }
    };

    const handleScrollEnd = () => {
      isProgrammaticScrollRef.current = false;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [tabs, offset]);

  const scrollToTab = useCallback(
    (tabId) => {
      activeTabRef.current = tabId;
      setActiveTab(tabId);
      isProgrammaticScrollRef.current = true;
      clearTimeout(fallbackTimerRef.current);

      const el = sectionRefs.current[tabId];
      if (!el) {
        isProgrammaticScrollRef.current = false;
        return;
      }

      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      fallbackTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 500);
    },
    [offset],
  );

  const registerSection = useCallback(
    (tabId) => (el) => {
      sectionRefs.current[tabId] = el;
    },
    [],
  );

  return {
    activeTab,
    scrollToTab,
    registerSection,
  };
}
