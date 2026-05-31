export const cities = [
  { id: 'dallol', name: 'Dallol', country: 'NG', query: 'Dallol,NG' },
  { id: 'fairbanks', name: 'Fairbanks', country: 'US', query: 'Fairbanks,US' },
  { id: 'london', name: 'London', country: 'GB', query: 'London,GB' },
  { id: 'recife', name: 'Recife', country: 'BR', query: 'Recife,BR' },
  { id: 'vancouver', name: 'Vancouver', country: 'CA', query: 'Vancouver,CA' },
  { id: 'yakutsk', name: 'Yakutsk', country: 'RU', query: 'Yakutsk,RU' },
] as const

export type City = (typeof cities)[number]