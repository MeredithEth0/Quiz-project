document.addEventListener('DOMContentLoaded', function() {
    const darkModeButton = document.getElementById('darkModeButton');
    const body = document.body;

    // Optional: Remember preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('darkMode');
        darkModeButton.textContent = 'Light Mode';
    }

    darkModeButton.addEventListener('click', function() {
        body.classList.toggle('darkMode');
        const enabled = body.classList.contains('darkMode');
        darkModeButton.textContent = enabled ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
    });
});
