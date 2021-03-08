let testQuestions = [{question: "What is 10/2?", answers: {a: '3', b: '5', c: '7', d: '2'}, correctAnswer: 'b'}, {question: "What is 20/5?", answers: {a: '2', b: '5', c: '6', d: '4'}, correctAnswer: 'd'}]; //array of test question objects
let clientAnswers = []; //array to be assembled by the quiz taker's responses
let questionElement = document.createElement("h2"); //this is the actual question text
let optionsList = document.createElement("p"); //
let questionsCount; //elapsed questions
