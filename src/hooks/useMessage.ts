import { useCallback } from 'react';
import { toast as baseToast, ExternalToast } from 'sonner';

// 默认时长
const duration = 2000;
interface UseToastOptions extends ExternalToast {}

function useMessage() {
  // 成功提示
  const showSuccess = useCallback((message: string, options?: UseToastOptions) => {
    baseToast.success(message, {
      // 这里可以设置默认选项，并允许通过options覆盖
      duration,
      ...options,
    });
  }, []);

  // 错误提示
  const showError = useCallback((message: string, options?: UseToastOptions) => {
    baseToast.error(message, {
      duration,
      ...options,
    });
  }, []);

  return { showSuccess, showError, showMessage: baseToast };
}

export { useMessage };
