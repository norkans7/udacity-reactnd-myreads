import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        moveBook: PropTypes.func.isRequired
    }

    render() {

        const { book, moveBook } = this.props

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : "http://via.placeholder.com/128x192?text=No%20Cover"})` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => moveBook(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                </div>
            </li>
        )
    }

}

export default Book