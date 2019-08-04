import { AsyncStorage } from 'react-native'
import { _getDecks } from './_data'

const DECKS_STORAGE_KEY = 'MobileFlashCards:decks'

export function loadInitialDecks() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(_getDecks()))
}

// return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((decks) => (
      JSON.parse(decks)
    ))
}

// take in a single id argument and return the deck associated with that id.
export function getDeck(id) {

}

// take in a single title argument and add it to the decks.
export function saveDeckTitle(title) {

}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck({ title, card }) {

}