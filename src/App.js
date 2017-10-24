import React from 'react'
import Bookshelf from './Bookshelf'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchedBooks: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    console.log(query.trim())
    BooksAPI.search(query.trim(), 20).then((books) => {
      console.log(books)
      this.setState({searchedBooks: books.filter((b) => b.shelf === undefined || b.shelf === 'none')})
    }).catch(() => {this.setState({searchedBooks: []})})

  }

  clearQuery = () => {
    this.setState({ query: '' })
    this.setState({searchedBooks: []})


  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })


  }

  moveBook = (book, shelf) => {
    let books = this.state.books.filter((b) => b.id !== book.id)
    if (shelf !== 'none') {
      book.shelf = shelf
      this.setState({books: books.concat([book])})
    } else {
      this.setState({ books })
    }

    BooksAPI.update(book, shelf)

  }

  addBook = (book, shelf) => {
    this.moveBook(book, shelf)
    this.setState({searchedBooks: this.state.searchedBooks.filter((b) => b.id !== book.id )})
  }

  render() {
    const bookshelves = [
      { slug: "currentlyReading", title: "Currently Reading", books: this.state.books.filter((b) => b.shelf === 'currentlyReading')},
      { slug: "wantToRead", title: "Want To Read", books: this.state.books.filter((b) => b.shelf === 'wantToRead')},
      { slug: "read", title: "Read", books: this.state.books.filter((b) => b.shelf === 'read')}
    ]

    const { query } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
                  <Book key={book.id} book={book} moveBook={this.addBook}  />
                ))}
              </ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {bookshelves.map(bookshelf => (
                    <Bookshelf key={bookshelf.slug} bookshelf={bookshelf} books={this.state.books} moveBook={this.moveBook}/>
                  ))}
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => {this.setState({ showSearchPage: true }); this.clearQuery()}}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
