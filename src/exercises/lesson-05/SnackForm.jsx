import styles from './SnackForm.module.css';
import { useState, useEffect } from 'react';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(editingSnack.rating);
    } else {
      setName('');
      setRating('');
    }
    setTouched({ name: false, rating: false });
  }, [editingSnack]);
  const isEditing = Boolean(editingSnack);

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateName(name) || !validateRating(rating)) {
      setTouched({ name: true, rating: true });
      return;
    }

    if (isEditing) {
      updateSnack(editingSnack.id, name, rating);
    } else {
      addSnack(name, rating);
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }

  // Arrow function to validate name and rating
  const validateName = (name) => name.trim() !== '';
  const validateRating = (rating) => rating !== '';

  const getNameError = (name) => {
    if (touched.name && !validateName(name)) {
      return 'Snack name is required';
    }
    return;
  };

  const getRatingError = (rating) => {
    if (touched.rating && !validateRating(rating)) {
      return 'Please select a rating';
    }
    return;
  };

  const errorName = getNameError(name);
  const errorRating = getRatingError(rating);

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles['field-input']}
          placeholder="Enter snack name"
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
        />
        {errorName && <div className={styles.error}>{errorName}</div>}
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
        />
        {errorRating && <div className={styles.error}>{errorRating}</div>}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
