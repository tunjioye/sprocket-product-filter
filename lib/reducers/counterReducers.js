import { actionTypes } from '../actions/counterActions'

// INITIAL STATE
const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

// REDUCERS
export const counterReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light,
      })
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1,
      })
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1,
      })
    case actionTypes.RESET:
      return Object.assign({}, state, {
        count: initialState.count,
      })
    default:
      return state
  }
}

export default counterReducers
