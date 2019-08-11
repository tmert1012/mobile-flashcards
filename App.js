import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import CardsApp from './components/CardsApp'

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <CardsApp />
      </Provider>
    )
  }
}