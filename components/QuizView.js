import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native'
import { purple, blue } from '../utils/colors'

function NoCardsView() {
  return (
    <View>
        <Text style={styles.noCards}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
    </View>
  )
}

const viewQuestion = 'Question'
const viewAnswer = 'Answer'

class QuizView extends Component {
  state = {
    view: viewQuestion,
    qid: 0,
    correctCount: 0,
  }

  flipCard = () => {
    this.setState((prevState) => ({
      view: (prevState.view === viewQuestion) ? viewAnswer : viewQuestion
    }))
  }

  submitAnswer = (correct) => {
    const { questions, id } = this.props
    const nextQID = this.state.qid + 1
    const newCorrectCount = (correct) ? this.state.correctCount + 1 : this.state.correctCount

    this.setState(() => ({
      view: viewQuestion,
      qid: nextQID,
      correctCount: newCorrectCount,
    }))

    // end of quiz
    if (questions.length === nextQID) {

      // show scorecard
      this.props.navigation.navigate(
        'ScoreCard',
        { id,
          correctCount: newCorrectCount,
          total: questions.length
        }
      )

      // reset quiz
      this.setState(() => ({
        view: viewQuestion,
        qid: 0,
        correctCount: 0,
      }))
    }

  }

  render() {
    const { questions, id } = this.props
    const { view, qid, correctCount } = this.state
    const question = questions[qid]

    if (questions.length === 0)
      return (<NoCardsView />)

    if (questions.length === qid)
      return (<View></View>)

    return (
      <Card>
        <Text>{qid+1}/{questions.length}</Text>
        <Text style={styles.qaText}>{ (view === viewQuestion) ? question.question : question.answer }</Text>
        <Text style={styles.toggle} onPress={this.flipCard}>{ (view === viewQuestion) ? viewAnswer : viewQuestion }</Text>
        <Button
          buttonStyle={styles.button}
          title='Correct'
          onPress={() => this.submitAnswer(true)}
        />
        <Button
          buttonStyle={styles.button}
          title='Incorrect'
          onPress={() => this.submitAnswer(false)}
        />
      </Card>
    )

  }

}

const styles = StyleSheet.create({
  noCards: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  qaText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20
  },
  button: {
    backgroundColor: purple,
    marginTop: 5
  },
  toggle: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: blue,
    marginBottom: 20
  }
})

function mapStateToProps(decks, { navigation }) {
  const { id } = navigation.state.params
  const questions = decks[id].questions

  return {
    questions,
    id
  }
}

export default connect(mapStateToProps)(QuizView)