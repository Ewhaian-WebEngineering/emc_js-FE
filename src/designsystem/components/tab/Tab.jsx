import { useLayoutEffect, useRef, useState } from 'react';
import { TabMenu, TabMenuItem, TabIndicator, TabList } from './style';

/**
 * 탭 컴포넌트입니다.
 *
 * @param {Array<{label: string, content: ReactNode, id?: string, value?: string, key?: string}>} tabs - 탭 목록
 * @param {'default'|'categoryFilter'} [variant="default"] - 탭 스타일
 * @param {number|string} [activeTab] - 현재 활성화된 탭 인덱스 또는 탭 식별 값
 * @param {Function} [onChange] - 탭 변경 시 호출되는 콜백 함수
 * @param {Function} [onTabChange] - 탭 식별 값을 전달하는 콜백 함수
 */
export default function Tab({
  tabs,
  variant = 'default',
  activeTab: controlledActiveTab,
  onChange,
  onTabChange,
}) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);

export default function Tab({ tabs, variant = 'default' }) {
  const [activeTab, setActiveTab] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabMenuRef = useRef(null);
  const tabRefs = useRef([]);

  const selectTabHandler = (index) => {
    if (!isControlled) {
      setInternalActiveTab(index);
    }

    const selectedTab = tabs[index];
    const tabKey =
      selectedTab?.id ?? selectedTab?.value ?? selectedTab?.key ?? index;

    onChange?.(selectedTab);
    onTabChange?.(tabKey);
    setActiveTab(index);
  };

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeTabNode = tabRefs.current[activeTab];
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
  }, [activeTab, tabs]);

  return (
    <>
      <TabMenu ref={tabMenuRef} variant={variant}>
        <TabList>
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
        </TabList>
        {tabs.map((tab, index) => (
          <TabMenuItem
            key={index}
            ref={(node) => (tabRefs.current[index] = node)}
            variant={variant}
            isActive={activeTab === index}
            onClick={() => selectTabHandler(index)}
          >
            {tab.label}
          </TabMenuItem>
        ))}
        <TabIndicator left={indicator.left} width={indicator.width} />
      </TabMenu>
      <div>{tabs[activeTab].content}</div>
    </>
  );
}
