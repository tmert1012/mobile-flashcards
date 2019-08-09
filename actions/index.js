import { saveDeckTitle, getDecks, removeDeckKey, addCardToDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

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
  return (dispatch) => {
    return saveDeckTitle(title)
      .then((deck) => {
        dispatch(addDeck(deck))
      })
  }
}

export function removeDeck(key) {
  return {
    type: REMOVE_DECK,
    key
  }
}

export function handleRemoveDeck(key) {
  return (dispatch) => {
    return removeDeckKey(key)
      .then(() => {
        dispatch(removeDeck(key))
      })
  }
}

export function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card
  }
}

export function handleAddCard(id, card) {
  return (dispatch) => {
    return addCardToDeck(id, card)
      .then(() => {
        dispatch(addCard(id, card))
      })
  }
}