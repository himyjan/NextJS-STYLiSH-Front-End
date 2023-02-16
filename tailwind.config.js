/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "dark-grey": "#313538",
      grey: "#828282",
      "light-grey": "#D3D3D3",
      white: "#FFFFFF",
      brown: "#8B572A",
    },
    width: {
      full: "100%",
      "img-w-sm": "clamp(153px,calc(100vw/360*153),calc(153/360*1160px))",
    },
    height: {
      "img-h-sm": "max(204px,calc(40vw/153*204))",
    },
    gap: {
      "img-container-gap-sm": "clamp(6px,calc(100%/360*6),calc(6/360*1160px))",
    },
    margin: {
      "img-container-mb-sm": "min(24px,calc(100vw/1280*50))",
    },
    padding: {
      "img-container-pt-sm": "max(15px,calc(100vw/1280*50))",
      "img-container-pb-sm": "max(30px,calc(100vw/1280*96))",
      "img-container-px-sm": "max(24px,calc(100vw/1280*60))",
    },
    letterSpacing: {
      "product-text-sm": "0.15rem",
    },
    backgroundImage: {
      "loading-spinner": "url('../assets/images/loading.gif')",
      cart: "url('../assets/images/cart.png')",
      "cart-mobile": "url('../assets/images/cart-mobile.png')",
      "cart-hover": "url('../assets/images/cart-hover.png')",
      member: "url('../assets/images/member.png')",
      "member-mobile": "url('../assets/images/member-mobile.png')",
      "member-hover": "url('../assets/images/member-hover.png')",
      line: "url('../assets/images/line.png')",
      twitter: "url('../assets/images/twitter.png')",
      facebook: "url('../assets/images/facebook.png')",
    },
    extend: {},
  },
  plugins: [],
};
