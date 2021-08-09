const getScoreButton = document.getElementById("diary-getScore");
const submitButton = document.getElementById("diary-submit");
const content = document.getElementById("content");
const msg = document.querySelector('.msg');

// request score
getScoreButton.addEventListener('click', onGetScore);
function onGetScore(e) {
    e.preventDefault();
    getScore(content);
}

function getScore(content) {
    
    diaryContent = content.value.replace(' ', '_');
    
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `http://localhost:8080/login/diary/score?content=${diaryContent}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        // xhttp.send(JSON.stringify({"content": content}));
        xhttp.onload = function() {
            const score = this.responseText;
            console.log(`score = ${score}`);
            msg.classList.add('score');
            msg.innerHTML = `Score: ${score}`;
        }
        xhttp.send();
    } catch (e) {
        console.log(e);
    } finally {
        msg.classList.add('message');
        msg.innerHTML = 'Connecting...';
    }
}
