document.addEventListener("DOMContentLoaded", function () {
    // --- Reset button functionality ---
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            location.reload();
        });
    }

    // --- Back button functionality ---
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // --- How to Play functionality ---
    const infoBox = document.getElementById("howToPlayBox");
    const howToButton = document.getElementById("howToButton");
    const closeInfoBtn = document.getElementById("closeInfoBtn");

    if (howToButton && infoBox) {
        howToButton.addEventListener("click", () => {
            infoBox.classList.add("show");
        });
    }

    if (closeInfoBtn && infoBox) {
        closeInfoBtn.addEventListener("click", () => {
            infoBox.classList.remove("show");
        });
    }
});
