import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }

    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      }

    case REMOVE_DECK:
      let data = state
      data[action.key] = undefined
      delete data[action.key]
      return data

    case ADD_CARD:
      const { id, card } = action

      return {
        ...state,
        [id]: {
          ...state[id],
          questions: state[id].questions.concat(card)
        }
      }

    default :
      return state

  }
}

export default decks