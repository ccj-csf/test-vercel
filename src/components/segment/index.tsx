'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface SegmentItem {
  id: string;
  title: string;
  content?: React.ReactNode;
}

export interface SegmentProps {
  segments: SegmentItem[];
  activeSegment: string;
  onChange: (segmentId: string) => void;
  height?: string | number;
  borderRadius?: string | number;
  sticky?: boolean; // 新增 sticky 属性
  stickyTop?: string | number; // 用于设置 sticky 的顶部偏移量
}

const Segment: React.FC<SegmentProps> = ({
  segments,
  activeSegment,
  onChange,
  height = 'auto',
  borderRadius = '7px',
  sticky = false,
  stickyTop = 0, // 默认顶部偏移量为0
}) => {
  const segmentRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [activeSegmentElementStyles, setActiveSegmentElementStyles] = useState<React.CSSProperties>(
    {},
  );

  const formatStyleValue = (value: string | number) =>
    typeof value === 'number' ? `${value}px` : value;

  const updateActiveSegmentStyle = useCallback(() => {
    const activeSegmentElement = segmentRefs.current.get(activeSegment);
    if (activeSegmentElement) {
      const { offsetLeft, offsetWidth } = activeSegmentElement;
      setActiveSegmentElementStyles({
        left: offsetLeft,
        width: offsetWidth,
        height: `calc(${formatStyleValue(height)} - 4px)`,
        transition: 'left 300ms ease-out, width 200ms ease-out',
      });
    }
  }, [activeSegment, height]);

  useEffect(() => {
    updateActiveSegmentStyle();
  }, [activeSegment, updateActiveSegmentStyle]);

  return (
    <div className="relative flex w-full flex-col">
      <div
        className={`relative flex w-full rounded bg-gray-200 ${sticky ? 'sticky' : ''}`}
        style={
          sticky
            ? {
                top: formatStyleValue(stickyTop),
                zIndex: 10,
                borderRadius: formatStyleValue(borderRadius),
              }
            : { borderRadius: formatStyleValue(borderRadius) }
        }
      >
        {segments.map((segment) => (
          <button
            key={segment.id}
            ref={(el) => {
              if (el) {
                segmentRefs.current.set(segment.id, el);
              } else {
                segmentRefs.current.delete(segment.id);
              }
            }}
            className={`relative z-10 flex-1 px-6 py-2 font-medium
                       ${segment.id === activeSegment ? 'text-black' : 'text-gray-400'}`}
            style={{
              borderRadius: formatStyleValue(borderRadius),
            }}
            onClick={() => onChange(segment.id)}
          >
            {segment.title}
          </button>
        ))}
        <div
          className="absolute bottom-[2px] left-0 top-[2px] z-0 rounded-lg bg-white"
          style={{
            ...activeSegmentElementStyles,
            borderRadius: formatStyleValue(borderRadius),
          }}
        />
      </div>
      <div className="relative mt-2 w-full text-black">
        {segments.find((segment) => segment.id === activeSegment)?.content}
      </div>
    </div>
  );
};

Segment.displayName = 'Segment';
export { Segment };
