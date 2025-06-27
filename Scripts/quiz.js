// Prepare the variables for storing the array of questions, score and question number
let questions = [];
let currentQuestion = 0;
let currentQuestionNum = 1;
let score = 0;

const apiUrl = localStorage.getItem("selectedQuizUrl");
const catName = localStorage.getItem("selectedQuizCat");
quizTheme.textContent = catName;

// func to decode HTML 
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// func to shuffle the answers to avoid repeat positioning
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetch questions API and start quiz
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        questions = data.results;
        displayQuestions();
    });

function displayQuestions() {
    const q = questions[currentQuestion];
    const answers = [q.correct_answer, ...q.incorrect_answers];
    shuffle(answers); // calls shuffle func
    
    let html = `<h2 id="question">Question number: ${decodeHTML(currentQuestionNum)}</h2><h2 id="question">${decodeHTML(q.question)}</h2>`;
    answers.forEach(answer => {
        html += `<button class="answer-btn" data-answer="${decodeHTML(answer)}">${decodeHTML(answer)}</button><br>`;
    });

    document.getElementById("quizContainer").innerHTML = html;

    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            selectAnswer(this.dataset.answer, decodeHTML(q.correct_answer));
        });
    });
    document.getElementById("nextButton").style.display = "none";
}

function selectAnswer(selected, correct) {
    // Disable all answer buttons and reset colors
    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.disabled = true;
        btn.style.backgroundColor = "";
    });

    // Highlight clicked button (green if correct, red if wrong)
    document.querySelectorAll(".answer-btn").forEach(btn => {
        if (btn.dataset.answer === selected) {
            btn.style.backgroundColor = (selected === correct) ? "green" : "red";
        }
        // Highlight correct answer if wrong
        if (selected !== correct && btn.dataset.answer === correct) {
            btn.style.backgroundColor = "green";
        }
    });

    let feedback = "";
    if (selected === correct) {
        feedback = "<br><p style='color:green;'><strong>Correct answer!</strong></p><br>";
        score++;
    } else {
        feedback = `<br><p style='color:red;'>Wrong! The correct answer was: <strong>${correct}</strong></p><br>`;
    }

    document.getElementById("quizContainer").innerHTML += feedback;
    document.getElementById("nextButton").style.display = "inline-block";
}

document.getElementById("nextButton").addEventListener("click", function() {
    currentQuestion++;
    currentQuestionNum++;
    if (currentQuestion < questions.length) {
        displayQuestions();
    } else {
        document.getElementById("quizContainer").innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score was ${score} / ${questions.length}</p>
        <p>Please press "Reset Quiz" to play again!</p>`;
        this.style.display = "none";
    }
});

//Button on the bottom of the page to reset the quiz (which refreshes the webpage)
document.getElementById("resetButton").addEventListener("click",function(){
    location.reload();
});

//this adds function to the back button
document.getElementById("backButton").addEventListener("click",function(){
    window.location.href = "index.html";
})
