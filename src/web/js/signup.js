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
        // } else if (checkDuplicity(username.value)) {
        //     msg.classList.add('error');
        //     msg.innerHTML = 'Username already exists!';
    } else {
        // var test = document.getElementById('username').value;
        // console.log(username);
        var username = document.getElementById('username').value;
        var a = addUser();
        console.log(a);
        location.href = `diary.html?username=${username}`;

    }
}

function addUser() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var newJSON  = {'username': username, 'password': password};
    addUserInJSON(newJSON);
    return username;
}

function addUserInJSON(newUser) {
    var username = newUser['username'];
    var password = newUser['password'];

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/add?username=${username}&password=${password}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(newUser));
    document.getElementById("my-form").innerHTML = `<h1>New User Added!</h1>`;

}