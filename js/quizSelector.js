// Example simple URL: https://opentdb.com/api.php?amount=10
// Example complex URL: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

// This is the URl to pull the API, it is formulated of 5 pieces to allow user control on what quiz they get
const URLp1 = "https://opentdb.com/api.php?amount=";
let URLp2 = "10"; // Number of questions
let URLp3 = "";   // e.g., "&category=9"
let URLp4 = "";   // e.g., "&difficulty=easy"
let URLp5 = ""; // e.g., "&type=multiple"

document.querySelectorAll(".QuizOptionBtn").forEach(btn => {
    btn.addEventListener("click", function() {
        //This harvest the URL from the data-url
        URLp3 = btn.getAttribute("data-url") || "";
        const selectedDifficultyInput = document.querySelector('input[name="difficulty"]:checked');
        URLp4 = selectedDifficultyInput ? selectedDifficultyInput.value : '';


        const categoryName = btn.textContent.trim();
        //this stores the URL into local storage for the next page
        const finalURL = `${URLp1}${URLp2}${URLp3}${URLp4}${URLp5}`;
        console.log("API URL: ", finalURL);
        localStorage.setItem("selectedQuizUrl", finalURL);
        localStorage.setItem("selectedQuizCat", categoryName);
        window.location.href = "quiz.html";
    });
});