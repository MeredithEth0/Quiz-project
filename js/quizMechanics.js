// --- Quiz Logic and Display Functions ---

/**
 * Decodes HTML entities in a string.
 * Useful for displaying quiz questions and answers properly.
 */
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * Ensures answer options are presented in random order.
 */
function shuffle(array) {
    // Loop from the last element down to the second element
    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        // Pick a random index from 0 to currentIndex
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        // Swap the elements at currentIndex and randomIndex
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Displays the current question and answer options.
 * Handles the end-of-quiz state as well.
 */
function displayQuestions() {
    const questions = JSON.parse(localStorage.getItem("questions") || "[]");

    // End of quiz
    if (!questions.length || currentQuestion >= questions.length) {
        document.getElementById("quizContainer").innerHTML = `
            <h2>Quiz Complete!</h2>
            <p>Your score was ${score} / ${questions.length}</p>
            <p>Please press "Reset Quiz" to play again!</p>`;
        document.getElementById("nextButton").style.display = "none";
        return;
    }

    const q = questions[currentQuestion];
    const answers = [q.correct_answer, ...q.incorrect_answers];
    shuffle(answers);

    let html = `
        <h2 id="question">Question number: ${decodeHTML(currentQuestionNum)} of ${questions.length}</h2>
        <h2 id="question">${decodeHTML(q.question)}</h2>
    `;
    answers.forEach(answer => {
        html += `<button class="answer-btn" data-answer="${decodeHTML(answer)}">${decodeHTML(answer)}</button><br>`;
    });

    document.getElementById("quizContainer").innerHTML = html;

    // Add event listeners for answer buttons
    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            selectAnswer(this.dataset.answer, decodeHTML(q.correct_answer));
        });
    });

    document.getElementById("nextButton").style.display = "none";
}

/**
 * Handles the user's answer selection.
 * Shows feedback and enables the "Next" button.
 */
function selectAnswer(selected, correct) {
    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.disabled = true;
        btn.style.backgroundColor = "";
    });

    document.querySelectorAll(".answer-btn").forEach(btn => {
        if (btn.dataset.answer === selected) {
            btn.style.backgroundColor = (selected === correct) ? "green" : "red";
        }
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

// Handle "Next" button click to move to the next question
document.getElementById("nextButton").addEventListener("click", function() {
    currentQuestion++;
    currentQuestionNum++;
    displayQuestions();
});
