
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.html',
     './node_modules/flowbite/**/*.js',
     flowbite.content()
  ],
  theme: {
    extend: {
      colors:{
        'custom-gray': '#999',
        'custom-yellow':'#ffff80',
        'custom-red':'#ff9fff',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin()
  ],
}

