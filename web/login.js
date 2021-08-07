// button
const btn = document.querySelector('.btn');
btn.addEventListener('click', (e) => {
    document.querySelector('.btn').style.background = ('grey');
});

btn.addEventListener('mouseover', (e) => {
    e.preventDefault();  // Prevent the form from being submitted
    document.querySelector('.btn').style.background = ('purple');
});

btn.addEventListener('mouseout', (e) => {
    e.preventDefault();  // Prevent the form from being submitted
    document.querySelector('.btn').style.background = ('black');
});

const loginButton = document.getElementById("login-submit");
const goBackButton = document.getElementById("go-to-index");
const username = document.getElementById('username');
const password = document.getElementById('password');
const msg = document.querySelector('.msg');

// submit
loginButton.addEventListener('click', onSubmit);
function onSubmit(e) {
    e.preventDefault();
}

