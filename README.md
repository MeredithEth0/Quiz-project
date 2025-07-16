
# Overview 
The project is to create a quiz website where users can answer a series of questions and receive feedback or be graded on their performance.

#### Project brief
The quiz will have questions with multiple-choice options and navigation buttons *(next, submit, etc.)*. Each question can be displayed on its own page or section. The quiz can feature multiple types of questions *(multiple-choice, true/false, fill-in-the-blank, etc.)* The questions should be loaded at random every time. The online quiz should demonstrate your understanding and application of JavaScript, HTML and CSS. At the end the users should receive a summary of their performance, including the number of correct answers, total score and have the correct answer pointed out on wrong questions.

# Key Features
My top 3 features which I feel to be the most impressive are:

### 1. Dark-mode button
Below is the script called "pageColourSelect.js" which controls the dark mode buttons.
```JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const darkModeButton = document.getElementById('darkModeButton');
    const html = document.documentElement; // Use <html> instead of <body>

    // Remember preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        html.classList.add('darkMode');
        darkModeButton.textContent = 'Light Mode';
    }

    darkModeButton.addEventListener('click', function() {
        html.classList.toggle('darkMode');
        const enabled = html.classList.contains('darkMode');
        darkModeButton.textContent = enabled ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
    });
});
```
In this script there is a large chunk of the CSS dedicated to the looks of darkmode and enabling a transition between light and dark mode for the page. Below is the segment of CSS responsible for dark mode.
```CSS
/*============================== Transition effects for smooth color changes ==============================*/

* {
    transition: background-color 0.5s, color 0.1s;
}

/*=================================== Dark Mode styling ===================================*/

.darkMode body,
.darkMode .info-box {
    background-color: #181c24;
    color: #f5f5f5;
}

.darkMode .topBanner,
.darkMode .bottomBanner,
.darkMode #bannerTitle,
.darkMode #resetButton,
.darkMode #darkModeButton,
.darkMode #nextButton,
.darkMode #howToButton,
.darkMode .answer-btn,
.darkMode .QuizOptionBtn,
.darkMode #backButton,
.darkMode .quizSettingsBox,
.darkMode #closeInfoBtn {
    background-color: #222a36;
    color: #fff;
}

.darkMode a{
    color: rgb(64, 187, 64) !important;
}

.darkMode #darkModeButton:hover,
.darkMode #resetButton:hover,
.darkMode #nextButton:hover,
.darkMode #howToButton:hover,
.darkMode .answer-btn:hover,
.darkMode .QuizOptionBtn:hover,
.darkMode #backButton:hover,
.darkMode #closeInfoBtn:hover {
    background-color: #1c222c;
}

.darkMode #quizTheme {
    color: #5ecfff;
}
```

I added the ability for the page to remember your preference for when you visit again. A complication I encountered while implementing this was that when the page was refreshed or changed, it would briefly flash white causing a "flash-bang" effect which, in low light conditions could cause discomfort on the eyes and then, in return, a poor user experience.

The script that fixed this issue is fit inline into the HTML at the top of the script to ensure that the change is recognised before the DOM is loaded. I have placed the script below. (with the comment declaring its purpose removed)
```HTML
        <script>
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.documentElement.classList.add('darkMode');
        }
        </script>
```
### 2. Feature 2
*To be added*
### 3. Modular API URL construction
*To be added*
# Technology
Below are technologies I used during the production process.
### Languages used:
- HTML
- CSS
- JavaScript

### Additional Tech:
- OpenTDB API

The quiz questions were pulled from an API available on [OpenTDB](https://opentdb.com)

This is an example URL (which is also the default) which is pulled from this API: https://opentdb.com/api.php?amount=10
The URL at its most complex can be: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

I will go into my JS later which builds the URL my quiz uses for calling the questions.

This is the JSON for the example API URL

```JSON
{"response_code":0,"results":[{"type":"multiple","difficulty":"hard","category":"Entertainment: Television","question":"What was the date of original airing of the pilot episode of My Little Pony: Friendship is Magic?","correct_answer":"October 10th, 2010","incorrect_answers":["November 6th, 2010","April 14th, 1984","May 18th, 2015"]},{"type":"boolean","difficulty":"medium","category":"History","question":"United States President Ronald Reagan was the first president to appoint a woman to the Supreme Court. ","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"medium","category":"History","question":"The Panama Canal was finished under the administration of which U.S. president?","correct_answer":"Woodrow Wilson","incorrect_answers":["Franklin Delano Roosevelt","Herbert Hoover","Theodore Roosevelt"]},{"type":"multiple","difficulty":"medium","category":"Entertainment: Video Games","question":"In the game &quot;Undertale&quot;, who was Mettaton&#039;s creator?","correct_answer":"Alphys","incorrect_answers":["Undyne","Sans","Asgore"]},{"type":"multiple","difficulty":"easy","category":"Entertainment: Musicals &amp; Theatres","question":"&quot;Doctor Who&quot; star David Tennant performed in a rendition of which Shakespearean play?","correct_answer":"Hamlet","incorrect_answers":["The Tempest","Othello","The Taming of the Shrew"]},{"type":"boolean","difficulty":"hard","category":"Entertainment: Video Games","question":"The names of Roxas&#039;s Keyblades in Kingdom Hearts are &quot;Oathkeeper&quot; and &quot;Oblivion&quot;.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"medium","category":"Entertainment: Video Games","question":"Sean Bean voices the character of &quot;Martin Septim&quot; in which Elder Scrolls game?","correct_answer":"The Elder Scrolls IV: Oblivion","incorrect_answers":["The Elder Scrolls V: Skyrim","The Elder Scrolls III: Morrowind ","The Elder Scrolls Online"]},{"type":"multiple","difficulty":"medium","category":"Geography","question":"How many countries are larger than Australia?","correct_answer":"5","incorrect_answers":["4","3","6"]},{"type":"multiple","difficulty":"easy","category":"History","question":"How old was Adolf Hitler when he died?","correct_answer":"56","incorrect_answers":["43","65","47"]},{"type":"boolean","difficulty":"easy","category":"Entertainment: Video Games","question":"The game &quot;Jetpack Joyride&quot; was created by &quot;Redbrick Studios&quot;.","correct_answer":"False","incorrect_answers":["True"]}]}
```

# Testing
### HTML testing
The two pages (index.html and quiz.html) were tested using [HTML validator](https://validator.w3.org/nu/#textarea). index.html came up with a single error, which quiz.html also had. 

The screenshot of the error is below:

![Index HTML error](Assets/error%20screenshots/Index%20error.png)

To resolve this error I modified the META tag to:
```HTML
        ...
        <meta charset="UTF-8" >
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ...
```
After this change both HTML documents passed testing.

### CSS testing
My project only has the one CSS file. This file is named style.css. My CSS was tested using [CSS validator](https://jigsaw.w3.org/css-validator/).

This CSS passed without any errors leading to no modification being required. I may review it later if I decide to modify the look of my page.

### JS testing
My project contains 5 JavaScript files. My JS files were tested using [JS validator](https://jshint.com)

The JavaScript files tested initially were quizSelector.js, navButtons.js, pageColourSelect.js. the errors that were fed back during testing were all similar to:
```
	'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).
```

> This error will be ignored in future testing of any JS files as the only issues that could come from this would be regarding legacy browser support which is not a concern for this project.

Other than that error the 3 mentioned JavaScript files passed without any other flags.

The next script to be tested was api.js. Upon testing only two unique errors regarding undefined variables were flagged. 
```
Two undefined variables
8	quizTheme
58	displayQuestions
```

Both errors upon review are incorrect as quizTheme is populated by a value pulled from local storage in line 5 - 8.
```JavaScript
const catName = localStorage.getItem("selectedQuizCat");

// Set the quiz theme/category on the page
quizTheme.textContent = catName;
```

And displayQuestions is the name of the function that loads the questions on the page on line 58.
```JavaScript
displayQuestions();
```

No changes were made to api.js as after inspection the errors appear to have flagged incorrectly.

The final script to be tested, the largest of the 5 was quizMechanics.js. This script also reported 3 undeclared variables.
```
Three undefined variables
36	currentQuestion
45	currentQuestion
102	currentQuestion
39	score
91	score
50	currentQuestionNum
103	currentQuestionNum
```

Upon review these errors have flagged erroneously as well. This is due to the fact the variables are declared in another js file (api.js) and then used in this file.

The variables are declared in lines 11-13.
```JavaScript
let currentQuestion = 0;
let currentQuestionNum = 1;
let score = 0;
```

As the script api.js is called before quizMechanics.js this error is non-existent. If quizMechanics.js were to be called before then an issue will occur.

# Accessibilty
- Look at lighthouse (upload succeeded pass)
*To be added*

# Deployment
- The webpage is deployed by GitHub pages. The URL for this page is [LINK](https://mereditheth0.github.io/Quiz-project/)