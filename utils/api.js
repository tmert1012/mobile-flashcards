import { AsyncStorage } from 'react-native'
import { getInitialDeckData, formatDeck } from './_data'

const DECKS_STORAGE_KEY = 'MobileFlashCards:decks'

export function loadInitialDecks() {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getInitialDeckData()))
}

// return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => ({
      decks: JSON.parse(data)
    }))
}

// take in a single title argument and add it to the decks.
export function saveDeckTitle(title) {
  const deck = formatDeck(title)
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
    .then(() => deck)
}

export function removeDeckKey(key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(id, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[id].questions.concat(card)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
