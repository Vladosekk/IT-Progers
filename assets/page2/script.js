const questions = [
    {
        question: "Полином Жегалкина это -",
        answers: [
            { text: "Представление булевой функции, имеющая вид суммы по модулю 2 произведений переменных так, чтобы в одном и том же произведении любая переменная встречалась не более 1 раза.", correct: true},
            { text: "Полная система функций основанная на операциях коньюнкции и сложения по модулю 2.", correct: false},
            { text: "логическое выражение, составленное из одного или нескольких простых (или сложных) логических выражений, связанных операций.", correct: false},
            { text: "Математическое логическое выражение, имеющая вид суммы по модулю 2, основанная на операциях коньюнкции. ", correct: false},
        ]
    },
    {
        question: "X ⨁ X = ",
        answers: [
            { text: "X̄", correct: false},
            { text: "0", correct: true},
            { text: "X", correct: false},
            { text: "1", correct: false},
        ]
    },
    {
        question: "X ⨁ X̄ =",
        answers: [
            { text: "1", correct: true},
            { text: "X̄", correct: false},
            { text: "0", correct: false},
            { text: "X", correct: false},
        ]
    },
    {
        question: " Каковы основные свойства полинома Жегалкина? ",
        answers: [
            { text: "Экспоненциальный рост и полиномиальное убывание", correct: false},
            { text: "Нет правильного ответа", correct: false},
            { text: "Непрерывность и дифференцируемость", correct: false},
            { text: "Линейность и унитарность", correct: true},
        ]
    },
    {
        question: " Какое количество переменных может быть включено в полином Жигалкина? ",
        answers: [
            { text: "Только 3 переменных", correct: false},
            { text: "От 2 до 4 переменных", correct: false},
            { text: "Любое количество переменных", correct: false},
            { text: "От 3 до 5 переменных", correct: true},
        ]
    },
    {
        question: "X ⨁ 1 =",
        answers: [
            { text: "X", correct: false},
            { text: "1", correct: false},
            { text: "X̄", correct: true},
            { text: "0", correct: false},
        ]
    }   
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Далее...";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    isAnswered = false;
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){ 
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
           button.classList.add("correct"); 
        }
        button.disabled = true;
    });
    isAnswered = true;
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Вы набрали ${score} Балла из ${questions.length}!`;
    nextButton.innerHTML = "Пройти заново..";
    nextButton.style.display = "block";
}

function handleNextButton(){
    if(currentQuestionIndex < questions.length - 1){
        currentQuestionIndex++;
        showQuestion();
    }else{
        showScore();
    }
}

function playAgain(){
    startQuiz();
}

nextButton.addEventListener("click", ()=>{
    if (isAnswered){
        handleNextButton();
    } else {
        playAgain();
    }
});

startQuiz();