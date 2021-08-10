let i = 0;
let buttons;

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
    var info = JSON.parse(xhttp.responseText);
    var newContent = "<div class='historyContent'>";
    info.forEach(function (one) {
        var one_content = one.content;
        var score = one.score;
        var time = one.time;
        newContent += `<div class = "each">` +
            `<h2> ${score} </h2>` +
            `<h3> ${time} </h3>` +
            `<p> ${one_content} </p>`+
            `<input class="btn" type="button" id="history-share-${i}" value="Share to community">`+
            `</div>`;
        i++;
    })
    newContent += "</div>";
    document.getElementById("history_content").innerHTML = newContent;
}