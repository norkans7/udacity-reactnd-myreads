import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    allSearchBooks: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    if (query.trim()) {
      BooksAPI.search(query.trim(), 20).then((books) => {
        !books.error && this.setState((prevState, props) => {
          return { allSearchBooks: books, searchedBooks: books.filter(b => !prevState.books.map(sb => sb.id).includes(b.id)) }
        })

      }).catch(this.setState({ searchedBooks: [], allSearchBooks: [] }))
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(prevState => {
        const s_books = prevState.books.filter(b => b.id !== book.id).concat([book]).filter(b => b.shelf !== 'none')
        const res_books = prevState.allSearchBooks.filter(b => !s_books.map(sb => sb.id).includes(b.id))

        return {
          books: s_books,
          searchedBooks: res_books
        }

      })

  })
  }

render() {

  const { query } = this.state

  return (
    <div className="app">
      <Switch>
      <Route path='/search' render={() => (
        <SearchBooks
          query={query}
          onUpdateQuery={this.updateQuery}
          books={this.state.searchedBooks}
          onMoveBook={this.moveBook}
        />
      )} />
      <Route exact path='/' render={() => (
        <ListBooks books={this.state.books} onMoveBook={this.moveBook} />
      )} />
      <Route render={() => (
        <img alt="Not found" src='http://via.placeholder.com/1280x800?text=404%20Not%20Found' />
      )} />
      </Switch>
    </div>
  )
}
}

export default BooksApp
