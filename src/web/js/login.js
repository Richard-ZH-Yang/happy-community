const loginButton = document.getElementById("login-submit");
const goBackButton = document.getElementById("go-to-index");
const username = document.getElementById('username');
const password = document.getElementById('password');
const msg = document.querySelector('.msg');
// login
loginButton.addEventListener('click', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    
    if (username.value === '' || password.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    } else {
        var a = login()
        console.log(a)

    }


    
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/login?username=${username}&password=${password}`, true);
    xhttp.onload = function(e){
        if(this.status==200) {
            var users = JSON.parse(this.responseText);
            if (username == users['username']) {
                console.log( users['username']);
                location.href = `diary.html?username=${username}`;
            } else{
                console.log('wrong');
                msg.classList.add('error');
                msg.innerHTML = 'Something Wrong. Please try again';
            }
        }
    }
    xhttp.send();
    

}