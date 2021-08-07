

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


const getScoreButton = document.getElementById("diary-getScore");
const submitButton = document.getElementById("diary-submit");
const content = document.getElementById("content");
const msg = document.querySelector('.msg');

// request score
getScoreButton.addEventListener('click', onGetScore);
function onGetScore(e) {
    e.preventDefault();
    const score = getScore(content);
    msg.classList.add('score');

}

function getScore(content) {
    diaryContent = content.value.replace(' ', '_');
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/add?diary=${diaryContent}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({"content": content}));
    xhttp.onload() = function() {
        score = this.responseText;
        msg.innerHTML = `Score: ${score}`;
    }
}