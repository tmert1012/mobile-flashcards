import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { handleReceiveDecks } from '../actions'

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks())
  }

  render() {
    const { decks } = this.props

    return (
      <View>
        <Text>{decks}</Text>
      </View>
    )
    /*
    return (
      <View>
        {Object.keys(decks).map((id) => (
          <Card key={id} bg="light" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{decks[id].title}</Card.Title>
              <Card.Body>
              </Card.Body>
            </Card.Body>
          </Card>
        ))}
      </View>
    )
    */
  }


}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)