const loginButton = document.getElementById("login-submit");
const goBackButton = document.getElementById("go-to-index");
const username = document.getElementById('username');
const password = document.getElementById('password');
const msg = document.querySelector('.msg');

// login
loginButton.addEventListener('click', onLogin);
function onLogin(e) {
    e.preventDefault();
    
    if (username.value === '' || password.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    } else {
        getUserStatus();
    }
    
}

function getUserStatus() {
    location.href = 'diary.html';
}

function getLoginStatus() {
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `http://localhost:8080/login/login?username=${username}&password=${password}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onload = function() {
            const score = this.responseText;
            updateLoginPage(score);
        }
        xhttp.send();
    } catch (e) {
        console.log(e);
    } finally {
        msg.classList.add('message');
        msg.innerHTML = 'Connecting...';
    }
}

function updateLoginPage(score) {
    if (score > 0) {
        location.href = 'diary.html';
    } else {
        msg.classList.add('error');
        msg.innerHTML = 'Username or password is not correct. Please try again.';
    }
}
