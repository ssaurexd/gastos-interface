import { useEffect } from 'react'
import PropTypes from 'prop-types';
/* extra */
import { Provider } from 'react-redux'
import Head from 'next/head';
/* Mui */
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
/* componentes */
import theme from '../config/theme'
import store from '../redux/store'


const App = ( props ) => {

	const { Component, pageProps } = props;

	useEffect( () => {

		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');

		if (jssStyles) {

			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Contro de gastos</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			
			<Provider store={ store }>
				<ThemeProvider theme={ theme }>
					<CssBaseline />
					<Component { ...pageProps } />
				</ThemeProvider>
			</Provider>
		</>
	)
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App