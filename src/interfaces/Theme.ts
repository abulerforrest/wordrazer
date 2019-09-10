export interface ITheme {
	palette: {
		primary: string
		primaryDark: string
		primaryLight: string
		secondary: string
		white: string
		success: string
		danger: string
		warning: string

		blackPrimary: string
		blackSecondary: string

		grayscale: string[]
		gradient: string[]

	}

	typography: {
		primary: string,
		secondary: string,
		logoPrimary: string,
		logoSecondary: string,
		hiscorePrimary: string

		size: {
			small: number,
			medium: number,
			large: number
		},
		letterSpacing: {
			small: string,
			large: string
		}
	}

	baseIndex: number

	border: {
		radius: number,
		width: number,
		color: string,
	}

	boxShadow: string,

	disabledOpacity: number
}