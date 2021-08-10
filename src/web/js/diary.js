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
submitButton.addEventListener('click', onSubmit);

// function firstFunction(callback){
//     setTimeout(function() {
//         getScore(content);
//         callback();
//     },50000);
// }
// function secFunction(){
//     var point = document.querySelector('.score');
//     console.log(point);
// }

function getScore(content) {
    
    diaryContent = content.value.replaceAll(' ', '_');
    
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `http://localhost:8080/login/diary/score?content=${diaryContent}`, true);
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

function onSubmit(e) {
    e.preventDefault();
    diaryContent = content.value.replaceAll(' ', '_');
    console.log(diaryContent);
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');
    var point1 = msg.innerHTML;
    // console.log(point1);
    // console.log(point1.length);
    try {
        if (typeof point1 !== "undefined") {
            if (point1.length <= 10) {
                var value = point1.substring(7,point1.length);
                console.log(value);
                let xhttp = new XMLHttpRequest();
                xhttp.open("GET", `http://localhost:8080/login/diary/add?username=${user}&content=${diaryContent}&score=${value}`, true);
                xhttp.send();
                msg.classList.add('message');
                msg.innerHTML = 'Submit success!';
            } else {
                msg.classList.add('message');
                msg.innerHTML = 'Please waiting the score and try submit again';
            } 
        } else {
            msg.classList.add('message');
            msg.innerHTML = 'Please get your score';
        }
        

    } catch (e) {
        console.log(e);
    } 


}
