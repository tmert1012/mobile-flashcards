import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Card, Button, Badge } from 'react-native-elements'
import { purple, white, blue } from '../utils/colors'
import { handleRemoveDeck } from '../actions'

class DeckView extends Component {

  handleDelete = (id) => {
    this.props.dispatch(handleRemoveDeck(this.props.id))
    this.props.navigation.goBack()
  }

  render() {
    const { deck, id } = this.props

    return (
      <Card title={deck.title}>
        <Text style={styles.cardCount}>{deck.questions.length} Cards</Text>
        <Button
          buttonStyle={styles.button}
          title='Add Card' />
        <Button
          buttonStyle={styles.button}
          title='Start Quiz' />
        <Text
          style={styles.deleteDeck}
          onPress={this.handleDelete}
        >Delete Deck</Text>
      </Card>
    )
  }

}

const styles = StyleSheet.create({
  cardCount: {
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    backgroundColor: purple,
    marginTop: 5
  },
  deleteDeck: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: blue,
    marginTop: 20
  }
})

function mapStateToProps(decks, { navigation }) {
  const { id } = navigation.state.params

  return {
    deck: decks[id],
    id,
  }
}

export default connect(mapStateToProps)(DeckView)