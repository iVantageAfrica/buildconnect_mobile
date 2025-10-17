/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './utils/**/*.{html,js,jsx,ts,tsx,mdx}',
    './*.{html,js,jsx,ts,tsx,mdx}',
    './src/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['WorkSans_400Regular'],
        'work-sans-medium': ['WorkSans_500Medium'],
        'work-sans-semibold': ['WorkSans_600SemiBold'],
        'work-sans-bold': ['WorkSans_700Bold'],
      },
    },
  },
  plugins: [],
}