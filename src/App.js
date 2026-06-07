import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './components/Header';
import BookUpload from './components/BookUpload';
import BookList from './components/BookList';
import BookViewer from './components/BookViewer';

function App() {
  const { i18n } = useTranslation();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  const handleBookUpload = (newBook) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setShowUpload(false);
  };

  const handleDeleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  return (
    <div className="app">
      <Header onLanguageChange={(lang) => i18n.changeLanguage(lang)} />
      {selectedBook ? (
        <BookViewer book={selectedBook} onBack={() => setSelectedBook(null)} />
      ) : (
        <>
          {showUpload ? (
            <BookUpload onUpload={handleBookUpload} onCancel={() => setShowUpload(false)} />
          ) : (
            <>
              <div className="app-container">
                <button className="upload-btn" onClick={() => setShowUpload(true)}>+ Upload Book</button>
              </div>
              <BookList books={books} onSelectBook={setSelectedBook} onDeleteBook={handleDeleteBook} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
