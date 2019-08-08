import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Card, Button, Input } from 'react-native-elements'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions'

class AddDeck extends Component {
  state = {
      title: '',
  }

  handleTitleChange = (text) => {
      this.setState(() => ({
          title: text
      }))
  }

  handleSubmit = (e) => {
      e.preventDefault()

      this.props.dispatch(handleAddDeck(this.state.title))

      this.setState(() => ({
          title: '',
      }))

      this.props.navigation.goBack()
  }

  render() {
    return (
      <Card title='What is the title of your new deck?'>
        <Input
          placeholder='Enter a title'
          onChangeText={(text) => this.handleTitleChange(text)}
        />
        <Button
          buttonStyle={styles.button}
          title='Add Deck'
          disabled={this.state.title === ''}
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
  }
})


export default connect()(AddDeck)