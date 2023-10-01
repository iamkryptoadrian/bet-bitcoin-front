import React, { useState, useEffect } from 'react';

const Countdown = ({ duration, originDate, onComplete }) => {
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - new Date(originDate).getTime()) / 1000);
  const initialSecondsLeft = duration - elapsedTime;

  const [secondsLeft, setSecondsLeft] = useState(initialSecondsLeft);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(initialSecondsLeft > 0);

  useEffect(() => {
    if (!isCompleted && secondsLeft > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (secondsLeft <= 0 && !isCompleted) {
      setIsCompleted(true);
      setIsVisible(false);  // Hide the component once the timer completes
      onComplete();
    }
  }, [secondsLeft, onComplete, isCompleted]);

  const percentage = ((duration - secondsLeft) / duration) * 100;

  if (!isVisible) return null;  // If not visible, don't render anything

  return (
    <div 
      style={{
        backgroundColor: '#e0e0e0',
        height: '5px',
        borderRadius: '0px',
        overflow: 'hidden',
        width: '55%',
        margin: 'auto'
      }}
      className="countdown-container"
    >
      <div 
        className="progress-bar" 
        style={{
          backgroundColor: '#4CAF50',
          height: '100%',
          transition: 'width 0.5s',
          width: `${percentage}%`
        }}
      ></div>
    </div>
  );
};

export default Countdown;
