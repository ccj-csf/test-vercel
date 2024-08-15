export const startVibrate = (pattern: number = 0) => {
  if (pattern) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  } else {
    window?.Telegram?.WebApp.HapticFeedback.impactOccurred('heavy');
  }
};
