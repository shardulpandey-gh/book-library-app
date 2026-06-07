# Book Library App 📚

A modern React web application for uploading, reading, and downloading PDF books with bilingual support (English & Hindi).

## Features

✨ **Key Features:**
- 📤 Upload PDF books with title, author, and description
- 📖 Read books online page-by-page in a smooth viewer
- 💾 Download uploaded books to your device
- 🔍 Search books by title or author
- 🌐 Full bilingual support for English and Hindi
- 💾 Local storage for book persistence
- 📱 Responsive design for all devices
- 🎨 Beautiful gradient UI with smooth animations

## Tech Stack

- React 18
- PDF.js for PDF rendering
- i18next for internationalization
- react-icons
- CSS3

## Installation

```bash
git clone https://github.com/shardulpandey-gh/book-library-app.git
cd book-library-app
npm install
npm start
```

The app will open at `http://localhost:3000`

## Usage

1. **Upload**: Click "+ Upload Book" and fill in details
2. **Read**: Click "Read" to view book online
3. **Download**: Click "Download" to save PDF
4. **Search**: Use search box to find books
5. **Language**: Switch between English & Hindi in header

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── BookUpload.js
│   ├── BookList.js
│   ├── BookViewer.js
│   └── *.css
├── i18n/
│   ├── config.js
│   └── locales/
│       ├── en.json
│       └── hi.json
└── App.js
```

## Notes

⚠️ Books are stored in localStorage (5-10MB limit). For production, use a backend database.

## License

MIT License
