const testQuestions = [{question: "What is 10/2?", answers: {a: '3', b: '5', c: '7', d: '2'}, correctAnswer: 'b'}, {question: "What is 20/5?", answers: {a: '2', b: '5', c: '6', d: '4'}, correctAnswer: 'd'}]; //array of test question objects
let clientAnswers = []; //array to be assembled by the quiz taker's responses
let questionElement = document.createElement("h2"); //this is the actual question text
let optionsList = document.createElement("p"); //list options in this element
let questionsCount; //elapsed questions
let startButton = document.getElementById("startButton"); //define start button
let nextButton = document.createElement("button"); //define next button
nextButton.setAttribute("id", "nextButton");//give next button unique id

//look at activity 9 from week 5 to see what might be a better structure


startButton.addEventListener("click", function() {
    questionsCount = 0;
    document.body.appendChild(questionElement);
    questionElement.textContent = testQuestions[questionsCount].question;
    //document.body.appendChild(optionsList);
    document.body.appendChild(nextButton);
    nextButton.textContent = "Next question ->";
    startButton.remove();
});




function showNextQuestion() {
    questionsCount++;
    optionsList.textContent = testQuestions.answers;
};