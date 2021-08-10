window.addEventListener('load', (event) => {
    loadHistory();
    console.log('The page has fully loaded');
});


function loadHistory() {
    var url = window.location.href;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 and this.status == 200) {
            loadHistoryContent(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}


function loadHistoryContent(xhttp) {
    var info = JSON.parse(xhttp.responseText);
    var newContent = "<div class='historyContent'>";
    info.forEach(function (one) {
        var score = one.score;
        var one_content = one.content;
        newContent += `<div class = "each">` +
            `<h2> ${score} </h2>` +
            `<p> ${one_content} </p>`+
            `</div>`;
    })
    newContent += "</div>";
    document.getElementById("history_content").innerHTML = newContent;
}