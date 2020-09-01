
let button = document.querySelector(".btn");
let input = document.querySelector("input");
let ul = document.querySelector("ul");
button.addEventListener("click", async function () {
    let toBeBlocked = input.value;
    if (toBeBlocked) {

        await sendToBackground(toBeBlocked);
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = `${toBeBlocked} <i class="fas fa-times"></i>`;
        ul.appendChild(li);
        let icon = li.querySelector("i");
        icon.addEventListener("click", async function () {

            let site = icon.parentNode.textContent;
            await removeFromDb({remove : site});
            icon.parentNode.remove();
        })
    }

    input.value = "";
})

function sendToBackground(message) {
    return new Promise(function(resolve, reject){
        chrome.runtime.sendMessage({add : message}, function (response) {

            resolve(true);
        });
    })
}

function removeFromDb(site){
    return new Promise(function(resolve, reject){
        chrome.runtime.sendMessage(site, function (response) {

            resolve(true);
        });
    })
}