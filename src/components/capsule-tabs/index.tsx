'use client';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

interface TabItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

interface CapsuleTabsProps {
  defaultActiveKey?: string;
  activeKey?: string; // 新增：从外部控制活动标签
  onTabChange?: (id: string) => void;
  tabClassName?: string;
  activeTabClassName?: string;
  activeTabBackgroundColor?: string;
  activeTabColor?: string;
  activeTabFontSize?: string;
  activeTabBorderRadius?: string;
  children: ReactElement<TabItemProps>[] | ReactElement<TabItemProps>;
}

export const CapsuleTabs: React.FC<CapsuleTabsProps> = ({
  children,
  defaultActiveKey,
  activeKey,
  onTabChange,
  tabClassName = '',
  activeTabClassName = 'font-600',
  activeTabBackgroundColor = '',
  activeTabColor = 'text-green',
  activeTabFontSize = '',
  activeTabBorderRadius = '',
}) => {
  const initialTab =
    activeKey ||
    defaultActiveKey ||
    (React.Children.toArray(children)[0] as ReactElement<TabItemProps>).props.id;
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (activeKey !== undefined) {
      setActiveTab(activeKey);
    }
  }, [activeKey]);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  useEffect(() => {
    const activeTabElement = tabsContainerRef.current?.querySelector(`[data-id="${activeTab}"]`);
    activeTabElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeTab]);

  const tabsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <div
        ref={tabsContainerRef}
        className="hide-scrollbars flex w-full snap-x gap-2 overflow-x-auto"
      >
        {React.Children.map(children, (child: ReactElement<TabItemProps>) => (
          <div
            data-id={child.props.id}
            className={`cursor-pointer snap-start whitespace-nowrap rounded-[84px] bg-gray-500 px-5 py-2 text-14 text-gray-100 ${
              child.props.id === activeTab
                ? `${activeTabBackgroundColor} ${activeTabColor} ${activeTabFontSize} ${activeTabBorderRadius} ${activeTabClassName}`
                : tabClassName
            }`}
            onClick={() => handleTabClick(child.props.id)}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      <div className="mt-2">
        {
          (
            React.Children.toArray(children).find(
              (child: React.ReactNode) =>
                React.isValidElement<TabItemProps>(child) && child.props.id === activeTab,
            ) as ReactElement<TabItemProps>
          ).props.children
        }
      </div>
    </main>
  );
};

export const TabItem: React.FC<TabItemProps> = ({ children }) => <>{children}</>;
