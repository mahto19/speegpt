import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const ExtractTxtAI = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBaUClggwlBDq-HveJCU4kA197nR3KADs0"
  );

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  async function voc() {
    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    startListening();

  } 

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Write a story about a magic backpack.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  run();

  return (
    <>
      <button onClick={voc}>Start Listening</button>
      <p>{transcript}</p>
    </>
  );
};

export default ExtractTxtAI;
