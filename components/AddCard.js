import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Input } from 'react-native-elements'
import { handleAddCard } from '../actions'
import { StyleSheet } from 'react-native'
import { purple } from '../utils/colors'


class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handleQuestionChange = (question) => {
      this.setState(() => ({
          question
      }))
  }

  handleAnswerChange = (answer) => {
    this.setState(() => ({
        answer
    }))
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const { question, answer } = this.state
      const { id } = this.props

      this.props.dispatch(handleAddCard(id, { question, answer }))
        .then(() => {
          this.props.navigation.goBack()
        })

      this.setState(() => ({
        question: '',
        answer: '',
      }))

  }

  render() {
    return (
      <Card>
        <Input
          placeholder='Question'
          onChangeText={(text) => this.handleQuestionChange(text)}
          value={this.state.question}
        />
        <Input
          placeholder='Answer'
          onChangeText={(text) => this.handleAnswerChange(text)}
          value={this.state.answer}
        />
        <Button
          buttonStyle={styles.button}
          title='Submit'
          disabled={this.state.question === '' || this.state.answer === ''}
          onPress={this.handleSubmit}
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
})

function mapStateToProps(state, { navigation }) {
  const { id } = navigation.state.params

  return {
    id
  }
}

export default connect(mapStateToProps)(AddCard)