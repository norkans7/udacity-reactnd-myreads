import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {

    render() {
        const { bookshelf, moveBook } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookshelf.books.filter((b) => b.shelf === bookshelf.slug).map((book) => (
                            <Book key={book.id} book={book} moveBook={(book, shelf) => moveBook(book, shelf)}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf