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
