import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './node_modules/nxglabs-ui/**/*.{js}'],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        'clash-grotesk': ['var(--font-grotesk-grotesk)'],
      },
      fontWeight: {
        'extra-light': '200',
        light: '300',
        regular: '400',
        medium: '500',
        'semi-bold': '600',
        bold: '700',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      colors: {
        border: {
          gray: '#ECEEF1',
        },
        blue: {
          DEFAULT: '#3478F5',
        },
        green: {
          DEFAULT: '#B5F8A6',
        },
        gray: {
          100: '#f2f5f8',
          200: '#e1e4ec',
          300: '#c5c5d0',
          350: '#898992',
          400: '#7C7C80',
          500: '#545456',
          600: '#44454a',
          700: '#3c3c3c',
          800: '#343435',
          900: '#303030',
        },
        yellow: {
          DEFAULT: '#FCD932',
        },
        purple: {
          DEFAULT: '#644491',
          100: '#9A82FC',
        },
      },
      fontSize: {
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        17: '17px',
        18: '18px',
        19: '19px',
        20: '20px',
        21: '21px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        34: '34px',
        36: '36px',
        38: '38px',
        40: '40px',
        42: '42px',
        44: '44px',
        46: '46px',
        48: '48px',
      },
      borderRadius: {
        2: '4px',
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        18: '18px',
        24: '24px',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        CD: "url('/icons/CD.svg')",
        mine: "url('/icons/mine-bg.svg')",
        login: "url('/icons/login-bg.svg')",
        'icon-gradient': 'linear-gradient(135deg, #FFB8FF, #FEFF88, #B5F8A6)',
        // 添加更多自定义背景图片
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/aspect-ratio')],
} satisfies Config;

export default config;
