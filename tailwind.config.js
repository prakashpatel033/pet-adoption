/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
    content: [
      "./*.html", // Add this to include root HTML files
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
    ],
    theme: {
      screens: {
        'sm': '640px',    // Small screens (mobile)
        'md': '768px',    // Medium screens (tablets)
        'lg': '1024px',   // Large screens (laptops)
        'xl': '1280px',   // Extra large screens (desktops)
        '2xl': '1536px',  // 2X large screens
      },
      extend: {
        container: {
          center: true,
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
          },
        },
      },
    },
    plugins: [
    
    ],
  }