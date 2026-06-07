import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaDownload, FaTrash } from 'react-icons/fa';
import './BookList.css';

function BookList({ books, onSelectBook, onDeleteBook }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadBook = (book) => {
    const element = document.createElement('a');
    const file = new Blob([book.pdfData], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${book.title}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="book-list-container">
      <div className="search-section">
        <input type="text" placeholder={t('searchBooks')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="no-books">
          <p>{books.length === 0 ? t('noBooks') : t('noResults')}</p>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-image"><span className="book-icon">📚</span></div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                {book.description && <p className="description">{book.description}</p>}
                <p className="meta">
                  <span className="language">🌐 {book.language === 'hi' ? 'हिन्दी' : 'English'}</span>
                  <span className="date">📅 {book.uploadDate}</span>
                </p>
              </div>
              <div className="book-actions">
                <button className="action-btn read-btn" onClick={() => onSelectBook(book)} title={t('read')}><FaEye /> {t('read')}</button>
                <button className="action-btn download-btn" onClick={() => downloadBook(book)} title={t('download')}><FaDownload /> {t('download')}</button>
                <button className="action-btn delete-btn" onClick={() => onDeleteBook(book.id)} title={t('delete')}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
