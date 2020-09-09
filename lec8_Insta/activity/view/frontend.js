const search = document.querySelector(".search");
const input = document.querySelector("input");
const p = document.querySelector(".entry");
const fEntry = document.querySelector(".f-entry");
const rEntry = document.querySelector(".r-entry");

search.addEventListener("click", function (e) {
    e.preventDefault();
    populateProfile(input.value);
    populateFollowers(input.value);
})

async function populateProfile(id) {
    let { data } = await axios.get(`api/v1/users/${id}`);
    // console.log(data);
    let user = data.user;
    let {email_id, username} = user;
    p.innerHTML = `<p>Email : ${email_id}</p><p>Username : ${username}</p>`
}

async function populateFollowers(id){
    let { data } = await axios.get(`api/v1/users/fr/${id}`);
    let arr = data.followers;
    for(let i = 0; i < arr.length; i++){
        let followerObj = arr[i];

        let div = addToUI(followerObj);
        if(followerObj.is_pending){
            let p = document.createElement("p");
            p.innerText = "Accept : Reject";
            div.appendChild(p);
            rEntry.appendChild(div);
        }else{
            fEntry.appendChild(div);
        }
    }
}

function addToUI(followerObj){
    let div = document.createElement("div");
    let img = document.createElement("img");
    let usernameSpan = document.createElement("span");
    img.src = followerObj.p_img_url == null ? "default.png" : followerObj.p_img_url;
    img.height = "40";
    usernameSpan.innerText = followerObj.username;
    div.appendChild(img);
    div.appendChild(usernameSpan);
    return div;
}

