// Prepare the variables for storing the array of questions, score and question number
let currentQuestion = 0;
let currentQuestionNum = 1;
let score = 0;
const questions = JSON.parse(localStorage.getItem("questions") || "[]")
if (questions === "") {
    console.log("error loading API... Refreshing")
    location.reload()
}

displayQuestions();

// func to decode HTML 
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

/**
 * Below is a function that shuffles an array in place using the Fisher-Yates algorithm.
 * This ensures that each option position is just as likely as another. (Every item has an equal chance for every spot)
 */

function shuffle(array) {
    // Start from the last element and move backwards
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i (inclusive)
        let j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    // Return the shuffled array
    return array;
}


function displayQuestions() {
    const q = questions[currentQuestion];
    const answers = [q.correct_answer, ...q.incorrect_answers];
    shuffle(answers); // calls shuffle func
    
    let html = `<h2 id="question">Question number: ${decodeHTML(currentQuestionNum)} of ${questions.length}</h2><h2 id="question">${decodeHTML(q.question)}</h2>`;
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
        feedback = "<p class='feedbackLbl' style='color:green;'><br><strong>Correct answer!</strong><br></p>";
        score++;
    } else {
        feedback = `<p class='feedbackLbl' style='color:red;'><br>Wrong! The correct answer was: <strong>${correct}</strong><br></p>`;
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

