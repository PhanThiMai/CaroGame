import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Game from './components/Game'
import rootReducer from './reducers'

const store = createStore(rootReducer)

render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
)
