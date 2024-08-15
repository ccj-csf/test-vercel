// src/services/toastService.ts
import { toast as baseToast, ExternalToast } from 'sonner';

interface ToastOptions extends ExternalToast {}

class MessageUtils {
  static showSuccess(message: string, options?: ToastOptions): void {
    baseToast.success(message, {
      duration: 3000,
      ...options,
    });
  }

  static showError(message: string, options?: ToastOptions): void {
    baseToast.error(message, {
      duration: 3000,
      ...options,
    });
  }
}

export { MessageUtils };
