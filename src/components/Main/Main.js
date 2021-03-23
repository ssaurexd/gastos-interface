import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
/* componentes */
import Sidebar from '../Sidebar'
import Home from '../Home'


const Main = () => {

	return (
		<Box component='main' >
			<Grid container direction='row'>
				<Grid item >
					<Sidebar />
				</Grid>

				<Grid item >
					<Home />
				</Grid>
			</Grid>
		</Box>
	)
}

export default Main
