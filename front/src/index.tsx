import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import userReducer from './reducers/userReducer'
import quizzesReducer from './reducers/quizzesReducer'
import submissionsReducer from './reducers/submissionsReducer'

import App from './components/App'

const reducer = combineReducers({
  user: userReducer,
  quizzes: quizzesReducer,
  submissions: submissionsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)