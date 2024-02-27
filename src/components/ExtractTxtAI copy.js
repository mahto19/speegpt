import { GoogleGenerativeAI } from "@google/generative-ai";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";

const ExtractTxtAI = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBaUClggwlBDq-HveJCU4kA197nR3KADs0"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const { startListening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [transcript, setTranscript] = useState("");
  
  async function spee() {
    const startListening = () =>
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

    if (!browserSupportsSpeechRecognition) {
      return null;
    }
  }

  async function run() {
    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  spee();
  run();

  return (
    <div>
      <p>Hello</p>
      <button onClick={startListening}>Start Listening</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};
export default ExtractTxtAI;
