import { ITheme } from "../interfaces/Theme";

export const defaultTheme : ITheme = {
	palette: {
		primary: "#585481",
		primaryLight: "#D1BCE3",
		primaryDark: "#19297C",
		secondary: "#C49BBB",
		white: "#FFFFFF",
		success: "#28A745",
		danger: "#DC3545",
		warning: "#F0AD4E",
		blackPrimary: "#3b444b",
		blackSecondary: "#0e1111",

		grayscale: [
			"#212121",
			"#414141",
			"#616161",
			"#9e9e9e",
			"#bdbdbd",
			"#e0e0e0",
			"#eeeeee",
			"#f3f3f3"
		],
	},

	typography: {
		primary: "Roboto, sans-serif",
		secondary: "Nunito, sans-serif",
		logoPrimary: "Mr Dafoe, cursive",
		logoSecondary: "Monoton, cursive",
		hiscorePrimary: "VT323, monospace",

		size: {
			small: 12,
			medium: 14,
			large: 16
		},
		letterSpacing: {
			small: "1px",
			large: "2px"
		}
	},

	border: {
		width: 1,
		radius: 2,
		color: "#D8D8D8"
	},

	boxShadow: "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",

	baseIndex: 10101,

	disabledOpacity: .4
}