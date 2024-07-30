import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colorOne: "#e87d20",
        colorTwo: "#333333",
        colorThree: "#e87d2051",
        colorFour: "#e9eef6",
      },
      backgroundImage: {

      },
    },
  },
  plugins: [],
};
export default config;
