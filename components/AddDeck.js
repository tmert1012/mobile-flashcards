import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Card, Button, Input } from 'react-native-elements'
import { purple } from '../utils/colors'

class AddDeck extends Component {

  render() {
    return (
      <Card title='What is the title of your new deck?'>
        <Input
          placeholder='INPUT WITH ERROR MESSAGE'
          errorStyle={{ color: 'red' }}
          errorMessage='ENTER A VALID ERROR HERE'
        />
        <Button
          buttonStyle={styles.button}
          title='Add Deck'
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


export default AddDeck