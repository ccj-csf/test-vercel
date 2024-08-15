'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface AccordionProps {
  title: string | React.ReactNode;
  description?: string; // 可选的描述文本
  children: React.ReactNode;
  isOpen?: boolean;
  disableToggle?: boolean; // 新增禁用折叠的属性
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  description,
  children,
  isOpen = false,
  disableToggle = false, // 默认不禁用折叠功能
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(isOpen ? 'auto' : '0px');

  const toggleExpand = () => {
    if (!disableToggle) {
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      // 设置为内容的 scrollHeight 后再设置为 'auto'
      const contentHeight = `${contentRef.current?.scrollHeight}px`;
      setHeight(contentHeight);

      // 在设置 height 为 scrollHeight 后稍作延迟，再设置为 auto，以保留过渡效果
      const timeout = setTimeout(() => setHeight('auto'), 300);

      return () => clearTimeout(timeout);
    } else {
      setHeight(`${contentRef.current?.scrollHeight}px`); // 设置为内容高度
      requestAnimationFrame(() => setHeight('0px')); // 然后立即将 height 设为 0px
    }
  }, [isExpanded]);

  return (
    <div className="w-full rounded-12 bg-white">
      <div
        className={`flex w-full cursor-pointer items-center justify-between px-3 py-[14px] ${
          disableToggle ? 'cursor-default' : ''
        }`}
        onClick={toggleExpand}
      >
        <div>
          <h2 className="text-lg">{title}</h2>
          {description && <p className="text-13 font-light text-gray-600">{description}</p>}
        </div>
        {!disableToggle && (
          <div className="text-gray-500">
            {isExpanded ? (
              <ChevronUp className="text-gray-300" />
            ) : (
              <ChevronDown className="text-gray-300" />
            )}
          </div>
        )}
      </div>
      {/* 条件渲染分割线 */}
      {isExpanded && <hr className="mb-3 w-full border-0.5 border-border-gray" />}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ height }}
      >
        <div className="px-3 pb-[14px]">{children}</div>
      </div>
    </div>
  );
};

export { Accordion };
