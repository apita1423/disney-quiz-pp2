//disney questions and answer options
const game = [
    {
        question: "What movie is the song, 'We don\'t talk about Bruno?' from?",
        answer: [
            { option: 'Mulan', correct: false },
            { option: 'Toy Story', correct: false },
            { option: 'Encanto', correct: true },
            { option: 'Beauty and The Beast', correct: false }
        ]
    },
    {
        question: "What is the name of the movie that Elsa and Anna are in?",
        answer: [
            { option: 'The Little Mermaid', correct: false },
            { option: 'Snow White', correct: false },
            { option: 'Cinderella', correct: false },
            { option: 'Frozen', correct: true }
        ]
    },
    {
        question: "Merida, from Pixar film Brave, is from what country?",
        answer: [
            { option: 'Italy', correct: false },
            { option: 'Scotland', correct: true },
            { option: 'Sweden', correct: false },
            { option: 'France', correct: false }
        ]
    },
    {
        question: "What are the names of Simba's friends?",
        answer: [
            { option: 'Timon and Pumbaa', correct: true },
            { option: 'Woody and Buzz', correct: false },
            { option: 'Flounder and Sebastian', correct: false },
            { option: 'Kristoff and Sven', correct: false }
        ]
    },
    {
        question: "What does 'Ohana' mean?",
        answer: [
            { option: 'Love', correct: false },
            { option: 'Ocean', correct: false },
            { option: 'Family', correct: true },
            { option: 'Mouse', correct: false }
        ]
    },
    {
        question: "In the Marvel movies, who was nicknamed, 'Point Break'?",
        answer: [
            { option: 'Captain America', correct: false },
            { option: 'Natasha Romanoff', correct: false },
            { option: 'Thor', correct: true },
            { option: 'Bruce Banner', correct: false }
        ]
    },
    {
        question: "In the Star War movies, who is Rey's grandfather?",
        answer: [
            { option: 'Darth Vader', correct: false },
            { option: 'Palpatine', correct: true },
            { option: 'Luke Skywalker', correct: false },
            { option: 'Han Solo', correct: false }
        ]
    },
    {
        question: "Where is Disney World located?",
        answer: [
            { option: 'Florida', correct: true },
            { option: 'California', correct: false },
            { option: 'Paris', correct: false },
            { option: 'Washington', correct: false }
        ]
    }
];

//I relied on Javascript code from GreatStack YouTube - link on the README
//defined variables from html
const disneyQuestion = document.getElementById("disney-question");
const answerOptions = document.getElementById("answer-options");
const nextQuestionBtn = document.getElementById("next-question-btn");

//defined variables to start questions and score from 0
let currentQuestionIndex = 0;
let score = 0;

//function to start the quiz and when the user hits "Let's Play Again" it will prompt to go to the first question and start the score from 0
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextQuestionBtn.innerHTML = "Next";
    loadQuestion();
}

//function loads the quiz's questions from the beginning
function loadQuestion() {
    resetState();
    let currentQuestion = game[currentQuestionIndex];
    disneyQuestion.innerHTML = currentQuestion.question;

    //this allows to show the answer choices inside buttons
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.option;
        button.classList.add("btn");
        answerOptions.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", choicesOption);
    });
}

//resetState function allows for the answers in the questions to be the only ones showing in place of the A, B, C, D from the html.
function resetState() {
    nextQuestionBtn.style.display = "none";
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    }
}

/**
 * This function is when the user is selecting their answer choice. If the choice is correct then the score will increment, if
 *  not their score will not increment. A class was added of correct and incorrect. When the user would get the answer correct the
 * button would turn green. If they got it wrong the one they chose would turn red and the right answer will show up as green. 
 */
function choicesOption(event) {
    const chosenBtn = event.target;
    const isCorrect = chosenBtn.dataset.correct === "true";
    if (isCorrect) {
        chosenBtn.classList.add("correct");
        score++;
    } else {
        chosenBtn.classList.add("incorrect");
    }
    Array.from(answerOptions.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextQuestionBtn.style.display = "block";
}

//when the quiz is finish it will display the score out of the full amount of questions
function revealScore() {
    resetState();
    disneyQuestion.innerHTML = `You scored ${score} out of ${game.length}!`;
    nextQuestionBtn.innerHTML = "Let's Play Again";
    nextQuestionBtn.style.display = "block";
}

/**
 * If the questions has not reached the total number of questions then it would go on to the next question. 
 * If the questions has reached the total number of questions then it will prompt it to reveal the score
*/
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < game.length) {
        loadQuestion();
    } else {
        revealScore();
    }
}

/**
 * event listener for next button. If the questions has not reach the length of the question the next question button would show.
 * If it has reached then it would go back to the function of startGame, which blocks the next button until the user has clicked
 * on a answer. 
 */
nextQuestionBtn.addEventListener("click", () => {
    if (currentQuestionIndex < game.length) {
        handleNextButton();
    } else {
        startGame();
    }
});

startGame();
