// console.log("Mai content se aaya");

function replaceImages(){
    let allImgPaths = [
        "images/1.png",
        "images/2.jpg",
        "images/3.jpg",
        "images/4.jpg",
        "images/5.jpg",
        "images/6.jpg",
        "images/7.png",
        "images/8.jpg",
        "images/9.jpg",
        "images/10.jpg",
        "images/11.jpg",
        "images/12.jpg",
        "images/13.jpg",
        "images/14.jpg",
        "images/15.jpg",
        "images/16.jpg"
    ];
    
    let allImgs = document.querySelectorAll("img");
    for(let i = 0; i < allImgs.length; i++){
        let idx = Math.floor(Math.random() * allImgPaths.length);
        let fullUrl = chrome.extension.getURL(allImgPaths[idx]);
        allImgs[i].src = fullUrl;
        // allImgs[i].setAttribute("data-src", fullUrl);
    }
}

// let message = {greeting: "hello"};
// chrome.runtime.sendMessage(message, function(response) {
//     console.log(response);
//   });

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.action == "change"){
            replaceImages();
            sendResponse("Images changed");
        }
    });
