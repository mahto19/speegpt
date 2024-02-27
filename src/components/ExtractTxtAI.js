import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";
import { useState, useEffect } from "react";

const generationConfig = {
  "candidate_count": 1,
  "max_output_tokens": 256,
  "temperature": 1.0,
  "top_p": 0.7,
  };

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];



const ExtractTxtAI = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBaUClggwlBDq-HveJCU4kA197nR3KADs0"
  );

  const { transcript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition();

  const [extractedData, setExtractedData] = useState({
    startingDate: null,
    endingDate: null,
    persons: null,
    location: null,
    childCount: null,
    adultCount: null,
  });


   const ttt ="Book a hotel room for two adults and one child in New York City for three nights starting on March 5th.";
  useEffect(() => {
    // if (!listening && transcript) {
    if (!listening && ttt) {
      // run(transcript);
      run(ttt);
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  const voc = () => {
    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    startListening();
  };

  async function run(prompt) {
    console.log("Starting...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings});
    const prompts = [
      // "Extract Starting Dates.",
      // "Extract Ending Date only.",
      // "Extract total Persons.",
      // "Extract only Locations.",
      // "Extract the number of childs they have.",
      // "Extract the number of Adults.",
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      });

    const loc = "Extract the location/city from the provided text ." + prompt;
    const result = await chat.sendMessage(loc);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    await new Promise(resolve => setTimeout(resolve, 3000)); 
    console.log("Starting Date");
    const startDate = "Extract the Starting Date from the provided text ." + prompt;
    const sdResult = await chat.sendMessage(startDate);
    const sdResponse = await sdResult.response;
    const sdtext = sdResponse.text();
    console.log(sdtext);

    await new Promise(resolve => setTimeout(resolve, 3000)); 
    console.log("Ending Date");
    const endDate = "Extract the Ending Date from the provided text. if there is not mentioned then calculate the ending date" + prompt;
    const edResult = await chat.sendMessage(endDate);
    const edResponse = await edResult.response;
    const edtext = edResponse.text();
    console.log(edtext);

    await new Promise(resolve => setTimeout(resolve, 3000)); 
    console.log("Child");
    const childC = "Count The child from the provided text ." + prompt;
    const cResult = await chat.sendMessage(childC);
    const cResponse = await cResult.response;
    const ctext = cResponse.text();
    console.log(ctext);

    await new Promise(resolve => setTimeout(resolve, 3000)); 
    console.log("Adult");
    const adultc = "Count the adults from the provided text ." + prompt;
    const aResult = await chat.sendMessage(adultc);
    const aResponse = await aResult.response;
    const atext = aResponse.text();
    console.log(atext);

    //     await new Promise(resolve => setTimeout(resolve, 3000)); 
    // console.log("New");
    // const adultc = "Count the adults from the provided text ." + prompt;
    // const aResult = await chat.generateContent(adultc);
    // const aResponse = await aResult.response;
    // const atext = aResponse.text();
    // console.log(atext);

    

    
  }

  return (
    <>
      <button onClick={voc}>Start Listening</button>
      <p>{transcript}</p>
      <p>Starting Date: {extractedData.startingDate}</p>
      <p>Ending Date: {extractedData.endingDate}</p>
      <p>Persons: {extractedData.persons}</p>
      <p>Location: {extractedData.location}</p>
      <p>Child Count: {extractedData.childCount}</p>
      <p>Adult Count: {extractedData.adultCount}</p>
    </>
  );
};

export default ExtractTxtAI;
