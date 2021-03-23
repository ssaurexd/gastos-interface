import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//
import userReducer from '../reducers/userReducer'

const reducers = combineReducers({
	user: userReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware( thunk )
	)
)

export default store