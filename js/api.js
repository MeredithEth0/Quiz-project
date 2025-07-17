// --- Fetch Questions from API and Start Quiz ---

// Get the API URL and category name from localStorage
const apiURL = localStorage.getItem("selectedQuizUrl");
const catName = localStorage.getItem("selectedQuizCat");
const quizDifficultyVar = localStorage.getItem("selectedQuizDiff")

// Set the quiz theme/category on the page
quizTheme.textContent = catName;
quizDifficulty.textContent = quizDifficultyVar;

// Quiz state variables (reset on each new quiz)
let currentQuestion = 0;
let currentQuestionNum = 1;
let score = 0;

/**
 * Fetch questions from the API with retry logic.
 * On success, store questions in localStorage and start the quiz.
 */
function fetchQuizAPI(apiURL, attempts = 3) {
    fetch(apiURL)
        .then(response => response.text())
        .then(text => {
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                throw new Error("Invalid JSON");
            }
            if (!data.results || !data.results.length) {
                throw new Error("No questions returned from API.");
            }
            localStorage.setItem("questions", JSON.stringify(data.results));
            // Reset quiz state for new quiz
            currentQuestion = 0;
            currentQuestionNum = 1;
            score = 0;
            startQuiz();
        })
        .catch(error => {
            if (attempts > 1) {
                // Retry after 1 second
                setTimeout(() => fetchQuizAPI(apiURL, attempts - 1), 1000);
            } else {
                console.log("Failed to load quiz API, attempting refresh");
                location.reload();
            }
        });
}

// Call this on page load (quiz.html)
fetchQuizAPI(apiURL);

/**
 * Starts the quiz by displaying the first question.
 * This function is called after questions are successfully fetched.
 */
function startQuiz() {
    displayQuestions();
}
