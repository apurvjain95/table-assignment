import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "background-neutral-default": "var(--background-neutral-default)",
        "background-neutral-hovered": "var(--background-neutral-hovered)",
        "surface-neutral-default": "var(--surface-neutral-default)",
        "surface-neutral-hovered": "var(--surface-neutral-hovered)",
        "surface-primary-default": "var(--surface-primary-default)",
        "surface-primary-hovered": "var(--surface-primary-hovered)",
        "surface-primary-inverted": "var(--surface-primary-inverted)",
        "surface-critical-default": "var(--surface-critical-default)",
        "surface-critical-hovered": "var(--surface-critical-hovered)",
        "surface-success-default": "var(--surface-success-default)",
        "surface-success-hovered": "var(--surface-success-hovered)",
        "surface-secondary-orange-default":
          "var(--surface-secondary-orange-default)",
        "surface-secondary-orange-hovered":
          "var(--surface-secondary-orange-hovered)",
        "surface-secondary-blue-default":
          "var(--surface-secondary-blue-default)",
        "surface-secondary-blue-hovered":
          "var(--surface-secondary-blue-hovered)",
        "surface-secondary-yellow-default":
          "var(--surface-secondary-yellow-default)",
        "surface-secondary-yellow-hovered":
          "var(--surface-secondary-yellow-hovered)",
        "border-neutral-default": "var(--border-neutral-default)",
        "border-neutral-hovered": "var(--border-neutral-hovered)",
        "border-primary-default": "var(--border-primary-default)",
        "border-primary-hovered": "var(--border-primary-hovered)",
        "border-critical-default": "var(--border-critical-default)",
        "border-critical-hovered": "var(--border-critical-hovered)",
        "border-success-default": "var(--border-success-default)",
        "border-success-hovered": "var(--border-success-hovered)",
        "border-secondary-orange-default":
          "var(--border-secondary-orange-default)",
        "border-secondary-orange-hovered":
          "var(--border-secondary-orange-hovered)",
        "border-secondary-blue-default": "var(--border-secondary-blue-default)",
        "border-secondary-blue-hovered": "var(--border-secondary-blue-hovered)",
        "border-secondary-yellow-default":
          "var(--border-secondary-yellow-default)",
        "border-secondary-yellow-hovered":
          "var(--border-secondary-yellow-hovered)",
        "text-neutral-default": "var(--text-neutral-default)",
        "text-neutral-subdued": "var(--text-neutral-subdued)",
        "text-neutral-inverted": "var(--text-neutral-inverted)",
        "text-neutral-disabled": "var(--text-neutral-disabled)",
        "text-primary-default": "var(--text-primary-default)",
        "text-primary-subdued": "var(--text-primary-subdued)",
        "text-primary-inverted": "var(--text-primary-inverted)",
        "text-primary-disabled": "var(--text-primary-disabled)",
        "text-critical-default": "var(--text-critical-default)",
        "text-critical-subdued": "var(--text-critical-subdued)",
        "text-critical-inverted": "var(--text-critical-inverted)",
        "text-critical-disabled": "var(--text-critical-disabled)",
        "text-success-default": "var(--text-success-default)",
        "text-success-subdued": "var(--text-success-subdued)",
        "text-success-inverted": "var(--text-success-inverted)",
        "text-secondary-orange-default": "var(--text-secondary-orange-default)",
        "text-secondary-orange-subdued": "var(--text-secondary-orange-subdued)",
        "text-secondary-orange-inverted":
          "var(--text-secondary-orange-inverted)",
        "text-secondary-blue-default": "var(--text-secondary-blue-default)",
        "text-secondary-blue-subdued": "var(--text-secondary-blue-subdued)",
        "text-secondary-blue-inverted": "var(--text-secondary-blue-inverted)",
        "text-secondary-yellow-default": "var(--text-secondary-yellow-default)",
        "text-secondary-yellow-subdued": "var(--text-secondary-yellow-subdued)",
        "text-secondary-yellow-inverted":
          "var(--text-secondary-yellow-inverted)",
        "action-primary-default": "var(--action-primary-default)",
        "action-primary-hovered": "var(--action-primary-hovered)",
        "action-primary-disabled": "var(--action-primary-disabled)",
        "action-critical-default": "var(--action-critical-default)",
        "action-critical-hovered": "var(--action-critical-hovered)",
        "action-critical-disabled": "var(--action-critical-disabled)",
      },
      fontSize: {
        "label-sm": [
          "0.75rem",
          {
            lineHeight: "135%",
            fontWeight: "600",
          },
        ],
        "label-xs": [
          "0.625rem",
          {
            lineHeight: "135%",
            fontWeight: "600",
          },
        ],
        "label-xl": [
          "1.25rem",
          {
            lineHeight: "140%",
            fontWeight: "600",
          },
        ],
        "body-xs-regular": [
          "0.75rem",
          {
            lineHeight: "150%",
            fontWeight: "400",
          },
        ],
        "body-xs-medium": [
          "0.75rem",
          {
            lineHeight: "150%",
            fontWeight: "500",
          },
        ],
        "body-sm-regular": [
          "0.875rem",
          {
            lineHeight: "145%",
            fontWeight: "400",
          },
        ],
        "body-sm-medium": [
          "0.875rem",
          {
            lineHeight: "145%",
            fontWeight: "500",
          },
        ],
        "body-lg-regular": [
          "1rem",
          {
            lineHeight: "150%",
            fontWeight: "400",
          },
        ],
        "body-lg-medium": [
          "1rem",
          {
            lineHeight: "150%",
            fontWeight: "500",
          },
        ],
        "body-xl-medium": [
          "1.5rem",
          {
            lineHeight: "140%",
            fontWeight: "500",
          },
        ],
        "body-xl-semibold": [
          "1.5rem",
          {
            lineHeight: "140%",
            fontWeight: "600",
          },
        ],
        "body-2xl-medium": [
          "1.75rem",
          {
            lineHeight: "130%",
            fontWeight: "500",
          },
        ],
        "body-2xl-semibold": [
          "1.75rem",
          {
            lineHeight: "130%",
            fontWeight: "600",
          },
        ],
        logo: [
          "1.625rem",
          {
            fontWeight: "500",
          },
        ],
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)"],
      },
      keyframes: {
        lineLoad: {
          "0%, 100%": {
            left: "-40%",
          },
          "50%": {
            left: "90%",
          },
        },
      },
      animation: {
        lineLoad: "lineLoad 2.5s ease-in-out infinite",
      },
      screens: {
        xs: "300px",
        sm: "512px",
        md: "1024px",
        lg: "1280px",
        xl: "1536px",
      },
    },
  },
};
export default config;
