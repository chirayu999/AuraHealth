import axios from "axios";
import FormData from "form-data";

async function transcribeAudio(audioFilePath) {
  const url = "https://api.openai.com/v1/audio/transcriptions";

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  try {
    const formData = new FormData();

    formData.append("file", audioFilePath);
    formData.append("model", "whisper-1");

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response, "response");

    return response;
  } catch (error) {
    throw new Error("Transcription Error: " + error.message);
  }
}

export default transcribeAudio;
