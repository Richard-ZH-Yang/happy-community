

const signupButton = document.getElementById("signup-submit");
const goBackButton = document.getElementById("go-to-index");
const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirm');
const msg = document.querySelector('.msg');

// submit
signupButton.addEventListener('click', onSubmit);

function onSubmit(e) {
    e.preventDefault();


    if (username.value === '' || password.value === '' || passwordConfirm.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    } else if (password.value != passwordConfirm.value) {
        msg.classList.add('error');
        msg.innerHTML = 'Passwords do not match';
    } else {

        var usernameValue = addUser();
        console.log(usernameValue);
        
        // location.href = `diary.html`;


    }


}

function addUser() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/add?username=${username}&password=${password}`, true);
    xhttp.onload = function() {
        if (this.status == 200) {
            const result = this.responseText;
            if (result == '1') {
                location.href = `diary.html?username=${username}`;
            } else {
                msg.classList.add('error');
                msg.innerHTML = 'Username already exists!';
            }

        }
    }

    xhttp.send();
}