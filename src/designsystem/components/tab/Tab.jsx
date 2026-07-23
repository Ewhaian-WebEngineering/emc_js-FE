import { useLayoutEffect, useRef, useState } from 'react';
import { TabMenu, TabMenuItem, TabIndicator } from './style';

/**
 * 탭 컴포넌트입니다.
 *
 * @param {Array<{label: string, content: ReactNode}>} tabs - 탭 목록
 * @param {'default'|'categoryFilter'} [variant="default"] - 탭 스타일
 * @param {Function} [onChange] - 탭 변경 시 호출되는 콜백 함수
 */
export default function Tab({ tabs, variant = 'default', onChange }) {
  const [activeTab, setActiveTab] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabMenuRef = useRef(null);
  const tabRefs = useRef([]);

  const selectTabHandler = (index) => {
    setActiveTab(index);
    onChange?.(tabs[index]);
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
    </>
  );
}
