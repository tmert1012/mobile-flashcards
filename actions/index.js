import { saveDeckTitle, getDecks, removeDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'



export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function handleReceiveDecks() {
  return (dispatch) => {
    return getDecks()
      .then(({decks}) => {
          dispatch(receiveDecks(decks))
      })
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function handleAddDeck(title) {
  console.log(`handleAddDeck(${title})`)
  return (dispatch) => {
    return saveDeckTitle(title)
      .then((deck) => {
        dispatch(addDeck(deck))
      })
  }
}

export function handleRemoveDeck(key) {
  return (dispatch) => {
    return removeDeck(key)
      .then(() => {
        dispatch(addDeck({[key]: null}))
      })
  }
}