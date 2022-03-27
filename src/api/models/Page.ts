export interface Page<T> {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  sort: { sorted: boolean; unsorted: boolean; empty: boolean }
  totalElements: number
  totalPages: number
}

export const convertPage = <T, K>(page: Page<T>, convert: (old: T) => K): Page<K> => {
  return { ...page, content: page.content.map((item) => convert(item)) }
}
