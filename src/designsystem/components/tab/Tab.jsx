import { useLayoutEffect, useRef, useState } from 'react';
import { TabMenu, TabMenuItem, TabIndicator } from './style';

/**
 * 탭 컴포넌트입니다.
 *
 * @param {Array<{label: string, content: ReactNode}>} tabs - 탭 목록
 * @param {'default'|'categoryFilter'} [variant="default"] - 탭 스타일
 */
export default function Tab({
  tabs,
  variant = 'default',
  activeTab: controlledActiveTab,
  onTabChange,
}) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabMenuRef = useRef(null);
  const tabRefs = useRef([]);

  const isControlled = controlledActiveTab !== undefined;
  const activeTabIndex = isControlled
    ? tabs.findIndex(
        (tab) => (tab.id ?? tab.value ?? tab.key) === controlledActiveTab,
      )
    : internalActiveTab;
  const resolvedActiveTab = activeTabIndex >= 0 ? activeTabIndex : 0;

  const selectTabHandler = (index) => {
    if (!isControlled) {
      setInternalActiveTab(index);
    }

    if (onTabChange) {
      const selectedTab = tabs[index];
      const tabKey =
        selectedTab?.id ?? selectedTab?.value ?? selectedTab?.key ?? index;
      onTabChange(tabKey);
    }
  };

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeTabNode = tabRefs.current[resolvedActiveTab];
      if (!activeTabNode) return;

      setIndicator({
        left: activeTabNode.offsetLeft,
        width: activeTabNode.offsetWidth,
      });
    };

    updateIndicator();

    const resizeObserver = new ResizeObserver(updateIndicator);
    if (tabMenuRef.current) resizeObserver.observe(tabMenuRef.current);

    window.addEventListener('resize', updateIndicator);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [resolvedActiveTab, tabs]);

  return (
    <>
      <TabMenu ref={tabMenuRef} variant={variant}>
        {tabs.map((tab, index) => (
          <TabMenuItem
            key={index}
            ref={(node) => (tabRefs.current[index] = node)}
            variant={variant}
            isActive={resolvedActiveTab === index}
            onClick={() => selectTabHandler(index)}
          >
            {tab.label}
          </TabMenuItem>
        ))}
        <TabIndicator left={indicator.left} width={indicator.width} />
      </TabMenu>
      <div>{tabs[resolvedActiveTab]?.content}</div>
    </>
  );
}
