module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: {
        standard: [/w-\w+/, /h-\w+/]
      }
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
