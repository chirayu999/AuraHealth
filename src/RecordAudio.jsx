import React, { useState } from "react";
import { ReactMic } from "react-mic";
import "./RecordAudio.css";
import transcribeAudio from "./transcribeAudio";
import TranscriptedText from "./TranscriptedText";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const RecordAudio = () => {
  const [record, setRecord] = useState(false);
  const [recordedAudioBlobURL, setRecordedAudioBlobURL] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [text, setText] = useState(null);

  const startRecording = () => {
    setRecord(true);
    const startBtn = document.getElementById("startButton");
    startBtn.classList.add("recording");
  };

  const stopRecording = () => {
    setRecord(false);
    const startBtn = document.getElementById("startButton");
    startBtn.classList.remove("recording");
  };

  const onStop = (recordedBlob) => {
    setRecordedAudio(recordedBlob.blob);
    setRecordedAudioBlobURL(recordedBlob.blobURL);
  };

  const generateTimestampString = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    return timestamp;
  };

  const handleTranscribe = async () => {
    if (!recordedAudio) {
      return;
    }

    try {
      const audioFile = new File(
        [recordedAudio],
        `recorded_audio_${generateTimestampString()}.mp3`
      );

      console.log(audioFile, "HERE");

      const transcript = await transcribeAudio(audioFile);

      setText(transcript);

      console.log("Transcription:", transcript);
    } catch (error) {
      console.error("Transcription Error:", error);
    }
  };

  return (
    <div className="audio-container">
      <div className="record">
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          // onData={onData}
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
        <button onClick={handleTranscribe} type="button">
          Transcribe
        </button>
      </div>

      {recordedAudioBlobURL && (
        <div className="audio-download">
          <audio controls src={recordedAudioBlobURL} />
          <a
            href={recordedAudioBlobURL}
            download={`recorded_audio_${generateTimestampString()}.mp3`}
          >
            Download Recorded Audio
          </a>
        </div>
      )}

      {text && <TranscriptedText transcriptedText={text} />}
    </div>
  );
};

export default RecordAudio;
