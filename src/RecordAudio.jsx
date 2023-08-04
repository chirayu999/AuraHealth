import React, { useState } from "react";
import { ReactMic } from "react-mic";
import "./RecordAudio.css";

const RecordAudio = () => {
  const [record, setRecord] = useState(false);

  const startBtn = document.getElementById('startButton');


  const startRecording = () => {
    setRecord(true);
    startBtn.classList.add('recording');
  };

  const stopRecording = () => {
    setRecord(false);
    startBtn.classList.remove('recording');
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
  };

  return (
    <div className="audio-container">
      <div className="record">
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
      </div>

      <div className="controls">
        <button id="startButton" onClick={startRecording} type="button">
          Start
        </button>
        <button onClick={stopRecording} type="button">
          Stop
        </button>
      </div>
    </div>
  );
};

export default RecordAudio;
