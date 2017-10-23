import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
    state = {
        bookshelves: {
            'currentlyReading': "Currently Reading",
            'wantToRead': "Want To Read",
            'read': "Read"
        }
    }

    render() {
        const { books, bookshelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.state.bookshelves[bookshelf]}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter((b) => b.shelf === bookshelf).map((book) => (
                            <Book key={book.id} book={book}/>
                        ))}
                    </ol>
                </div>
            </div>

        )
    }
}

export default Bookshelf