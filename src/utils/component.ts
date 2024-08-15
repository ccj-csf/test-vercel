import { clsx, type ClassValue } from 'clsx';
import { assign, keys } from 'lodash-es';
import type { CSSProperties, ReactElement } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
export interface NativeProps<S extends string = never> {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
}

export const withNativeProps = <P extends NativeProps>(props: P, element: ReactElement) => {
  const elementProps = element.props;
  const nativeProps: NativeProps & Record<string, any> = {};
  if (props.className) {
    nativeProps.className = cn(elementProps.className, props.className);
  }
  if (props.style) {
    nativeProps.style = assign({}, elementProps.style, props.style);
  }
  keys(props).forEach((key) => {
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      nativeProps[key] = (props as typeof nativeProps)[key];
    }
  });
  if (keys(nativeProps).length) {
    return React.cloneElement(element, assign({}, elementProps, nativeProps));
  }
  return element;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
