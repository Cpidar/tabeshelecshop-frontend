const path = require("path")
const defaultTheme = require("tailwindcss/defaultTheme")

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`
    }
    return `rgb(var(${cssVar}))`
  }
}
module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xl: "40px",
        "2xl": "128px",
      },
    },
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
        primary: {
          50: customColors("--c-primary-50"),
          100: customColors("--c-primary-100"),
          200: customColors("--c-primary-200"),
          300: customColors("--c-primary-300"),
          400: customColors("--c-primary-400"),
          500: customColors("--c-primary-500"),
          6000: customColors("--c-primary-600"),
          700: customColors("--c-primary-700"),
          800: customColors("--c-primary-800"),
          900: customColors("--c-primary-900"),
        },
        secondary: {
          50: customColors("--c-secondary-50"),
          100: customColors("--c-secondary-100"),
          200: customColors("--c-secondary-200"),
          300: customColors("--c-secondary-300"),
          400: customColors("--c-secondary-400"),
          500: customColors("--c-secondary-500"),
          6000: customColors("--c-secondary-600"),
          700: customColors("--c-secondary-700"),
          800: customColors("--c-secondary-800"),
          900: customColors("--c-secondary-900"),
        },
        neutral: {
          50: customColors("--c-neutral-50"),
          100: customColors("--c-neutral-100"),
          200: customColors("--c-neutral-200"),
          300: customColors("--c-neutral-300"),
          400: customColors("--c-neutral-400"),
          500: customColors("--c-neutral-500"),
          6000: customColors("--c-neutral-600"),
          700: customColors("--c-neutral-700"),
          800: customColors("--c-neutral-800"),
          900: customColors("--c-neutral-900"),
        },
        // borobazar config
        brand: {
          DEFAULT: "#02b290",
          dark: "#000000",
          light: "#ffffff",
          muted: "#595959",
          tree: "#6fb48e",
          "tree-dark": "#0B4635",
          danger: "#dc2626",
        },
        yellow: {
          DEFAULT: "#f98f14",
          100: "#f3b81f",
          200: "#ffc33c",
          300: "#edc537",
        },
        fill: {
          base: "#f3f6f9",
          secondary: "#f8f9fb",
          thumbnail: "#f3f6fa",
          "dropdown-hover": "#f6f9fc",
          one: "#f1f6f9",
          two: "#f2f2f2",
          three: "#e8ebf0",
          four: "#e5eaf1",
        },
        // border: {
        //   base: "#e7ecf0",
        //   one: "#e3e8ec",
        //   two: "#e2e8f0",
        //   three: "#e6e6e6",
        //   four: "#dee5ea",
        // },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      screens: {
        '3xl': '1780px',
        '4xl': '1921px',
      },
      spacing: {
        '430px': '430px',
        '450px': '450px',
        '500px': '500px',
        '64vh': '64vh',
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
        "10px": ".625rem",
        "13px": "13px",
        "15px": "15px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        body: ["system-ui", "sans-serif"],
        heading: ["system-ui", "sans-serif"],
        manrope: ["'Manrope', sans-serif"],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        shine: {
          "100%": { left: "125%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        shine: "shine 0.8s ease-in",
        ping: "ping 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      // textColor: {
      //   body: withOpacity("--text-base"),
      //   "body-dark": withOpacity("--text-base-dark"),
      //   muted: withOpacity("--text-muted"),
      //   "muted-light": withOpacity("--text-muted-light"),
      //   heading: withOpacity("--text-heading"),
      //   "sub-heading": withOpacity("--text-sub-heading"),
      //   bolder: withOpacity("--text-text-bolder"),
      // },
      minHeight: {
        580: "580px",
        140: "35rem", // 560px
        40: "10rem", // 140px
        6: "2.5rem",
      },
      height: {
        4.5: "1.125rem",
        13: "3.125rem",
        22: "5.25rem",
        double: "200%",
      },
      maxHeight: {
        "70vh": "70vh",
        "85vh": "85vh",
        140: "35rem", // 560px
      },
      maxWidth: {
        "8xl": "100rem",
        1920: "1920px",
      },
      minWidth: {
        150: "150px",
      },
      borderRadius: {
        DEFAULT: "5px",
      },
      inset: {
        22: "5.25rem",
      },
      strokeWidth: {
        2.5: "2.5",
      },
      boxShadow: {
        200: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        300: "rgba(0, 0, 0, 0.16) 0px 0px 6px",
        350: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        400: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0",
        500: "rgba(0, 0, 0, 0.17) 0px 0px 12px",
        600: "rgba(0, 0, 0, 0.1) 0px 3px 8px",
        700: "rgba(0, 0, 0, 0.08) 0px 2px 16px",
        900: "rgba(0, 0, 0, 0.05) 0px 21px 36px",
        downfall: "rgba(0, 0, 0, 0.14) 0px 6px 12px",
        paymentCard: "0px 2px 6px rgba(59, 74, 92, 0.1)",
        "downfall-xs": "rgba(0, 0, 0, 0.14) 0px 1px 2px",
        "downfall-sm": "rgba(0, 0, 0, 0.14) 0px 2px 4px",
        "downfall-lg": "rgba(0, 0, 0, 0.16) 0px 8px 16px",
        cardAction:
          "0 0 0 1px #8898aa1a, 0 15px 35px #31315d1a, 0 5px 15px #00000014",
        card: "0px 0px 6px rgba(79, 95, 120, 0.1)",
        cardHover: "0px 0px 8px rgba(79, 95, 120, 0.18)",
        category: "0px 1px 6px rgba(79, 95, 120, 0.12)",
        navigation: "0 3px 6px rgba(115, 125, 144, 0.25)",
        counter: "0px 4px 10px rgba(79, 95, 120, 0.15)",
        featured: "0px 4px 8px rgba(70, 84, 111, 0.06)",
        cart: "0 3px 6px rgba(0,0,0,0.12)",
        switch: "0 2px 5px rgba(21,35,49,0.4)",
        dropDown: "0px 10px 40px rgba(41, 50, 68, 0.15)",
        carouselButton: "0px 2px 15px rgba(115, 125, 144, 0.25)",
        listProduct: "0 2px 4px rgba(0,0,0,.08)",
        navigationReverse: "0 -3px 6px rgba(0, 0, 0, 0.16)",
        header: "0 2px 3px rgba(0, 0, 0, 0.08)",
        subMenu: "1px 2px 3px rgba(0, 0, 0, 0.08)",
        bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
        cookies: "0 -2px 3px rgba(0, 0, 0, 0.04)",
        contact: "0 1px 10px rgba(75, 90, 130, 0.1)",
        vendorCard: "0px 2px 3px rgba(0, 0, 0, 0.06)",
        vendorCardHover: "0px 1px 15px rgba(0, 0, 0, 0.06)",
        vendorSidebar:
          "0px 1px 2px rgba(0, 0, 0, 0.03), 0px 1px 3px rgba(0, 0, 0, 0.05)",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.04, 0.62, 0.23, 0.98)",
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
    require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
