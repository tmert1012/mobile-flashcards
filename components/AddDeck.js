import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Button, Input } from 'react-native-elements'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions'
import { formatDeckKey } from '../utils/_data'

class AddDeck extends Component {
  state = {
      title: '',
  }

  handleTitleChange = (text) => {
      this.setState(() => ({
          title: text
      }))
  }

  handleSubmit = () => {
      const id = formatDeckKey(this.state.title)

      this.props.dispatch(handleAddDeck(this.state.title))
        .then((deck) => {
          this.props.navigation.navigate(
            'DeckView',
            { id }
          )
        })

      this.setState(() => ({
        title: '',
      }))

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