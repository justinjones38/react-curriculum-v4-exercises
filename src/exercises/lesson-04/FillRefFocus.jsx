// TOPIC: Correct useRef usage to control DOM elements
// TASK: Implement focusing an input field when the button is clicked.
import { useRef } from 'react';
export default function FillRefFocus() {
  const focusRef = useRef(null);
  function focusInput() {
    if (focusRef.current !== null) {
      focusRef.current.focus();
    }
  }

  return (
    <div>
      <h2>useRef: Focusing an Input</h2>

      <input type="text" placeholder="Type here..." ref={focusRef} />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
