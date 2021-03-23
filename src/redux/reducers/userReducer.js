import { types } from "../types"


const initialState = {
	login: {
		loading: false,
		errors: {
			hasError: false,
			msg:''
		}
	},
	signup: {
		loading: false,
		errors: {
			hasError: false,
			msg:''
		}
	},
	user: {
		uid: '',
		name: '',
		lastName: '',
		email: '',
		token: ''
	},
	isAuthenticated: false
}

const userReducer = ( state = initialState, { type, payload } ) => {
	
	switch ( type ) {

		case types.user.signin_start: 
			return {
				...state,
				...payload	
			}
		case types.user.signin_fail: 
			return {
				...state,
				...payload	
			}
		case types.user.signin_success: 
			return {
				...state,
				...payload	
			}
		case types.user.closeError: 
			return {
				...state,
				...payload	
			}
			
		case types.user.signUp_start: 
			return {
				...state,
				...payload	
			}
		case types.user.signUp_fail: 
			return {
				...state,
				...payload	
			}
		case types.user.signUp_success: 
			return {
				...state,
				...payload	
			}
	default:
		return state
	}
}

export default userReducer