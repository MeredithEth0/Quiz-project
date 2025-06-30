document.querySelectorAll(".QuizOptionBtn").forEach(btn => {
    btn.addEventListener("click", function() {
        //This harvest the URL from the data-url
        const apiUrl = btn.getAttribute("data-url");
        const categoryName = btn.textContent.trim();
        //this stores the URL into local storage for the next page
        localStorage.setItem("selectedQuizUrl", apiUrl);
        localStorage.setItem("selectedQuizCat", categoryName);
        window.location.href = "quiz.html";
    });
});