import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleReceiveDecks } from '../actions'
import { ListItem } from 'react-native-elements'

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
              badge={{ value: decks[id].questions.length, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
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