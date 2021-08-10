let i = 0;
let buttons;
const msg = document.querySelector('.msg');

window.addEventListener('load', (event) => {
    loadHistory();
    initializeButtons();
    console.log('The page has fully loaded');
});


function initializeButtons() {
    buttons = [i + 1];
    var j = i;
    while (j >= 0) {
        buttons.push(document.getElementById(`history-share-${j}`));
        j--;
    }
}


function loadHistory() {
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadHistoryContent(this);
        }
    };
    xhttp.open("GET", `http://localhost:8080/login/diary/show?username=${user}`, true);
    xhttp.send();

}


function loadHistoryContent(xhttp) {
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');

    var info = JSON.parse(xhttp.responseText);
    var newContent = "<div class='historyContent'>";
    info.forEach(function (one) {
        var one_content = one.content;
        var score = one.score;
        var time = one.time;
        var content_id = one.content_id;
        newContent += `<div class = "each">` +
            `<h3> Score: ${score} </h3>` +
            `<h5> Diary ID: ${content_id} </h5>` +
            `<h5> ${time} </h5>` +
            `<p> ${one_content} </p>`+
            //`<input class="btn" type="button" id="history-share-${id}" value="Share to community">`+
            `<button type="button" class="btn" onClick="shareDiary('${user}','${content_id}')">Share to community</button>` + 
            `</div>`;
        i++;
    })
    newContent += "</div>";
    document.getElementById("my-form").innerHTML = newContent;
}

function shareDiary(username, content_id){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/diary/share?username=${username}&content_id=${content_id}`, true);
    xhttp.onload = function() {
        const score = this.responseText;
        if (score == "-1") {
            msg.classList.add('score');
            msg.innerHTML = `Diary ID: ${content_id} already shared`;           
      
        }
        
    }
    xhttp.send();
}