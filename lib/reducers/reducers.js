import { combineReducers } from 'redux'
import counterReducers from './counterReducers'

const reducers = () => combineReducers({
  counter: counterReducers
})

export default reducers
