let curr_num_likes = 0;
var cur_url = window.location.href;
var params = (new URL(cur_url)).searchParams;
var user = params.get('username');
var hasUnfolded = {};



window.addEventListener('load', (event) => {
    loadCommunity();
    console.log('The page has fully loaded');
});





function loadCommunity() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadDiary(this);
        }
    };
    xhttp.open("GET", `http://localhost:8080/login/community/diary`, true);
    xhttp.send();

}


function loadDiary(xhttp) {
    var info = JSON.parse(xhttp.responseText);
    var newContent = "<div class='communityContent'>";
    info.forEach(function (one) {
        var diary_user = one.username;
        var one_content = one.content;
        var score = one.score;
        var share_time = one.share_time;
        var content_id = one.content_id;
        var num_likes = one.num_likes;
        var button_id = `${diary_user} + ${content_id}`;
        var comment_id = button_id + ' cId';
        hasUnfolded[comment_id] = false;
        newContent += `<div class = "each">` +
            `<h3> Score: ${score} </h3>` +
            `<h5> From: ${diary_user} </h5>` +
            `<h5> ${share_time} </h5>` +
            `<p> ${one_content} </p>`+
            `<button type="button" class="small_btn" onClick="like('${diary_user}','${content_id}','${user}','${button_id}')" id = '${button_id}'>like  ${num_likes}</button>` +
            `<button type="button" class="small_btn" onClick="loadComment('${diary_user}','${content_id}','${comment_id}')">comment</button>` +
            `<div id='${comment_id}'></div>`+
            `</div>`;
    })
    newContent += "</div>";
    document.getElementById("my-form").innerHTML = newContent;
}


function like(diary_user, content_id, like_user, button_id){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/community/addLike?username=${diary_user}&content_id=${content_id}&like_user=${like_user}`, true);
    xhttp.onload = function() {
        const score = this.responseText;
        if (score == "-1") {
            alert("You already liked that diary");

        } else {
            replaceButtonText(button_id, `like  ${score}`);
        }
    }
    xhttp.send();
}




function addComment(diary_user,content_id,comment_id,add_cId){
    var comment =document.getElementById(`${add_cId}`).value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8080/login/community/comment/add?diary_user=${diary_user}&diary_id=${content_id}&comment_user=${user}&comment=${comment}`, true);
    xhttp.onload = function() {
        if (this.status == 200) {
            const score = this.responseText;
            if (score == '1') {
                 loadComment(diary_user,content_id,comment_id);
            } else {
                alert("Something Wrong, add comment failed!");
            }

        }


    }
    xhttp.send();
}


function loadComment(diary_user,content_id,comment_id) {
    if (hasUnfolded[comment_id]) {
        document.getElementById(`${comment_id}`).innerHTML = null;
        replaceButtonText(comment_id.substring(0, comment_id.length - 3), 'fold the comment');
    } else {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getComment(this,diary_user, content_id,comment_id);
            }
        };
        xhttp.open("GET", `http://localhost:8080/login/community/comment/show?diary_user=${diary_user}&diary_id=${content_id}`, true);
        xhttp.send();
    }

    hasUnfolded[comment_id] = !hasUnfolded[comment_id];
    

}


function getComment(xhttp, diary_user, content_id,comment_id) {
    var info = JSON.parse(xhttp.responseText);
    var newContent = "<div class='commentContent'>";
    var add_cId = 'add' + comment_id; 
    info.forEach(function (one) {
        var comment_user = one.comment_user;
        var comment_time = one.comment_time;
        var comment = one.comment;
        newContent += `<div class = "each">` +
            `<h5> reply from: ${comment_user} </h3>` +
            `<h5> ${comment_time} </h5>` +
            `<p> ${comment} </p>`+
            `</div>`;
    })
    newContent +=  '<form id="add_comment_form">' + 
    `<div> <input type="text" id='${add_cId}', name ='${add_cId}', placeholder ='Add a comment!'> `+
    `<input class = "btn" type="button" value="Submit Comment" onClick="addComment('${diary_user}','${content_id}','${comment_id}','${add_cId}')" ></div>`+
    '</form>';
    newContent += "</div>";
    document.getElementById(`${comment_id}`).innerHTML = newContent;
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