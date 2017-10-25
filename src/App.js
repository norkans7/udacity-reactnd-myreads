import React from 'react'
import { Link, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    if (query.trim()) {
      BooksAPI.search(query.trim(), 20).then((books) => {
        !books.error && this.setState((prevState, props) => {
          return {searchedBooks: books.filter(b => !prevState.books.map(sb => sb.id).includes(b.id))}
        })

      }).catch(this.setState({searchedBooks: []}))
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
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat([book]),
        searchedBooks: prevState.searchedBooks.filter(b => b.id !== book.id)
      }))
    })
  }

  render() {

    const { query } = this.state

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchedBooks.map((book) => (
                  <Book key={book.id} book={book} moveBook={this.moveBook} />
                ))}
              </ol>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onMoveBook={this.moveBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
