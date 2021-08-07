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

const myForm = document.querySelector('#my-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirm');
const msg = document.querySelector('.msg');

// submit
myForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();

    if (username.value === '' || password.value === '' || passwordConfirm.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    } else if (password.value != passwordConfirm.value) {
        msg.classList.add('error');
        msg.innerHTML = 'Passwords do not match!';
    // } else if (checkDuplicity(username.value)) {
    //     msg.classList.add('error');
    //     msg.innerHTML = 'Username already exists!';
    // } 
    } else {
        const userData = new User(username.value, password.value);
    }
}

// function checkDuplicity(username) {
//     return false;
// 
// }

document.getElementById('get-back').addEventListener('click', goBack);
function goBack() {
    
}

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;  // TODO: encrypt this
    }

    write(essay) {
        this.diaries.push(essay);
    }
}

class Essay {
    constructor(text, date) {
        this.text = text;
        this.date = date;
    }
    
    addScore(score) {
        this.score = score;
    }
}