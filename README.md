# Overview 
The project is to create a quiz website where users can answer a series of questions and receive feedback or be graded on their performance.

**If you don't want to scroll through all of this to get to the deployment link [CLICK HERE](#Deployment) to go straight to the deployment section.**
#### Project brief
The quiz will have questions with multiple-choice options and navigation buttons *(next, submit, etc.)*. Each question can be displayed on its own page or section. The quiz can feature multiple types of questions *(multiple-choice, true/false, fill-in-the-blank, etc.)* The questions should be loaded at random every time. The online quiz should demonstrate your understanding and application of JavaScript, HTML and CSS. At the end the users should receive a summary of their performance, including the number of correct answers, total score and have the correct answer pointed out on wrong questions.

# Table of Contents
This will give you quick links to each section of this README should you need to navigate directly to a section.
- [Overview](#Overview)
- [Table of Contents](#table-of-contents)
- [File Organisation](#file-organisation)
- [Key Features](#key-features)
- [Technology](#technology)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Deployment](#deployment)
- [Glossary](#glossary)

# File Organisation
Below is the tree of any files relating to this project to show my file structure.
```
Quiz-project/
├─ .vscode/
│  └─ settings.json
├─ assets/
│  ├─ docs/
│  │  ├─ darkMode_Index_Lighthouse.pdf
│  │  ├─ darkMode_Quiz_Lighthouse.pdf
│  │  ├─ lightMode_Index_Lighthouse.pdf
│  │  └─ lightMode_Quiz_Lighthouse.pdf
│  ├─ error screenshots/
│  │  └─ Index error.png
│  └─ images/
│     ├─ lighthouse images/
│     │  ├─ darkMode_Menu_Lighthouse.png
│     │  ├─ lightMode_Menu_Lighthouse.png
│     │  └─ lightMode_Quiz_Lighthouse.png
│     ├─ favicon.png
│     ├─ github.png
│     └─ linkedin.png
├─ css/
│  └─ style.css
├─ js/
│  ├─ api.js
│  ├─ navButtons.js
│  ├─ pageColourSelect.js
│  ├─ quizMechanics.js
│  └─ quizSelector.js
├─ Project Document/
│  └─ Project+1.pdf
├─ .gitattributes
├─ index.html
├─ quiz.html
└─ README.md

```

# Key Features
My top 3 features which I feel to be the most impressive are:
- [Dark-mode button](#dark-mode-button)
- [Dynamic API construction and error handling](#dynamic-api-construction-and-error-handling)
- [Accessible UI with QOL features](#accessible-ui-with-qol-features)
## Dark-mode button
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
In this script there is a large chunk of the CSS dedicated to the looks of dark-mode and enabling a transition between light and dark mode for the page. Below is the segment of CSS responsible for dark mode.
```CSS
/*=============== Transition effects for smooth color changes ========================*/

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
    color: #40bb40 !important;
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

.darkMode label:has(#diffAny:checked) {
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
## Dynamic API construction and error handling

>This segment will have some colliding information with the [technology](#technology) section where I will go into the API so be warned, there may be repetition.

The quiz questions are pulled from an API provided by [OpenTDB](https://opentdb.com/). This API allows for customisation on the call. There are 5 parameters to the URL.
```
const URLp1 = "https://opentdb.com/api.php?amount="; //Fixed prefix
let URLp2 = "10"; // Number of questions
let URLp3 = "";   // e.g., "&category=9"
let URLp4 = "";   // e.g., "&difficulty=easy"
let URLp5 = "";   // e.g., "&type=multiple"
```
I have labelled each part of the API call as URLp1 - URLp5. The first two parameters of the URL are required, the other 3 can be omitted which means the API will treat those fields as random.

For the sake of this quiz I have allowed the user to control the quiz category and the quiz difficulty. I have however set it up in a way so in future, the other parameters can be added with relative ease, making this script future-proof. This has been done using standard buttons and radio buttons to allow a smooth user experience. The data from these buttons is stored using localStorage to allow this data to be called in any script making it multi-page compatible.

During the process of implementing and testing the quiz handling I found that occasionally the API would fail to call. To mitigate the problem I added a "quiz reset" button which simply refreshed the page. This solution, as much as it would resolve the issue, created a poor user experience and made it feel clunky rather than smooth. 

To resolve this, I added error handling to the API call.
```
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
```
This is set so on a failed call, it will attempt the call again to a maximum of 3 times with 1 second intervals on attempts. If this fails all 3 times it will refresh the page and begin again. This resolves failed calls without user intervention allowing for a seamless experience and vastly improves the UX. 

Since implementing this error handling, it has not failed or required user intervention.

## Accessible UI with QOL features

In building this website ensuring the design is accessible and engaging has been at the forefront of the building process. 
The implementation of dynamic layout and sizing was the first core accessibility feature I got working, The primary tool I used to achieve this was media queries, which are used in CSS.
```
/*==== Below are media queries for responsive design ====*/

@media (max-width: 900px) {
    .feedbackLbl {
        display: none !important;
    }

    .bottomBanner {
        visibility: hidden;
    }

    .quizSettingsBox {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .info-box {
        width: 80%;
    }
}
```
As you can see in the CSS snapshot above, 4 parameters were used to make changes to the page when the width of the screen went below 900 pixels. For this page I have used both CSS grid and flex boxes where I found it suitable. The category buttons are organised using CSS grid whereas the quiz difficulty radio buttons (In the CSS as .quizSettingsBox).

With using CSS grid it changes the amount of columns as to what will fit on the screen making it so I do not need to modify it using a media query.

Also in the CSS snapshot above there is a snippet which states:
```
    .feedbackLbl {
        display: none !important;
    }
```
Now initially this entity was the only feedback the player got. It was simply a label that would appear either saying you got it right or you got it wrong and then tell you the correct answer. To allow for better accessibility for smaller screen uses I made it so the answer you pick will turn either red or green dependant on whether your answer is right or wrong, and if you choose wrong, the correct answer will highlight itself in green. This allowed me to (on smaller screens) remove the feedback label to allow for a smoother UX.

I also added (as one of the final touch-ups to my webpage) a how-to button in the top right of the menu screen. When a user presses the button a menu will drop down from the top and give a brief but clear breakdown of how someone would play this quiz. It is a optional feature to not hinder regularly quizzers by forcing the pop-up but allows (if desired) users to read it, should they need the guidance.

The colour palette used for this page was designed to remain simple and yet satisfying to look at. Another feature I added to allow for a smoother UX was a dark-mode toggle button which also had a carefully designed colour palette to make it enjoyable to look at while you play a quiz (A technical dive into this feature can be found [HERE](#dark-mode-button))

# Technology
Below are technologies I used during the production process.
## Languages used:
- HTML
- CSS
- JavaScript
- Markdown (for this document)

## OpenTDB API

The quiz questions were pulled from an API available on [OpenTDB](https://opentdb.com)

This is an example URL (which is also the default) which is pulled from this API: https://opentdb.com/api.php?amount=10

The URL at its most complex can be: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

This is the JSON for the example API URL

```JSON
{"response_code":0,"results":[{"type":"multiple","difficulty":"hard","category":"Entertainment: Television","question":"What was the date of original airing of the pilot episode of My Little Pony: Friendship is Magic?","correct_answer":"October 10th, 2010","incorrect_answers":["November 6th, 2010","April 14th, 1984","May 18th, 2015"]},{"type":"boolean","difficulty":"medium","category":"History","question":"United States President Ronald Reagan was the first president to appoint a woman to the Supreme Court. ","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"medium","category":"History","question":"The Panama Canal was finished under the administration of which U.S. president?","correct_answer":"Woodrow Wilson","incorrect_answers":["Franklin Delano Roosevelt","Herbert Hoover","Theodore Roosevelt"]},{"type":"multiple","difficulty":"medium","category":"Entertainment: Video Games","question":"In the game &quot;Undertale&quot;, who was Mettaton&#039;s creator?","correct_answer":"Alphys","incorrect_answers":["Undyne","Sans","Asgore"]},{"type":"multiple","difficulty":"easy","category":"Entertainment: Musicals &amp; Theatres","question":"&quot;Doctor Who&quot; star David Tennant performed in a rendition of which Shakespearean play?","correct_answer":"Hamlet","incorrect_answers":["The Tempest","Othello","The Taming of the Shrew"]},{"type":"boolean","difficulty":"hard","category":"Entertainment: Video Games","question":"The names of Roxas&#039;s Keyblades in Kingdom Hearts are &quot;Oathkeeper&quot; and &quot;Oblivion&quot;.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"medium","category":"Entertainment: Video Games","question":"Sean Bean voices the character of &quot;Martin Septim&quot; in which Elder Scrolls game?","correct_answer":"The Elder Scrolls IV: Oblivion","incorrect_answers":["The Elder Scrolls V: Skyrim","The Elder Scrolls III: Morrowind ","The Elder Scrolls Online"]},{"type":"multiple","difficulty":"medium","category":"Geography","question":"How many countries are larger than Australia?","correct_answer":"5","incorrect_answers":["4","3","6"]},{"type":"multiple","difficulty":"easy","category":"History","question":"How old was Adolf Hitler when he died?","correct_answer":"56","incorrect_answers":["43","65","47"]},{"type":"boolean","difficulty":"easy","category":"Entertainment: Video Games","question":"The game &quot;Jetpack Joyride&quot; was created by &quot;Redbrick Studios&quot;.","correct_answer":"False","incorrect_answers":["True"]}]}
```

# Testing
## HTML testing
The two pages (index.html and quiz.html) were tested using [HTML validator](https://validator.w3.org/nu/#textarea). index.html came up with a single error, which quiz.html also had. 

The screenshot of the error is below:

![Index HTML error](assets/error%20screenshots/Index%20error.png)

To resolve this error I modified the META tag to:
```HTML
        ...
        <meta charset="UTF-8" >
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ...
```
After this change both HTML documents passed testing.

## CSS testing
My project only has the one CSS file. This file is named style.css. My CSS was tested using [CSS validator](https://jigsaw.w3.org/css-validator/).

This CSS passed without any errors leading to no modification being required. I may review it later if I decide to modify the look of my page.

## JS testing
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

# Accessibility
I have already lightly gone into the accessibility of my page in a earlier part of this document ([click here to view](#accessible-ui-with-qol-features)).

This is to mostly highlight the accessibility testing that took place to ensure that any user could access and enjoy this website. The results of the lighthouse testing came back quite positive without changes being required for it to meet an acceptable score. I have attached screenshots below.

Light-mode Index:
![Light-mode Index report](/assets/images/lighthouse%20images/lightMode_Menu_Lighthouse.png)
>Now with the score on this page I was confused how exactly the scores managed to differ between quiz and index when dark-modes' didn't. After review I noticed that the lower accessibility score is erroneous for the index. It reports that the issue comes from the text for any (on the difficulty radio) by default being light blue this is changed when the page loads into light-mode mode to avoid such issues. It appears that lighthouse is unable to notice this as at first load. It is light blue (not that any users would be able to tell due to how quickly it changes)

Light-mode Quiz:
![Light-mode Quiz report](/assets/images/lighthouse%20images/lightMode_Quiz_Lighthouse.png)
Dark-mode Index (Dark-mode quiz had the exact same score so no screenshot provided):
![Dark-mode Index & quiz report](/assets/images/lighthouse%20images/darkMode_Menu_Lighthouse.png)

>These are copies of the PDF reports from the lighthouse testing for both pages:
- [Light-mode Index Report](/assets/docs/lightMode_Index_Lighthouse.pdf)
- [Light-mode Quiz Report](/assets/docs/lightMode_Quiz_Lighthouse.pdf)
- [Dark-mode Index Report](/assets/docs/darkMode_Index_Lighthouse.pdf)
- [Dark-mode Quiz Report](/assets/docs/darkMode_Quiz_Lighthouse.pdf)

# Deployment
- The webpage is deployed by GitHub pages. To get to this page  [CLICK HERE](https://mereditheth0.github.io/Quiz-project/)

# Glossary
This is a list of technical terminology used and their definitions/ meanings.

- ##### HTML (HyperText Markup Language):
 The language used to structure content on web pages.
<br>

- ##### CSS (Cascading Style Sheets):
 A stylesheet language used to control the appearance and layout of web pages.
 <br>

- ##### JavaScript:
 A programming language used on websites to create interactive features and dynamic content.
<br>

- ##### JSON (JavaScript Object Notation):
 A lightweight data format commonly used for sending and receiving structured information, often from APIs.
<br>

- ##### Flex box:
A modern CSS layout model that allows items in a container to be spaced and aligned efficiently in one dimension (row or column).
<br>

- ##### Grid Layout (CSS Grid):
 A CSS system that allows developers to create complex, two-dimensional layouts using rows and columns.
<br>

- ##### localStorage:
 A feature in modern web browsers that allows websites to save data (like preferences or progress) directly on a user’s device.
<br>

- ##### API (Application Programming Interface):
 A tool that allows different software systems to communicate and exchange data, commonly used for retrieving data like quiz questions from third-party databases.
<br>

- ##### Error Handling:
 The process of anticipating and managing issues that might occur during program execution, such as failed API calls.
<br>

- ##### Validator:
 Tools that automatically check HTML, CSS, or JavaScript code for errors based on web standards.
<br>
- ##### Lighthouse:
 An automated tool built into Chrome for analysing web pages. It provides scores and reports on performance, accessibility, best practices, SEO, and more.

