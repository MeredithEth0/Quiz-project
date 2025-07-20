// Example simple URL: https://opentdb.com/api.php?amount=10
// Example complex URL: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

// This is the URl to pull the API, it is formulated of 5 pieces to allow user control on what quiz they get
const URLp1 = "https://opentdb.com/api.php?amount="; //Fixed prefix
let URLp2 = "10"; // Number of questions
let URLp3 = "";   // e.g., "&category=9"
let URLp4 = "";   // e.g., "&difficulty=easy"
let URLp5 = "";   // e.g., "&type=multiple"

// Colour map for displaying difficulty text across the app
const diffColours = {
    "Any":    { dark: "#5ecfff", light: "#1777b8" }, // Light and dark mode colours for "Any"
    "Easy":   "#40bb40",
    "Medium": "#ffb300",
    "Hard":   "#ff0000",
};

// Utility to get difficulty colour depending on mode and selection
function getDifficultyColour(label) {
    if (label === "Any" && diffColours["Any"]) {
        const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
        return darkModeEnabled ? diffColours["Any"].dark : diffColours["Any"].light;
    }
    return diffColours[label] || "#1777b8";
}

document.querySelectorAll(".QuizOptionBtn").forEach(btn => {
    btn.addEventListener("click", function() {
        //This harvests the difficulty and category parameters for the URL
        URLp3 = btn.getAttribute("data-url") || "";
        const selectedDifficultyInput = document.querySelector('input[name="difficulty"]:checked');
        URLp4 = selectedDifficultyInput ? selectedDifficultyInput.value : '';
        const radioLabelText = selectedDifficultyInput.parentElement.textContent.trim();
        const categoryName = btn.textContent.trim();
        //this stores the URL into local storage for the next page
        const finalURL = `${URLp1}${URLp2}${URLp3}${URLp4}${URLp5}`;
        console.log("API URL: ", finalURL);
        localStorage.setItem("selectedQuizUrl", finalURL);
        localStorage.setItem("selectedQuizCat", categoryName);
        localStorage.setItem("selectedQuizDiff", radioLabelText);
        const diffColour = getDifficultyColour(radioLabelText); // This will query the colour to the difficulty
        localStorage.setItem("selectedQuizDiffColour", diffColour); // This sets the label colour
        window.location.href = "quiz.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const diffLabel = document.getElementById("quizDifficulty");
    if (diffLabel) {
        const quizDiff = localStorage.getItem("selectedQuizDiff");
        // Recalculate colour in case dark mode was toggled after initial store
        const diffColour = getDifficultyColour(quizDiff);
        if (quizDiff) {
            diffLabel.textContent = quizDiff; // This sets the label for the quiz difficulty
            diffLabel.style.color = diffColour; // This sets the colour of the label
        }
    }

    // This enables a live dark mode toggle
    const darkModeButton = document.getElementById('darkModeButton');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', function() {
            const diffLabel = document.getElementById("quizDifficulty");
            const quizDiff = localStorage.getItem("selectedQuizDiff");
            if (diffLabel && quizDiff) {
                diffLabel.style.color = getDifficultyColour(quizDiff);
            }
        });
    }
});
