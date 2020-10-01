interface Special {
  name: string
  damage: string | number
  type: string
}

export interface Pokemon {
  id?: string
  image: string
  name: string
  number: string
  attacks: {
    special: Special[]
  }
  fetchedAt?: string
}

export type Square = string | null
