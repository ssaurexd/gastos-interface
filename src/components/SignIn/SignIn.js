import { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
/* MUI */
import Avatar from '@material-ui/core/Avatar'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
/*  */
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
/* actions */
import { login, closeErrors } from '../../redux/actions/userActions'
/* mios */
import { useStyles } from './styles'


const SignIn = () => {

	const { login: { loading, errors }} = useSelector( state => state.user )
	const dispatch = useDispatch()

	const classes = useStyles()
	const initialValues = {
		email: '',
		password: '',
		remember: false
	}
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Email no valido').required('El email es requerido'),
		password: Yup.string().required('La contraseña requerida')
	})

	/* Funciones
	-------------------------------------------------- */
	const _submit = ({ email, password, remember }) => {
		
		dispatch( login( email, password, remember ) )
	}
	const _closeErrors = () => dispatch( closeErrors() )
	/* End of Funciones
	-------------------------------------------------- */

	/* Hooks
	-------------------------------------------------- */
	useEffect( () => {
		
		dispatch( closeErrors( 'login' ) )
	}, [])
	/* End of Hooks
	-------------------------------------------------- */
	return (

		<>
			<Head>
				<title>Iniciar Sesión | Control de gastos</title>
			</Head>

			<Grid container component="main" className={classes.root}>
				<Grid item xs={false} sm={4} md={7} className={classes.image} />

				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						
						<Typography component="h1" variant="h5">
							Iniciar Sesión
						</Typography>

						{
							errors.hasError && (

								<Alert 
									severity='error'
									color='error'
									variant='outlined'
									className={ classes.alert }
									action={
										<IconButton 
											aria-label='close'
											size='small'
											onClick={ () => _closeErrors() }
											color='inherit'
										>
											<CloseIcon />
										</IconButton>
									}
								>
									{ errors.msg }
								</Alert>
							)
						}
						
						<Formik
							initialValues={ initialValues }
							onSubmit={ values => _submit( values ) }
							validationSchema={ validationSchema }
						>
							{({ errors, touched, values, handleChange, handleBlur }) => (

								<Form className={classes.form}>
									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										id="email"
										label="Correo electronico"
										name="email"
										autoComplete="email"
										autoFocus
										value={ values.email }
										onChange={ handleChange }
										error={ errors.email && touched.email ? true : false }
										helperText={ errors.email && touched.email ? errors.email : '' }
									/>

									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										name="password"
										label="Contraseña"
										type="password"
										id="password"
										autoComplete="current-password"
										value={ values.password }
										onChange={ handleChange }
										error={ errors.password && touched.password ? true : false }
										helperText={ errors.password && touched.password ? errors.password : '' }
									/>
									
									<FormControlLabel
										control={
											<Checkbox  
												id='remember'
												color="primary"
												value={ values.remember }
												onChange={ handleChange }
											/>
										}
										label="Recordarme"
									/>
									
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={ loading ? true : false }
									>
										Iniciar Sesión
									</Button>
									
									<Grid container>
										<Grid item>
											<Link href='/auth/signup' as='/auth/signup'>
												<Button
													variant='text'
													component='a'
													size='small'
												>
													¿Aún no tienes una cuenta? Registrate aqui
												</Button>
											</Link>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>

						<Grid container justify='center' >
							<Grid item >
								{
									loading && (
										
										<CircularProgress 

										/>
									)
								}
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</>
	)
}

export default SignIn