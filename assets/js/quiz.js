let answersFromClient = [];
let currentQuestion = 0;
const testQuestions = [{question: 'Inside which HTML element do we put the JavaScript?',
answers: {a: '<script>', b: '<scripting>', c: '<js>', d: '<javascript>'},
correctAnswer: '<script>'},
{question: 'What is the correct syntax for referring to an external script called xxx.js?',
answers: {a: '<script href="xxx.js">', b: '<script src="xxx.js">', c: '<script name="xxx.js">', d: '<javascript src="xxx.js">'},
correctAnswer: '<script src="xxx.js">'},
{question: 'How do you write "Hello World" in an alert box?',
answers: {a: 'alertBox("Hello World");', b: 'msgBox("Hello World");', c: 'msg("Hello World");', d: 'alert("Hello World");'},
correctAnswer: 'alert("Hello World");'},
{question: 'How do you create a function in JavaScript?',
answers: {a: 'function:myFunction()', b: 'function myFunction()', c: 'function = myFunction()', d: 'funct myFunction()'},
correctAnswer: 'function myFunction()'},
{question: 'How does a FOR loop start?',
answers: {a: 'for i = 1 to 5', b: 'for (i <= 5; i++)', c: 'for (i =0; i <= 5; i++)', d: 'for (i = 0; i <= 5)'},
correctAnswer: 'for (i =0; i <= 5; i++)'},
{question: 'How can you add a comment in JavaScript?',
answers: {a: '\'This is a comment', b: '//This is a comment', c: '<!--This is a comment-->', d: '##This is a comment'},
correctAnswer: '//This is a comment'},
{question: 'What is the correct way to write a JavaScript array?',
answers: {a: 'var colors = ["red", "green", "blue"]', b: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', c: 'var colors = "red", "green", "blue"', d: 'var colors = (1:"red", 2:"green", 3:"blue")'},
correctAnswer: 'var colors = ["red", "green", "blue"]'},
{question: 'Which event occurs when the user clicks on an HTML element?',
answers: {a: 'onmouseover', b: 'onchange', c: 'onclick', d: 'onmouseclick'},
correctAnswer: 'onclick'}];
//const testQuestions = [{question: "What is 10/2?", answers: {a: '3', b: '5', c: '7', d: '2'}, correctAnswer: '5'}, {question: "What is the color of the sky?", answers: {a: 'hah', b: 'blue', c: 'what', d: '2'}, correctAnswer: 'blue'}, {question: "What is 20/5?", answers: {a: '2', b: '5', c: '6', d: '4'}, correctAnswer: '4'}]; //array of test question objects

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

function evaluateResponses() {
    answersFromClient[currentQuestion] = getCurrentAnswer();
    let evaluatedResponses = {boolValues: [], count: 0, timeOfQuiz: {}};
    for (var i = 0; i < answersFromClient.length; i++) {
        if (answersFromClient[i] === (testQuestions[i].correctAnswer)) {
            evaluatedResponses.boolValues[i] = true;
            evaluatedResponses.count++;
        } else evaluatedResponses.boolValues[i] = false;
    };
    let generatedDateTime = new Date();
    evaluatedResponses.timeOfQuiz = generatedDateTime.toLocaleString();
    console.log(evaluatedResponses);
    localStorage.setItem("correctAnswers", evaluatedResponses.boolValues);
    localStorage.setItem("count", evaluatedResponses.count);
    localStorage.setItem("quizTime", evaluatedResponses.timeOfQuiz);
    return evaluatedResponses;
};

function submitResponses() {
    evaluateResponses();
    showOnly(quizResults);
};

submitButton.addEventListener("click", submitResponses);