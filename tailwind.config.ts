import { type Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'dark-grey': '#313538',
      grey: '#828282',
      'light-grey': '#D3D3D3',
      'light-grey-2': '#BABABA',
      'light-grey-3': '#979797',
      'light-grey-4': '#ECECEC',
      'light-grey-5': '#F3F3F3',
      white: '#FFFFFF',
      brown: '#8B572A',
      black: '#000000',
      'light-black': '#3F3A3A',
      'fb-blue': '#3B5998',
      warning: '#FF9494',
    },
    width: {
      full: '100%',
      'img-w-sm': 'clamp(153px,calc(100vw/360*153),calc(153/360*1160px))',
    },
    height: {
      'img-h-sm': 'max(204px,calc(40vw/153*204))',
      'img-product-h-sm': 'min(1290.667px,calc(100vw/360*480))',
    },
    gap: {
      'img-container-gap-sm': 'clamp(6px,calc(100%/360*6),calc(6/360*1160px))',
    },
    margin: {
      'img-container-mb-sm': 'min(24px,calc(100vw/1280*50))',
    },
    padding: {
      'img-container-pt-sm': 'max(15px,calc(100vw/1280*50))',
      'img-container-pb-sm': 'max(30px,calc(100vw/1280*96))',
      'img-container-px-sm': 'max(24px,calc(100vw/1280*60))',
    },
    letterSpacing: {
      'product-text-sm': '0.15rem',
      'product-title-sm': '0.25rem',
      'product-id-sm': '0.2rem',
      'product-id-xl': '0.4rem',
      'product-var-sm': '0.175rem',
      'category-xl': '30px',
    },
    backgroundImage: {
      'loading-spinner': "url('../assets/images/loading.gif')",
      cart: "url('../assets/images/cart.png')",
      'cart-mobile': "url('../assets/images/cart-mobile.png')",
      'cart-hover': "url('../assets/images/cart-hover.png')",
      member: "url('../assets/images/member.png')",
      'member-mobile': "url('../assets/images/member-mobile.png')",
      'member-hover': "url('../assets/images/member-hover.png')",
      line: "url('../assets/images/line.png')",
      twitter: "url('../assets/images/twitter.png')",
      facebook: "url('../assets/images/facebook.png')",
      'cart-remove': "url('../assets/images/cart-remove.png')",
      'cart-remove-hover': "url('../assets/images/cart-remove-hover.png')",
      search: "url('../assets/images/search.png')",
      'search-hover': "url('../assets/images/search-hover.png')",
    },
    extend: {
      screens: {
        mobile: '0px',
        // => @media (min-width: 640px) { ... }

        mobile360: '360px',
        // => @media (min-width: 640px) { ... }

        desktop: '1280px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
} satisfies Config;
