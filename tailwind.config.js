/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  extend: {
    colors: {
      main: '#e6ecf3',
      chatBubble: '#F1F2F4',
      chatBubbleBorder: '#D8D8D8',
    },
    borderRadius: {
      chatBubble: '16px',
    },
    boxShadow: {
      chatBubble: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    padding: {
      chatBubble: '16px',
    },
    margin: {
      chatBubble: '8px',
    },
  },
  plugins: [],
}
