import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import { purple, blue } from '../utils/colors'
import { handleRemoveDeck } from '../actions'

class DeckView extends Component {

  handleDelete = () => {
    const { id } = this.props

    this.props.dispatch(handleRemoveDeck(id))
      .then(() => {
        this.props.navigation.navigate(
          'DeckList'
        )
      })

  }

  render() {
    const { deck, id } = this.props

    return (
      <Card title={deck.title}>
        <Text style={styles.cardCount}>{deck.questions.length} Cards</Text>
        <Button
          buttonStyle={styles.button}
          title='Add Card'
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            { id }
          )}
        />
        <Button
          buttonStyle={styles.button}
          title='Start Quiz'
          onPress={() => this.props.navigation.navigate(
            'QuizView',
            { id }
          )}
        />
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