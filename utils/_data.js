
export function getInitialDeckData() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

export function formatDeck(title) {
  const key = formatDeckKey(title)

  return {
    [key]: {
      'title': title,
      'questions': [],
    }
  }
}

export function formatDeckKey(title) {
  return title.replace(/\s+/g, '')
}
