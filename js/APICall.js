const apiUrl = localStorage.getItem("selectedQuizUrl");
const catName = localStorage.getItem("selectedQuizCat");
quizTheme.textContent = catName;
let selectedQuestions = [];


// Fetch questions API and start quiz
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        selectedQuestions = data.results;
        localStorage.setItem("questions", JSON.stringify(data.results));
    });