import { createMuiTheme } from '@material-ui/core/styles'


const theme = createMuiTheme({
	palette: {
		type: 'dark',
		common: {
			black: '#161616'
		},
		primary: {
			main: '#ff7c50',
			contrastText: '#fff'
		},
		secondary: {
			main: '#643969',
			contrastText: '#fff'
		},
		background: {
			default: '#1d1d1d'
		}
	},
	typography: {

	},
	shape: {
		borderRadius: 12
	},
	props: {
		MuiButton: {
			variant: 'contained',
			color: 'primary'
		}
	}
})

export default theme