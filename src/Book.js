import React from 'react'

class Book extends React.Component {

    render() {

        const { book, moveBook } = this.props

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
                    <div className="book-authors">{book.author && book.authors.map((author) => (<div key={author}>{author}</div>))}</div>
                </div>
            </li>
        )
    }

}

export default Book