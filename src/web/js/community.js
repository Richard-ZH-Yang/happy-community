let curr_num_likes = 0;

window.addEventListener('load', (event) => {
    loadCommunity();
    console.log('The page has fully loaded');
});




function loadCommunity() {
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadComment(this);
        }
    };
    xhttp.open("GET", `http://localhost:8080/login/community/show?username=${user}`, true);
    xhttp.send();

}


function loadComment(xhttp) {
    var cur_url = window.location.href;
    var params = (new URL(cur_url)).searchParams;
    var user = params.get('username');

    var info = JSON.parse(xhttp.responseText);
    var newContent = "<div class='communityContent'>";
    info.forEach(function (one) {
        var one_content = one.content;
        var score = one.score;
        var time = one.time;
        var content_id = one.content_id;
        var num_likes = one.num_likes;
        var button_id = `${user} + ${content_id}`;
        newContent += `<div class = "each">` +
            `<h3> Score: ${score} </h3>` +
            `<h5> ${time} </h5>` +
            `<p> ${one_content} </p>`+
            `<button type="button" class="small_btn" onClick="like('${user}','${content_id}','${num_likes}', `${button_id}` )" id = ${button_id}>like  ${num_likes}</button>` +
            `<button type="button" class="small_btn" onClick="comment('${user}','${content_id}')">comment</button>` +
            `</div>`;
        i++;
    })
    newContent += "</div>";
    document.getElementById("my-form").innerHTML = newContent;
}


function like(username, content_id, num_likes, button_id){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/community/like?username=${username}&content_id=${content_id}`, true);
    xhttp.onload = function() {
        const score = this.responseText;
        if (score == "-1") {
            alert("You already liked that diary");

        }
        
        replaceButtonText(button_id, `like  ${num_likes++}`);

    }
    xhttp.send();
}




function comment(username, content_id){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/community/comment?username=${username}&content_id=${content_id}`, true);
    xhttp.onload = function() {
        // unfold the comment section

    }
    xhttp.send();
}



function replaceButtonText(buttonId, text)
{
    if (document.getElementById)
    {
        var button=document.getElementById(buttonId);
        if (button)
        {
            if (button.childNodes[0])
            {
                button.childNodes[0].nodeValue=text;
            }
            else if (button.value)
            {
                button.value=text;
            }
            else //if (button.innerHTML)
            {
                button.innerHTML=text;
            }
        }
    }
}