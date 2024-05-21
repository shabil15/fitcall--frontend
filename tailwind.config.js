/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors :{
        primary: '#3BE48B',
        secondary:'#241F20',
    },
    fontFamily: {
      customFont: ['"Mulish"', "sans-serif"],

    },
  },
  plugins: [
    require('daisyui'),
  ],
}
}

