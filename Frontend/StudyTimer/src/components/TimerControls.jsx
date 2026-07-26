import { FaPlay, FaPause, FaStop, FaRedo } from "react-icons/fa";
import "../css/Timer.css";

function TimerControls({ onStart, onPause, onStop, onReset, isRunning, isPaused }) {
  return (
    <div className="timer-controls">
      {!isRunning && !isPaused && (
        <button className="ctrl-btn start" onClick={onStart}>
          <FaPlay /> Start
        </button>
      )}
      {isRunning && (
        <button className="ctrl-btn pause" onClick={onPause}>
          <FaPause /> Pause
        </button>
      )}
      {isPaused && (
        <button className="ctrl-btn start" onClick={onStart}>
          <FaPlay /> Resume
        </button>
      )}
      {(isRunning || isPaused) && (
        <button className="ctrl-btn stop" onClick={onStop}>
          <FaStop /> Stop
        </button>
      )}
      <button className="ctrl-btn reset" onClick={onReset}>
        <FaRedo /> Reset
      </button>
    </div>
  );
}

export default TimerControls; 