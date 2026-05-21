import {
  useRenderCounter,
  RenderCounter,
} from '../../private/components/renderCounter.jsx';
import BookCard from './BookCard.jsx';
import styles from './BookList.module.css';
import { useMemo } from 'react';

// Book List Component - Expensive sorting operation runs on every render
function BookList({ books, sortBy, favorites, onToggleFavorite }) {
  const { count } = useRenderCounter('BookList');

  // TODO #3: Optimize this expensive sorting operation with useMemo
  // This sorting runs on every render, even when books haven't changed
  const sortedBooks = useMemo(
    () =>
      books.toSorted((a, b) => {
        console.log('run');
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'author':
            return a.author.localeCompare(b.author);
          case 'rating':
            return b.rating - a.rating;
          case 'year':
            return b.publishYear - a.publishYear;
          case 'price':
            return a.price - b.price;
          default:
            return 0;
        }
        // If the length of the books array changes (which means books) or sortBy changes, then it updates
        // just passing the books array would not work since it is not a primitive value and its reference
        // always changes
      }),
    [books.length, sortBy]
  );

  return (
    <div className={styles.listContainer}>
      <RenderCounter
        componentName="BookList"
        count={count}
        className={styles.renderCounter}
      />
      <h2 className={styles.listTitle}>Books ({sortedBooks.length} found)</h2>
      {sortedBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default BookList;
