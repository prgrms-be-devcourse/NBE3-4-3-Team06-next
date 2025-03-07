/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",  // ✅ Tailwind가 적용될 파일 경로
    ],
    theme: {
      extend: {
        fontFamily: {
          jersey: ["Jersey 25", "sans-serif"],  // ✅ Jersey 25 폰트 추가
        },
      },
    },
    plugins: [],
  };
  