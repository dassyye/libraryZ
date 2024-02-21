export interface ISale {
  id?: string
  userId: string
  total: number
  date: string
  books: Array<{
    bookId: string
    quantity: number
  }>
}