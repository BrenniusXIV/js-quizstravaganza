let answersFromClient = [];
let currentQuestion = 0;
const testQuestions = [{question: "What is 10/2?", answers: {a: '3', b: '5', c: '7', d: '2'}, correctAnswer: '5'}, {question: "What is the color of the sky?", answers: {a: 'hah', b: 'blue', c: 'what', d: '2'}, correctAnswer: 'blue'}, {question: "What is 20/5?", answers: {a: '2', b: '5', c: '6', d: '4'}, correctAnswer: '4'}]; //array of test question objects

let questionText = document.getElementById("questionText");

let option1 = document.getElementById("option1");
let option1Label = document.getElementById("option1Label");
let option2 = document.getElementById("option2");
let option2Label = document.getElementById("option2Label");
let option3 = document.getElementById("option3");
let option3Label = document.getElementById("option3Label");
let option4 = document.getElementById("option4");
let option4Label = document.getElementById("option4Label");

const buttonArray = [option1, option2, option3, option4];

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");

prevButton.addEventListener("click", handlePrevQuestion);
nextButton.addEventListener("click", handleNextQuestion);

// prevButton.onclick = handlePrevQuestion;
// nextButton.onclick = handleNextQuestion;
updateQuestion();

function updateQuestion() {
    //grab question text from array
    questionText.textContent = testQuestions[currentQuestion].question;
    //grab answer possibilities from array
    option1.setAttribute("value", testQuestions[currentQuestion].answers.a);
    option1Label.textContent = "a: " + option1.getAttribute("value");
    option2.setAttribute("value", testQuestions[currentQuestion].answers.b);
    option2Label.textContent = "b: " + option2.getAttribute("value");
    option3.setAttribute("value", testQuestions[currentQuestion].answers.c);
    option3Label.textContent = "c: " + option3.getAttribute("value");
    option4.setAttribute("value", testQuestions[currentQuestion].answers.d);
    option4Label.textContent = "d: " + option4.getAttribute("value");

    if (currentQuestion === 0) {
        hideElement(prevButton);
    }
    else showElement(prevButton);

    if (currentQuestion !== (testQuestions.length - 1)) {
        hideElement(submitButton);
    };

    if (currentQuestion === (testQuestions.length - 1)) {
        hideElement(nextButton);
        showElement(submitButton);
    }
    else showElement(nextButton);

    //reset radio buttons
    buttonArray.forEach((opt, index) => {
       if (opt.value === answersFromClient[currentQuestion]) {
           opt.checked = true;
        }
        else {
            opt.checked = false;
        };
    });


};

function getCurrentAnswer() {
    const selection = buttonArray.find(opt => opt.checked);
    if (selection) {
        return selection.value;
    };
    return undefined;
};

function handleNextQuestion() {
    answersFromClient[currentQuestion] = getCurrentAnswer();
    currentQuestion++;
    updateQuestion();

};

function handlePrevQuestion() {
    answersFromClient[currentQuestion] = getCurrentAnswer();
    currentQuestion--;
    updateQuestion();

};

// function evaluateResponses() {
//     answersFromClient[currentQuestion] = getCurrentAnswer();
//     let evaluatedResponse = [];
//     answersFromClient.forEach(response => {
//         if (answersFromClient[response] === (testQuestions[response].correctAnswer)) {
//             evaluatedResponse[response] = true;
//         } else evaluatedResponse[response] = false;
//         return evaluatedResponse;
//     });
// };

function evaluateResponses() {
    answersFromClient[currentQuestion] = getCurrentAnswer();
    let evaluatedResponses = {boolValues: [], count: 0};
    for (var i = 0; i < answersFromClient.length; i++) {
        if (answersFromClient[i] === (testQuestions[i].correctAnswer)) {
            evaluatedResponses.boolValues[i] = true;
            evaluatedResponses.count++;
        } else evaluatedResponses.boolValues[i] = false;
    };

    localStorage.setItem("correctAnswers", evaluatedResponses.boolValues);
    localStorage.setItem("count", evaluatedResponses.count);
    return evaluatedResponses;
};