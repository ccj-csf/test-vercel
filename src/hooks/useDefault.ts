import { noop } from 'lodash-es';
import { useState } from 'react';

export interface ChangeHandler<T, P extends any[]> {
  (value: T, ...args: P): void;
}

export function useDefault<T, P extends any[]>(
  value: T,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
): [T, ChangeHandler<T, P>] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  if (typeof value !== 'undefined') {
    return [value, onChange || noop];
  }

  return [
    internalValue,
    (newValue, ...args) => {
      setInternalValue(newValue);
      if (typeof onChange === 'function') {
        onChange(newValue, ...args);
      }
    },
  ];
}
