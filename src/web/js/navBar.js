
const historyButton = document.getElementById("history");
const communityButton = document.getElementById("community");


historyButton.addEventListener('click', onHistory);
communityButton.addEventListener('click', onCommunity);



function onHistory(e) {
    e.preventDefault();
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');
    location.href = `history.html?username=${user}`;
}


function onCommunity(e) {
    e.preventDefault();
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');
    location.href = `community.html?username=${user}`;
}