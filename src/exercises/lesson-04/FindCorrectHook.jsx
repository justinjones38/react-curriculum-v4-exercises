// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render

// I might be overthinking something, but we need to trigger a re-render for the button text to change
// Using useRef would not trigger a re-render, so the buttonText would not update.
// So useState is needed

import { useState } from 'react';

export default function FindCorrectHook() {
  const [clickCount, setClickCount] = useState(0);
  function handleClick() {
    setClickCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button onClick={handleClick}>
        {clickCount} {clickCount == 1 ? 'click' : 'clicks'}
      </button>
    </div>
  );
}
