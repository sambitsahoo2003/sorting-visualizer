import React from 'react';
import './Node.css';

export default function Node({
  col,
  row,
  isStart,
  isFinish,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      // Add the Mouse Listeners here
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}>
    </div>
  );
}