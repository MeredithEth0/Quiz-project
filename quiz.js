// Prepare the variables for storing the array of questions, score and question number
let questions = [];
let currentQuestion = 0;
let currentQuestionNum = 1;
let score = 0;

// func to decode HTML 
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// func to shuffle the answers to avoid repeat poitioning
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetch questions API and start quiz
fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
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
    let feedback = "";
    if (selected === correct) {
        feedback = "<p style='color:green;'>Correct answer!</p>";
        score++;
    } else {
        feedback = `<p style='color:red;'>Wrong! The correct answer was: <strong>${correct}</strong></p>`;
    }

    document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);

    document.getElementById("quizContainer").innerHTML += feedback;
    document.getElementById("nextButton").style.display = "inline-block";
}

document.getElementById("nextButton").addEventListener("click", function() {
    currentQuestion++;
    currentQuestionNum++;
    if (currentQuestion < questions.length) {
        displayQuestions();
    } else {
        document.getElementById("quizContainer").innerHTML = `<h2>Quiz Complete!</h2><p>Your score was ${score} / ${questions.length}</p>`;
        this.style.display = "none";
    }
});

//Button on the bottom of the page to reset the quiz (which refreshes the webpage)
document.getElementById("resetButton").addEventListener("click",function(){
    location.reload();
});

//This part of the script controls the darkmode button
const darkModeButton = document.getElementById('darkModeButton');
const body = document.body;

// Optional: Remember preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('darkMode');
    darkModeButton.textContent = 'Light Mode';
}

darkModeButton.addEventListener('click', function() {
    body.classList.toggle('darkMode');
    const enabled = body.classList.contains('darkMode');
    darkModeButton.textContent = enabled ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
});