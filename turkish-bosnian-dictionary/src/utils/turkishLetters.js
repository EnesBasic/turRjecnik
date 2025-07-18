export const turkishLetters = {
  'c': ['ç'],
  'g': ['ğ'],
  'i': ['ı', 'İ'],
  'o': ['ö'],
  's': ['ş'],
  'u': ['ü']
}

export const turkishCharMap = {
  'c': 'ç',
  'C': 'Ç',
  'g': 'ğ',
  'G': 'Ğ',
  'i': 'ı',
  'I': 'İ',
  'o': 'ö',
  'O': 'Ö',
  's': 'ş',
  'S': 'Ş',
  'u': 'ü',
  'U': 'Ü'
}

export const getTurkishSuggestions = (char) => {
  return turkishLetters[char.toLowerCase()] || []
}