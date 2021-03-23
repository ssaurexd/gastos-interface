import { types } from "../types"
import env from '../../config/env'


export const closeErrors = ( wich ) => {
	
	return {
		type: types.user.closeError,
		payload: {
			[ wich ]: {
				loading: false,
				errors: {
					hasError: false,
					msg: ''
				}
			}
		}
	}
}

export const signInStart = () => {

	return {
		type: types.user.signin_start,
		payload: {
			login: {
				loading: true,
				errors: {
					hasError: false,
					msg: ''
				}
			}
		}
	}
}

export const signInFail = ( errorMsg ) => {

	return {
		type: types.user.signin_fail,
		payload: {
			login: {
				loading: false,
				errors: {
					hasError: true,
					msg: errorMsg
				}
			},
			isAuthenticated: false,
			user: {
				uid: '',
				name: '',
				lastName: '',
				email: '',
				token: ''
			}
		}
	}
}

export const signInSuccess = ( userData, token ) => {

	return {
		type: types.user.signin_success,
		payload: {
			login: {
				loading: false,
				errors: {
					hasError: false,
					msg: ''
				}
			},
			user: {
				token,
				...userData
			},
			isAuthenticated: true
		}
	}
}

export const login = ( email, password, remember = false ) => {

	return async ( dispatch ) => {

		dispatch( signInStart() )

		const body = { email, password }
		const resp = await fetch( env.host + 'api/user/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( body )
		})
		const data = await resp.json()
		
		if( data.ok ) {
			
			const userData = {
				uid: data.user._id,
				...data.user
			}
	
			delete userData._id
			delete userData.password
			
			if( remember ) {

				localStorage.setItem('token', data.token)
				localStorage.setItem('user', userData)
			}

			dispatch( signInSuccess( userData, data.token ) )
		} else {

			dispatch( signInFail( data.msg ) )
		}
	}
}

export const signUpStart = () => {

	return {
		type: types.user.signUp_start,
		payload: {
			signup: {
				loading: true,
				errors: {
					hasError: false,
					msg: ''
				}
			}
		}
	}
}

export const signUpFail = ( errorMsg ) => {

	return {
		type: types.user.signUp_fail,
		payload: {
			signup: {
				loading: false,
				errors: {
					hasError: true,
					msg: errorMsg
				}
			},
			isAuthenticated: false
		}
	}
}

export const signUpSuccess = () => {

	return {
		type: types.user.signUp_success,
		payload: {
			signup: {
				loading: false,
				errors: {
					hasError: false,
					msg: ''
				}
			}
		}
	}
}

export const signup = ( firstName, lastName, email, password ) => {

	return async ( dispatch ) => {

		dispatch( signUpStart() )

		const body = { name: firstName, lastName, email, password }
		const resp = await fetch( env.host + 'api/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( body )
		})
		const data = await resp.json()
		
		if( data.ok ) {
			
			const userData = {
				uid: data.user._id,
				...data.user
			}
	
			delete userData._id
			delete userData.password
			dispatch( signUpSuccess() )
			dispatch( signInSuccess( userData, data.token ) )
		} else {

			dispatch( signUpFail( data.msg ) )
		}
	}
}
