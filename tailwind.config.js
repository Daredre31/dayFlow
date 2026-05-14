/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        bg : "var(--bg)",
        surface : "var(--surface )",
        surface2: "var(--surface2)",
        surface3: "var(--surface3)",
        border:"var(--border )",
        amber :"var(--amber)",
        accent :"var(--accent)",
        accent: "var(--accent2)",
        green: "var(--green)",
        red: "var(--red)",
        text:"var(--text)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)"
      }
    },
  },
  plugins: [],
}

