const colors = require('tailwindcss/colors');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#045690',
				secondary: '#CC1E27',
				tertiary: colors.gray[500],
			},
			fontFamily: {
				inter: 'Inter, sans-serif',
			},
		},
	},
	plugins: [],
};
