

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

const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirm');
const msg = document.querySelector('.msg');

const getScoreButton = document.getElementById("diary-getScore");
const submitButton = document.getElementById("diary-submit");




// submit
getScoreButton.addEventListener('click', onGetScore);
function onGetScore(e) {
    e.preventDefault();


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