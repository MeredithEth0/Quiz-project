
# Overview 
The project is to create a quiz website where users can answer a series of questions and recieve feedback or be graded on their performance.

#### Project brief
The quiz will have questions with multiple choice options and navigation buttons *(next, submit, etc.)*. Each question can be displayed on its own page or section. The quiz can feature multiple types of questions *(multiple-choice, true/false, fill-the-blank, etc.)* The questions should be loaded at random every time. The online quiz should demonstrate your understanding and application of JavaScript, HTML and CSS. At the end the users should recieve a summary of their performance, including the number of correct answers, total score and have the correct answer pointed out on wrong questions.

# Features
- ##### Dark-mode button
Below is the script called "pageColourSelect.js" which controls the dark mode buttons.
```
document.addEventListener('DOMContentLoaded', function() {
    const darkModeButton = document.getElementById('darkModeButton');
    const html = document.documentElement; // Use <html> instead of <body>

    // Optional: Remember preference
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
I added the ability for the page to remember your preference for when you visit again. A complication I encountered while implementing this was that when the page was refreshed or changed, it would briefly flash white causing a "flash-bang" effect which, in low light conditions could cause discomfort on the eyes and then, in return, a poor user experience.

The script that fixed this issue is fit inline into the HTML at the top of the script to ensure that the change is recognised before the DOM is loaded. I have placed the script below. (with the comment declaring its purpose removed)
```
        <script>
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.documentElement.classList.add('darkMode');
        }
        </script>
```
- ##### Difficulty selector
*To be added*
- ##### 25 (26 if you count an all category) categories
*To be added*
# Technology
Below are technologies I used during the production process.
### Languages used:
- HTML
*To be added*
- CSS
*To be added*
- JavaScript
*To be added*

### Additional Tech:
- OpenTDB API
The quiz questions were pulled from an API available on OpenTDB
*To be added*

# Testing
- Go through some highlight issues with screenshots of proof and process of resolution
*To be added*
- use w3c checkers
*To be added*

# Accessibilty
- Look at lighthouse (upload succeeded pass)
*To be added*

# Deployment
- The webpage is deployed by GitHub pages. The URL for this page is [LINK](https://mereditheth0.github.io/Quiz-project/)