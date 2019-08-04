import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import { loadInitialDecks } from './utils/api'
import middleware from './middleware'

export default class App extends Component {
  componentDidMount() {
    loadInitialDecks()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View>
          <DeckList />
        </View>
      </Provider>
    )
  }

}
