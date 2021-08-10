
const historyButton = document.getElementById("history");



historyButton.addEventListener('click', onHistory);



function onHistory(e) {
    e.preventDefault();
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');
    location.href = `history.html?username=${user}`;
}