window.addEventListener('load', (event) => {
    loadHistory();
    console.log('The page has fully loaded');
});


function loadHistory() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/history/history?username=${username}`, true);
    xhttp.onload = function(e){
        if(this.status==200) {
            var info = JSON.parse(this.responseText);

        }
    }
    xhttp.send();
}