import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import { orange, white } from '../utils/colors'

class DeckList extends Component {

  render() {
    const { decks, loading } = this.props

    return (
      <View>
        { loading === true
          ? null
          : Object.keys(decks).map((id) => (
            <ListItem
              key={id}
              title={decks[id].title}
              badge={{
                value: decks[id].questions.length,
                textStyle: { color: white },
                containerStyle: {
                },
                badgeStyle: {
                  backgroundColor: orange,
                }
              }}
              onPress={() => this.props.navigation.navigate(
                'DeckView',
                { id }
              )}
            />
          ))}
      </View>
    )
  }

}

function mapStateToProps(decks) {
  return {
    loading: Object.keys(decks).length === 0,
    decks
  }
}

export default connect(mapStateToProps)(DeckList)