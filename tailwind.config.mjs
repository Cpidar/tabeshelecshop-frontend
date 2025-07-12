// import radix from "tailwindcss-radix"
// import typography from "@tailwindcss/typography"
// import aspectRatio from "@tailwindcss/aspect-ratio"
// import animate from "tailwindcss-animate"

const config = {
  darkMode: ["attribute", "data-theme"],
  presets: [require("@medusajs/ui-preset")],
  plugins: [
    require("tailwindcss-radix")(),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
    // radix(),
    // typography,
    // aspectRatio,
    // animate,
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
          50: 'customColors("--c-primary-50")',
          100: 'customColors("--c-primary-100")',
          200: 'customColors("--c-primary-200")',
          300: 'customColors("--c-primary-300")',
          400: 'customColors("--c-primary-400")',
          500: 'customColors("--c-primary-500")',
          700: 'customColors("--c-primary-700")',
          800: 'customColors("--c-primary-800")',
          900: 'customColors("--c-primary-900")',
          6000: 'customColors("--c-primary-600")',
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          50: 'customColors("--c-secondary-50")',
          100: 'customColors("--c-secondary-100")',
          200: 'customColors("--c-secondary-200")',
          300: 'customColors("--c-secondary-300")',
          400: 'customColors("--c-secondary-400")',
          500: 'customColors("--c-secondary-500")',
          700: 'customColors("--c-secondary-700")',
          800: 'customColors("--c-secondary-800")',
          900: 'customColors("--c-secondary-900")',
          6000: 'customColors("--c-secondary-600")',
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        neutral: {
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          300: "hsl(var(--neutral-300))",
          400: "hsl(var(--neutral-400))",
          500: "hsl(var(--neutral-500))",
          600: "hsl(var(--neutral-600))",
          700: "hsl(var(--neutral-700))",
          800: "hsl(var(--neutral-800))",
          900: "hsl(var(--neutral-900))",
          6000: "hsl(var(--neutral-6000))",
        },
        slate: {
          50: "hsl(var(--slate-50))",
          100: "hsl(var(--slate-100))",
          200: "hsl(var(--slate-200))",
          300: "hsl(var(--slate-300))",
          400: "hsl(var(--slate-400))",
          500: "hsl(var(--slate-500))",
          600: "hsl(var(--slate-600))",
          700: "hsl(var(--slate-700))",
          800: "hsl(var(--slate-800))",
          900: "hsl(var(--slate-900))",
        },
        gray: {
          50: "hsl(var(--gray-50))",
          100: "hsl(var(--gray-100))",
          200: "hsl(var(--gray-200))",
          300: "hsl(var(--gray-300))",
          400: "hsl(var(--gray-400))",
          500: "hsl(var(--gray-500))",
          600: "hsl(var(--gray-600))",
          700: "hsl(var(--gray-700))",
          800: "hsl(var(--gray-800))",
          900: "hsl(var(--gray-900))",
        },
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
          100: "#f3b81f",
          200: "#ffc33c",
          300: "#edc537",
          DEFAULT: "#f98f14",
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        DEFAULT: "5px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      spacing: {
        "430px": "430px",
        "450px": "450px",
        "500px": "500px",
        "64vh": "64vh",
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
        manrope: ["Manrope", "sans-serif"],
      },
      keyframes: {
        ring: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
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
          "0%": {
            transform: "scale(0.9)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        leave: {
          "0%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(0.9)",
            opacity: 0,
          },
        },
        "slide-in": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        shine: {
          "100%": {
            left: "125%",
          },
        },
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
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
      minHeight: {
        6: "2.5rem",
        40: "10rem",
        140: "35rem",
        580: "580px",
      },
      height: {
        13: "3.125rem",
        22: "5.25rem",
        4.5: "1.125rem",
        double: "200%",
      },
      maxHeight: {
        140: "35rem",
        "70vh": "70vh",
        "85vh": "85vh",
      },
      maxWidth: {
        1920: "1920px",
        "8xl": "100rem",
      },
      minWidth: {
        150: "150px",
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
}

export default config
