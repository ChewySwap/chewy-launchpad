/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./config/**/*.{js,ts,jsx,tsx}", "./context/**/*.{js,ts,jsx,tsx}", "./widgets/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
    darkMode: "class",
    plugins: [
        plugin(function ({ addComponents }) {
            addComponents({
                '.num': {
                    'font-size': '16px',
                    'color': '#ffffff',
                    'text-align': 'center',
                },
                '.nam': {
                    'color': '#ffffff',
                    'font-size': '13px',
                    'text-align': 'center',
                    'font-family': 'Russo One, sans-serif',
                }
            })
        }),
        nextui({
            defaultTheme: "dark",
            layout: {
                dividerWeight: "1px", // h-divider the default height applied to the divider component
                disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
                fontSize: {
                    tiny: "0.75rem", // text-tiny
                    small: "0.875rem", // text-small
                    medium: "1rem", // text-medium
                    large: "1.125rem", // text-large
                },
                lineHeight: {
                    tiny: "1rem", // text-tiny
                    small: "1.25rem", // text-small
                    medium: "1.5rem", // text-medium
                    large: "1.75rem", // text-large
                },
                radius: {
                    small: "8px", // rounded-small
                    medium: "14px", // rounded-medium
                    large: "20px", // rounded-large
                },
                borderWidth: {
                    small: "1px", // border-small
                    medium: "2px", // border-medium (default)
                    large: "3px", // border-large
                },
            },
            themes: {
                dark: {
                    extend: {
                        keyframes: {
                            wiggle: {
                                "0%, 100%": { transform: "scale(1)" },
                                "50%": { transform: "scale(1.03)" },
                            },
                            'border-spin': {
                                '100%': {
                                    transform: 'rotate-(360deg)',
                                },
                            },
                        },
                        animation: {
                            wiggle: "wiggle 1s ease-in-out infinite",
                            'border-spin': 'border-spin 7s linear infinite',
                        },
                    },
                    colors: {
                        primary: "#212638",
                        "primary-content": "#F9FBFF",
                        secondary: "#0099ff",
                        "secondary-content": "#F9FBFF",
                        accent: "#c4a784",
                        "accent-content": "#F9FBFF",
                        neutral: "#F9FBFF",
                        "neutral-content": "#385183",
                        "base-100": "#151b28",
                        "base-200": "#2A3655",
                        "base-300": "#212638",
                        "base-content": "#F9FBFF",
                        info: "#385183",
                        success: "#008b1c",
                        "success-content": "#000000",
                        warning: "#FFCF72",
                        error: "#FF8863",

                        "--rounded-btn": "9999rem",

                        ".tooltip": {
                            "--tooltip-tail": "6px",
                            "--tooltip-color": "oklch(var(--p))",
                        },
                        ".link": {
                            textUnderlineOffset: "2px",
                        },
                        ".link:hover": {
                            opacity: "90%",
                        },
                    },

                },
            },
        })],


    theme: {
        fontFamily: {
            sans: ["Kanit", "ui-sans-serif", "sans-serif"],
            serif: ["Kanit", "ui-serif"],
            mono: ["ui-monospace", "SFMono-Regular"],
            display: ["Kanit"],
            body: ["Open Sans"],
        },
        extend: {
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.03)" },
                },
                'border-spin': {
                    '100%': {
                        transform: 'rotate-(360deg)',
                    },
                },
            },
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
                'border-spin': 'border-spin 7s linear infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            markbar: {
                display: "flex",
                flexFlow: "row nowrap",
                marginTop: "5%",
                marginBottom: "5%",
                backgroundColor: "#232323",
                justifyContent: "center"
            },
            backgroundImage: {
                "bones-bg": "url('/images/back.png')",
            },
            boxShadow: {
                center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
            },
            animation: {
                "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "wiggle": "wiggle 1s ease-in-out infinite",
            },
        },
    },
};