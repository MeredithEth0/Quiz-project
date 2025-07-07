//Button on the bottom of the page to reset the quiz (which refreshes the webpage)
document.getElementById("resetButton").addEventListener("click",function(){
    location.reload();
});

//this adds function to the back button
document.getElementById("backButton").addEventListener("click",function(){
    window.location.href = "index.html";
})
