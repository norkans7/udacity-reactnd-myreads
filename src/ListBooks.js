import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'


class ListBooks extends React.Component {
     static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { books, onMoveBook } = this.props

        const bookshelves = [
            {
                slug: "currentlyReading",
                title: "Currently Reading",
            },
            {
                slug: "wantToRead",
                title: "Want To Read",
            },
            {
                slug: "read",
                title: "Read",
            }
        ]


        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {bookshelves.map(bookshelf => (
                            <Bookshelf
                                key={bookshelf.slug}
                                bookshelf={bookshelf}
                                books={books.filter((b) => b.shelf === bookshelf.slug)}
                                moveBook={onMoveBook}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks