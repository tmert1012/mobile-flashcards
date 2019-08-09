import React, { Component } from 'react'
import { Card, Button } from 'react-native-elements'
import { Text, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'
import { withNavigation } from 'react-navigation'

class ScoreCard extends Component {

  render() {
    const { correctCount, total, id } = this.props

    return (
      <Card>
        <Text style={styles.quizComplete}>You scored {correctCount}/{total}</Text>
        <Button
            buttonStyle={styles.button}
            title='Restart Quiz'
            onPress={() => this.props.navigation.navigate(
              'QuizView',
              { id }
            )}
          />
          <Button
            buttonStyle={styles.button}
            title='Back To Deck'
            onPress={() => this.props.navigation.navigate(
              'DeckView',
              { id }
            )}
          />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: purple,
    marginTop: 5
  },
  quizComplete: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  },
})

export default withNavigation(ScoreCard)
