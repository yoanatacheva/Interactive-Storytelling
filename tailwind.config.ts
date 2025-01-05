import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			inter: ['var(--font-inter)'],
			juana: ['var(--font-juana)'],
			dyslexic: ['var(--font-dyslexic)'],
		},
		fontWeight: {
			'thin': '100',
			'extralight': '200',
			'light': '300',
			'normal': '400',
			'medium': '500',
			'semibold': '600',
			'bold': '700',
			'extrabold': '800',
			'black': '900',
		},
		fontSize: {
			'4.5xl': ['2.625rem', { lineHeight: '2.75rem' }],
			'10xl': '10rem',
			'12xl': '12rem',
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			blob: {
				"0%": {
				translate: "0 0",
				rotate: "0deg",
				},
				"30%": {
				rotate: "40deg",
				},
				"50%": {
				transform: "translate(300px, 390px) scale(1.1)",
				},
				"80%": {
				rotate: "90%",
				},
			},
		},
		animation: {
			blob: "blob 12s infinite cubic-bezier(0.42, 0, 0.58, 1)",
			"blob-reverse": "blob 15s infinite cubic-bezier(0.42, 0, 0.58, 1) reverse",
		  },
		  
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
