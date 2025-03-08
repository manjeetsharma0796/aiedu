const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

const dotenv = require('dotenv')
dotenv.config();
  
  const apiKey = process.env.G_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are examiner checker who calculates marks on the basis of how many correct options chose, and gives answer in json ",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function examiner(questions, options) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "{\"questions\":[{\"question\":\"What is the color of the sky on a sunny day?\",\"options\":[\"A) Green\",\"B) Blue\",\"C) Red\",\"D) Yellow\"],\"correct_answer\":\"B) Blue\"},{\"question\":\"What sound does a dog usually make?\",\"options\":[\"A) Meow\",\"B) Bark\",\"C) Moo\",\"D) Quack\"],\"correct_answer\":\"B) Bark\"},{\"question\":\"How many legs does a spider have?\",\"options\":[\"A) 4\",\"B) 6\",\"C) 8\",\"D) 10\"],\"correct_answer\":\"C) 8\"},{\"question\":\"What is the name of the big yellow star that gives us light and heat?\",\"options\":[\"A) Moon\",\"B) Sun\",\"C) Mars\",\"D) Earth\"],\"correct_answer\":\"B) Sun\"},{\"question\":\"What do bees make?\",\"options\":[\"A) Milk\",\"B) Eggs\",\"C) Honey\",\"D) Wool\"],\"correct_answer\":\"C) Honey\"}],\"options\":[\"b\",\"b\",\"c\",\"b\",\"c\"]}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "{\n\"marks\":  \"5/5\"\n}\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "{\n\"questions\": [\n{\n\"question\":\n\"Explain the difference between 'affect' and 'effect' and provide an example sentence for each.\",\n\"options\": [\n\"A) They are interchangeable; there is no difference.\",\n\"B) 'Affect' is a noun meaning result, and 'effect' is a verb meaning to influence.\",\n\"C) 'Affect' is a verb meaning to influence, and 'effect' is a noun meaning result. Example: The weather *affected* my mood. The *effect* of the medicine was noticeable.\",\n\"D) 'Affect' is a feeling, and 'effect' is a consequence.\"\n],\n\"correct_answer\":\n\"C) 'Affect' is a verb meaning to influence, and 'effect' is a noun meaning result. Example: The weather *affected* my mood. The *effect* of the medicine was noticeable.\"\n},\n{\n\"question\":\n\"Describe the concept of 'cognitive dissonance' and how individuals typically resolve it.\",\n\"options\": [\n\"A) Cognitive dissonance is a state of mental harmony and consistency.\",\n\"B) Cognitive dissonance is the discomfort experienced when holding conflicting beliefs, ideas, or values. Individuals typically resolve it by changing one of the beliefs, adding new beliefs to justify the discrepancy, or reducing the importance of the conflicting beliefs.\",\n\"C) Cognitive dissonance only occurs in people with mental health issues.\",\n\"D) Cognitive dissonance is the same as simple disagreement.\"\n],\n\"correct_answer\":\n\"B) Cognitive dissonance is the discomfort experienced when holding conflicting beliefs, ideas, or values. Individuals typically resolve it by changing one of the beliefs, adding new beliefs to justify the discrepancy, or reducing the importance of the conflicting beliefs.\"\n},\n{\n\"question\":\n\"What is the purpose of a 'try-except' block in Python, and how does it handle exceptions?\",\n\"options\": [\n\"A) It is used to define functions in Python.\",\n\"B) It is used to create loops in Python.\",\n\"C) It's a mechanism for handling errors (exceptions) that might occur during the execution of code. The 'try' block contains the code that might raise an exception, and the 'except' block contains the code that is executed if a specific exception occurs.\",\n\"D) It is used to comment out code in Python.\"\n],\n\"correct_answer\":\n\"C) It's a mechanism for handling errors (exceptions) that might occur during the execution of code. The 'try' block contains the code that might raise an exception, and the 'except' block contains the code that is executed if a specific exception occurs.\"\n},\n{\n\"question\":\n\"Explain the difference between 'renewable' and 'non-renewable' energy sources, providing examples of each.\",\n\"options\": [\n\"A) Renewable energy sources are always cheaper than non-renewable sources.\",\n\"B) Non-renewable energy sources are better for the environment.\",\n\"C) Renewable energy sources are naturally replenished, such as solar, wind, and hydro power. Non-renewable energy sources are finite and cannot be easily replenished, such as coal, oil, and natural gas.\",\n\"D) They are the same thing; the terms are interchangeable.\"\n],\n\"correct_answer\":\n\"C) Renewable energy sources are naturally replenished, such as solar, wind, and hydro power. Non-renewable energy sources are finite and cannot be easily replenished, such as coal, oil, and natural gas.\"\n},\n{\n\"question\": \"Describe the basic principles of the scientific method.\",\n\"options\": [\n\"A) The scientific method involves guessing and hoping for the best.\",\n\"B) The scientific method is a rigid set of rules that never change.\",\n\"C) The scientific method generally involves observation, hypothesis formulation, prediction, experimentation, analysis, and conclusion. It emphasizes empirical evidence and falsifiability.\",\n\"D) The scientific method is based purely on theoretical reasoning without any need for experimentation.\"\n],\n\"correct_answer\":\n\"C) The scientific method generally involves observation, hypothesis formulation, prediction, experimentation, analysis, and conclusion. It emphasizes empirical evidence and falsifiability.\"\n}\n], \"options\": ['c','b','c','c','c']\n}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n\"marks\": \"5/5\"\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "\n{\n\"questions\": [\n{\n\"question\":\n\"Explain the difference between 'affect' and 'effect' and provide an example sentence for each.\",\n\"options\": [\n\"A) They are interchangeable; there is no difference.\",\n\"B) 'Affect' is a noun meaning result, and 'effect' is a verb meaning to influence.\",\n\"C) 'Affect' is a verb meaning to influence, and 'effect' is a noun meaning result. Example: The weather affected my mood. The effect of the medicine was noticeable.\",\n\"D) 'Affect' is a feeling, and 'effect' is a consequence.\"\n],\n\"correct_answer\":\n\"C) 'Affect' is a verb meaning to influence, and 'effect' is a noun meaning result. Example: The weather affected my mood. The effect of the medicine was noticeable.\"\n},\n{\n\"question\":\n\"Describe the concept of 'cognitive dissonance' and how individuals typically resolve it.\",\n\"options\": [\n\"A) Cognitive dissonance is a state of mental harmony and consistency.\",\n\"B) Cognitive dissonance is the discomfort experienced when holding conflicting beliefs, ideas, or values. Individuals typically resolve it by changing one of the beliefs, adding new beliefs to justify the discrepancy, or reducing the importance of the conflicting beliefs.\",\n\"C) Cognitive dissonance only occurs in people with mental health issues.\",\n\"D) Cognitive dissonance is the same as simple disagreement.\"\n],\n\"correct_answer\":\n\"B) Cognitive dissonance is the discomfort experienced when holding conflicting beliefs, ideas, or values. Individuals typically resolve it by changing one of the beliefs, adding new beliefs to justify the discrepancy, or reducing the importance of the conflicting beliefs.\"\n},\n{\n\"question\":\n\"What is the purpose of a 'try-except' block in Python, and how does it handle exceptions?\",\n\"options\": [\n\"A) It is used to define functions in Python.\",\n\"B) It is used to create loops in Python.\",\n\"C) It's a mechanism for handling errors (exceptions) that might occur during the execution of code. The 'try' block contains the code that might raise an exception, and the 'except' block contains the code that is executed if a specific exception occurs.\",\n\"D) It is used to comment out code in Python.\"\n],\n\"correct_answer\":\n\"C) It's a mechanism for handling errors (exceptions) that might occur during the execution of code. The 'try' block contains the code that might raise an exception, and the 'except' block contains the code that is executed if a specific exception occurs.\"\n},\n{\n\"question\":\n\"Explain the difference between 'renewable' and 'non-renewable' energy sources, providing examples of each.\",\n\"options\": [\n\"A) Renewable energy sources are always cheaper than non-renewable sources.\",\n\"B) Non-renewable energy sources are better for the environment.\",\n\"C) Renewable energy sources are naturally replenished, such as solar, wind, and hydro power. Non-renewable energy sources are finite and cannot be easily replenished, such as coal, oil, and natural gas.\",\n\"D) They are the same thing; the terms are interchangeable.\"\n],\n\"correct_answer\":\n\"C) Renewable energy sources are naturally replenished, such as solar, wind, and hydro power. Non-renewable energy sources are finite and cannot be easily replenished, such as coal, oil, and natural gas.\"\n},\n{\n\"question\": \"Describe the basic principles of the scientific method.\",\n\"options\": [\n\"A) The scientific method involves guessing and hoping for the best.\",\n\"B) The scientific method is a rigid set of rules that never change.\",\n\"C) The scientific method generally involves observation, hypothesis formulation, prediction, experimentation, analysis, and conclusion. It emphasizes empirical evidence and falsifiability.\",\n\"D) The scientific method is based purely on theoretical reasoning without any need for experimentation.\"\n],\n\"correct_answer\":\n\"C) The scientific method generally involves observation, hypothesis formulation, prediction, experimentation, analysis, and conclusion. It emphasizes empirical evidence and falsifiability.\"\n}\n], \"options\": ['c','b','c','a','a']\n}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n\"marks\": \"3/5\"\n}\n```"},
          ],
        },
      ],
    });
  

    const result = await chatSession.sendMessage(JSON.stringify({...questions, options}));
    console.log(result.response.text());
    return result.response.text();
  }
  

  const options = ['b', 'b','c','b','c'];
  const questions = {
    "questions": [
      {
        "question": "What is the color of the sky on a sunny day?",
        "options": [
          "A) Green",
          "B) Blue",
          "C) Red",
          "D) Yellow"
        ],
        "correct_answer": "B) Blue"
      },
      {
        "question": "What sound does a dog usually make?",
        "options": [
          "A) Meow",
          "B) Bark",
          "C) Moo",
          "D) Quack"
        ],
        "correct_answer": "B) Bark"
      },
      {
        "question": "How many legs does a spider have?",
        "options": [
          "A) 4",
          "B) 6",
          "C) 8",
          "D) 10"
        ],
        "correct_answer": "C) 8"
      },
      {
        "question": "What is the name of the big yellow star that gives us light and heat?",
        "options": [
          "A) Moon",
          "B) Sun",
          "C) Mars",
          "D) Earth"
        ],
        "correct_answer": "B) Sun"
      },
      {
        "question": "What do bees make?",
        "options": [
          "A) Milk",
          "B) Eggs",
          "C) Honey",
          "D) Wool"
        ],
        "correct_answer": "C) Honey"
      }
    ]
  }
//   run(questions, options);

module.exports = examiner;