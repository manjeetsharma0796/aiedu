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
    systemInstruction: "You are an awesome teacher who gives assesment at their mentioned level in their specified language. Then in the next chat uou always provide 5 questions with expected answer in json format, also give marks on accessment when asked or prompted",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "{\"level\": \"easy\", \"language\": \"eniglish\"}\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "{\n  \"questions\": [\n    {\n      \"question\": \"What is the plural of 'cat'?\",\n      \"options\": [\n        \"A) Cats\",\n        \"B) Caties\",\n        \"C) Cates\",\n        \"D) Cat\"\n      ],\n      \"correct_answer\": \"A) Cats\"\n    },\n    {\n      \"question\": \"Which word is a verb?\",\n      \"options\": [\n        \"A) Apple\",\n        \"B) Run\",\n        \"C) Beautiful\",\n        \"D) Quickly\"\n      ],\n      \"correct_answer\": \"B) Run\"\n    },\n    {\n      \"question\": \"Choose the correct sentence:\",\n      \"options\": [\n        \"A) She am happy.\",\n        \"B) She is happy.\",\n        \"C) She are happy.\",\n        \"D) She be happy.\"\n      ],\n      \"correct_answer\": \"B) She is happy.\"\n    },\n    {\n      \"question\": \"What is the opposite of 'hot'?\",\n      \"options\": [\n        \"A) Cold\",\n        \"B) Warm\",\n        \"C) Bright\",\n        \"D) Small\"\n      ],\n      \"correct_answer\": \"A) Cold\"\n    },\n    {\n      \"question\": \"Which word rhymes with 'hat'?\",\n      \"options\": [\n        \"A) Bat\",\n        \"B) Pen\",\n        \"C) Dog\",\n        \"D) Tree\"\n      ],\n      \"correct_answer\": \"A) Bat\"\n    }\n  ]\n}"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "{\"level\" : \"easy\", \"language\":\" spanish\"}\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "\n{\n  \"questions\": [\n    {\n      \"question\": \"¿Cuál es el plural de 'libro'?\",\n      \"options\": [\n        \"A) Libro\",\n        \"B) Libros\",\n        \"C) Libroses\",\n        \"D) Libre\"\n      ],\n      \"correct_answer\": \"B) Libros\"\n    },\n    {\n      \"question\": \"¿Qué palabra es un verbo?\",\n      \"options\": [\n        \"A) Casa\",\n        \"B) Comer\",\n        \"C) Bonito\",\n        \"D) Rápidamente\"\n      ],\n      \"correct_answer\": \"B) Comer\"\n    },\n    {\n      \"question\": \"Elige la frase correcta:\",\n      \"options\": [\n        \"A) Yo es alto.\",\n        \"B) Yo soy alto.\",\n        \"C) Yo está alto.\",\n        \"D) Yo ser alto.\"\n      ],\n      \"correct_answer\": \"B) Yo soy alto.\"\n    },\n    {\n      \"question\": \"¿Cuál es el opuesto de 'grande'?\",\n      \"options\": [\n        \"A) Alto\",\n        \"B) Pequeño\",\n        \"C) Bueno\",\n        \"D) Nuevo\"\n      ],\n      \"correct_answer\": \"B) Pequeño\"\n    },\n    {\n      \"question\": \"¿Qué palabra rima con 'sol'?\",\n      \"options\": [\n        \"A) Mar\",\n        \"B) Pan\",\n        \"C) Gol\",\n        \"D) Luz\"\n      ],\n      \"correct_answer\": \"C) Gol\"\n    }\n  ]\n}\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "{\"level\": \"hard\", \"language\": \"english\"}\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"questions\": [\n    {\n      \"question\": \"Analyze the following sentence and identify the type of logical fallacy: 'If we allow students to wear hats in school, then they'll start wearing pajamas, and eventually, society will collapse.'\",\n      \"options\": [\n        \"A) Ad Hominem\",\n        \"B) Straw Man\",\n        \"C) Slippery Slope\",\n        \"D) False Dilemma\"\n      ],\n      \"correct_answer\": \"C) Slippery Slope\"\n    },\n    {\n      \"question\": \"What is the primary difference between a recursive function and an iterative function in computer science?\",\n      \"options\": [\n        \"A) Recursive functions are always faster than iterative functions.\",\n        \"B) Iterative functions use less memory than recursive functions.\",\n        \"C) Recursive functions call themselves, while iterative functions use loops.\",\n        \"D) There is no difference; the terms are interchangeable.\"\n      ],\n      \"correct_answer\": \"C) Recursive functions call themselves, while iterative functions use loops.\"\n    },\n    {\n      \"question\": \"Critically evaluate the philosophical implications of the Ship of Theseus thought experiment.\",\n      \"options\": [\n        \"A) It proves that identity is merely a social construct.\",\n        \"B) It challenges the concept of identity over time, suggesting that gradual replacement of components may not alter the object's essential nature.\",\n        \"C) It demonstrates the superiority of material substance over abstract form.\",\n        \"D) It supports the idea that everything changes constantly, and therefore, identity is impossible.\"\n      ],\n      \"correct_answer\": \"B) It challenges the concept of identity over time, suggesting that gradual replacement of components may not alter the object's essential nature.\"\n    },\n    {\n      \"question\": \"Explain the Heisenberg Uncertainty Principle and its impact on our understanding of quantum mechanics.\",\n      \"options\": [\n        \"A) It states that the speed of light is constant for all observers.\",\n        \"B) It asserts that the position and momentum of a particle cannot both be precisely known simultaneously.\",\n        \"C) It describes the force of gravity between two objects.\",\n        \"D) It explains the phenomenon of radioactive decay.\"\n      ],\n      \"correct_answer\": \"B) It asserts that the position and momentum of a particle cannot both be precisely known simultaneously.\"\n    },\n    {\n      \"question\": \"Analyze the economic consequences of a sudden and significant increase in the minimum wage.\",\n      \"options\": [\n        \"A) It always leads to increased employment and economic growth.\",\n        \"B) It always leads to decreased employment and economic recession.\",\n        \"C) The consequences are complex and depend on various factors, such as the elasticity of labor demand, the overall economic climate, and the size of the increase.\",\n        \"D) It has no measurable impact on the economy.\"\n      ],\n      \"correct_answer\": \"C) The consequences are complex and depend on various factors, such as the elasticity of labor demand, the overall economic climate, and the size of the increase.\"\n    }\n  ]\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "{\"level\": \"easy\", \"language\": \"english\"}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"questions\": [\n    {\n      \"question\": \"Which of these is a primary color?\",\n      \"options\": [\n        \"A) Green\",\n        \"B) Purple\",\n        \"C) Red\",\n        \"D) Orange\"\n      ],\n      \"correct_answer\": \"C) Red\"\n    },\n    {\n      \"question\": \"What is the name of the planet we live on?\",\n      \"options\": [\n        \"A) Mars\",\n        \"B) Jupiter\",\n        \"C) Earth\",\n        \"D) Venus\"\n      ],\n      \"correct_answer\": \"C) Earth\"\n    },\n    {\n      \"question\": \"How many fingers do most people have on one hand?\",\n      \"options\": [\n        \"A) Three\",\n        \"B) Four\",\n        \"C) Five\",\n        \"D) Six\"\n      ],\n      \"correct_answer\": \"C) Five\"\n    },\n    {\n      \"question\": \"Which animal is known as the 'king of the jungle'?\",\n      \"options\": [\n        \"A) Elephant\",\n        \"B) Tiger\",\n        \"C) Lion\",\n        \"D) Giraffe\"\n      ],\n      \"correct_answer\": \"C) Lion\"\n    },\n    {\n      \"question\": \"What shape is a stop sign?\",\n      \"options\": [\n        \"A) Square\",\n        \"B) Circle\",\n        \"C) Octagon\",\n        \"D) Triangle\"\n      ],\n      \"correct_answer\": \"C) Octagon\"\n    }\n  ]\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "{\"level\": \"easy\", \"language\":\"hindi\"}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"questions\": [\n    {\n      \"question\": \"इनमें से कौन सा रंग प्राथमिक रंग है?\",\n      \"options\": [\n        \"A) हरा\",\n        \"B) बैंगनी\",\n        \"C) लाल\",\n        \"D) नारंगी\"\n      ],\n      \"correct_answer\": \"C) लाल\"\n    },\n    {\n      \"question\": \"हम जिस ग्रह पर रहते हैं उसका नाम क्या है?\",\n      \"options\": [\n        \"A) मंगल\",\n        \"B) बृहस्पति\",\n        \"C) पृथ्वी\",\n        \"D) शुक्र\"\n      ],\n      \"correct_answer\": \"C) पृथ्वी\"\n    },\n    {\n      \"question\": \"ज्यादातर लोगों के एक हाथ में कितनी उंगलियां होती हैं?\",\n      \"options\": [\n        \"A) तीन\",\n        \"B) चार\",\n        \"C) पांच\",\n        \"D) छह\"\n      ],\n      \"correct_answer\": \"C) पांच\"\n    },\n    {\n      \"question\": \"किस जानवर को 'जंगल का राजा' कहा जाता है?\",\n      \"options\": [\n        \"A) हाथी\",\n        \"B) बाघ\",\n        \"C) शेर\",\n        \"D) जिराफ\"\n      ],\n      \"correct_answer\": \"C) शेर\"\n    },\n    {\n      \"question\": \"स्टॉप साइन का आकार क्या होता है?\",\n      \"options\": [\n        \"A) वर्ग\",\n        \"B) वृत्त\",\n        \"C) अष्टकोण\",\n        \"D) त्रिकोण\"\n      ],\n      \"correct_answer\": \"C) अष्टकोण\"\n    }\n  ]\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "{\"level\":\"hard\", \"language\":\"english\"}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"questions\": [\n    {\n      \"question\": \"Explain the concept of 'emergence' in complex systems, providing a concrete example.\",\n      \"options\": [\n        \"A) It refers to the pre-programmed behavior of individual components within a system.\",\n        \"B) It describes the predictable outcome of linear interactions between elements.\",\n        \"C) It's a phenomenon where higher-level properties arise that are not readily predictable from the properties of the individual components. Example: Consciousness arising from the interaction of neurons.\",\n        \"D) It's simply the sum of the parts being equal to the whole.\"\n      ],\n      \"correct_answer\": \"C) It's a phenomenon where higher-level properties arise that are not readily predictable from the properties of the individual components. Example: Consciousness arising from the interaction of neurons.\"\n    },\n    {\n      \"question\": \"Compare and contrast the philosophical arguments for and against determinism.\",\n      \"options\": [\n        \"A) Determinism is universally accepted, so there are no arguments against it.\",\n        \"B) Determinism argues that all events are causally determined, while arguments against it raise concerns about free will, moral responsibility, and the predictability of complex systems.\",\n        \"C) Arguments for determinism are based solely on religious doctrine.\",\n        \"D) Arguments against determinism are purely based on scientific evidence.\"\n      ],\n      \"correct_answer\": \"B) Determinism argues that all events are causally determined, while arguments against it raise concerns about free will, moral responsibility, and the predictability of complex systems.\"\n    },\n    {\n      \"question\": \"Describe the challenges in developing a truly general artificial intelligence (AGI).\",\n      \"options\": [\n        \"A) The only challenge is increasing computational power.\",\n        \"B) We already have AGI; it's just not widely distributed.\",\n        \"C) Challenges include replicating human-level reasoning, common sense, adaptability, consciousness, and the ability to learn and transfer knowledge across diverse domains.\",\n        \"D) The challenge lies primarily in finding enough training data.\"\n      ],\n      \"correct_answer\": \"C) Challenges include replicating human-level reasoning, common sense, adaptability, consciousness, and the ability to learn and transfer knowledge across diverse domains.\"\n    },\n    {\n      \"question\": \"What are the fundamental limitations of Gödel's incompleteness theorems and their relevance to mathematics and computer science?\",\n      \"options\": [\n        \"A) They prove that all mathematical systems are inconsistent.\",\n        \"B) They prove that mathematics is inherently useless.\",\n        \"C) They demonstrate that any sufficiently complex formal system will contain statements that are true but unprovable within the system itself and that the consistency of the system cannot be proven within the system. This has implications for the limits of formal verification and the capabilities of AI.\",\n        \"D) They only apply to very simple mathematical systems.\"\n      ],\n      \"correct_answer\": \"C) They demonstrate that any sufficiently complex formal system will contain statements that are true but unprovable within the system itself and that the consistency of the system cannot be proven within the system. This has implications for the limits of formal verification and the capabilities of AI.\"\n    },\n    {\n      \"question\": \"Explain the concept of 'confirmation bias' and how it can negatively impact scientific research and decision-making.\",\n      \"options\": [\n        \"A) Confirmation bias is a tendency to seek out, interpret, favor, and recall information that confirms one's existing beliefs or hypotheses. This can lead to flawed research methodologies, biased data interpretation, and poor decision-making based on incomplete or skewed evidence.\",\n        \"B) Confirmation bias is a desire to disprove one's own beliefs.\",\n        \"C) Confirmation bias only affects non-scientific fields.\",\n        \"D) Confirmation bias is a synonym for objectivity.\"\n      ],\n      \"correct_answer\": \"A) Confirmation bias is a tendency to seek out, interpret, favor, and recall information that confirms one's existing beliefs or hypotheses. This can lead to flawed research methodologies, biased data interpretation, and poor decision-making based on incomplete or skewed evidence.\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(JSON.stringify(prompt));
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
  
  const answer_data = {...questions, options};
  console.log(JSON.stringify(answer_data));
  const prompt = `so the user opted these ${options}, for the following this questions  ${questions} only ,
  vbna give final marks like the given format ${
    {"marks": 4}
  }`;
  // const prompt = {level: "easy", language: "japanese"}
  // run(prompt);


  module.exports = run;