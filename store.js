import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
// import reducers from './lib/reducers'

export const initializeStore = (initialState = {}) => {
  return createStore(
    // reducers(),
    () => {},
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
