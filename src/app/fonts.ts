import localFont from 'next/font/local';

export const clashGrotesk = localFont({
  src: [
    {
      path: './fonts/ClashGrotesk-Extralight.otf',
      weight: '200',
    },
    {
      path: './fonts/ClashGrotesk-Light.otf',
      weight: '300',
    },
    {
      path: './fonts/ClashGrotesk-Medium.otf',
      weight: '500',
    },
    {
      path: './fonts/ClashGrotesk-Regular.otf',
      weight: '400',
    },
    {
      path: './fonts/ClashGrotesk-Semibold.otf',
      weight: '600',
    },
    {
      path: './fonts/ClashGrotesk-Bold.otf',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-grotesk-grotesk',
});
