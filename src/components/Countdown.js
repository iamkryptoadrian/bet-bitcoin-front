import React, { useState, useEffect } from 'react';

const Countdown = ({ duration, originDate, onComplete }) => {
  const calculateSecondsRemaining = () => {
    const currentTime = new Date();
    const startDate = new Date(originDate);
    const elapsed = Math.floor((currentTime - startDate) / 1000); // Convert milliseconds to seconds and round down

    const remaining = duration - elapsed;
    return remaining > 0 ? remaining : 0; // Ensure it doesn't go negative
  };
  
  const [secondsRemaining, setSecondsRemaining] = useState(calculateSecondsRemaining());

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timerId = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      onComplete();
    }
  }, [secondsRemaining, onComplete]);

  const percentage = (1 - (secondsRemaining / duration)) * 100; // This calculates how much of the duration has been completed

  return (
    <div className="countdown-container">
      <div className="progress-bar" style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}></div>
    </div>
  );
};

export default Countdown;
