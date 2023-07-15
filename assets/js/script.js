//disney questions and answer options
const game = [
    {
        question: "What movie is the song, 'We don\'t talk about Bruno?' called?",
        answer: [
            { option: 'Mulan', correct: false},
            { option: 'Toy Story', correct: false},
            { option: 'Encanto', correct: true},
            { option: 'Beauty and The Beast', correct: false}

        ]
    },
    {
        question: "What is the name of the movie that Elsa and Anna are in?",
        answer: [
            { option: 'The Little Mermaid', correct: false},
            { option: 'Snow White', correct: false},
            { option: 'Cinderella', correct: false},
            { option: 'Frozen', correct: true}

        ]
    },
    {
        question: "Merida, from Pixar film Brave, is from what country?",
        answer: [
            { option: 'Italy', correct: false},
            { option: 'Scotland', correct: true},
            { option: 'Sweden', correct: false},
            { option: 'France', correct: false}

        ]
    },
    {
        question: "What are the names of Simba's friends?",
        answer: [
            { option: 'Timon and Pumbaa', correct: true},
            { option: 'Woody and Buzz', correct: false},
            { option: 'Flounder and Sebastian', correct: false},
            { option: 'Kristoff and Sven', correct: false}

        ]
    },
    {
        question: "What does 'Ohana' mean?",
        answer: [
            { option: 'Love', correct: false},
            { option: 'Ocean', correct: false},
            { option: 'Family', correct: true},
            { option: 'Mouse', correct: false}
        ]
    },
    {
        question: "In the Marvel movies, who was nicknamed, 'Point-Break'?",
        answer: [
            { option: 'Captain America', correct: false},
            { option: 'Natasha Romanoff', correct: false},
            { option: 'Thor', correct: false},
            { option: 'Bruce Banner', correct: true}
        ]
    },
    {
        question: "In the Star War movies, who is Rey's grandfather?",
        answer: [
            { option: 'Darth Vadar', correct: false},
            { option: 'Palpatine', correct: true},
            { option: 'Luke Skywalker', correct: false},
            { option: 'Han Solo', correct: true}
        ]
    }
];

const disneyQuestion = document.getElementById("disney-question");
const answerOptions = document.getElementById("answer-options");
const nextQuestionBtn = document.getElementById("next-question-btn");

let currentQuestionIndex = 0;
let score = 0;

function startGame(){
    currentQuestionIndex = 0;
    score = 0;
    nextQuestionBtn.innerHTML = "Next";
    loadQuestion();
}

function loadQuestion(){
    resetState();
    let currentQuestion = game[currentQuestionIndex];
    disneyQuestion.innerHTML = currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.option;
        button.classList.add("btn");
        answerOptions.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectOption);
    });
}

function resetState(){
    nextQuestionBtn.style.display = "none";
    while(answerOptions.firstChild){
        answerOptions.removeChild(answerOptions.firstChild);
    }
}

function selectOption(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{ 
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerOptions.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextQuestionBtn.style.display = "block";
}

function revealScore(){
    resetState();
    disneyQuestion.innerHTML = `You scored ${score} out of ${game.length}!`;
    nextQuestionBtn.innerHTML = "Let's Try Again";
    nextQuestionBtn.style.display = "block";
}



startGame();

