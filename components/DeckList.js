import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleReceiveDecks } from '../actions'
import { ListItem } from 'react-native-elements'
import { orange, white } from '../utils/colors'

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks())
  }

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
                { 'id': id }
              )}
            />
          ))}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white"
  },
  card: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  count: {
    fontSize: 12,

  }
})

function mapStateToProps(decks) {
  return {
    loading: Object.keys(decks).length === 0,
    decks
  }
}

export default connect(mapStateToProps)(DeckList)