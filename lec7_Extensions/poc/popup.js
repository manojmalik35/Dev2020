console.log("I will execute when popup will be clicked.")

let button = document.querySelector("button");
button.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, {action: "change"}, function(response) {
          console.log(response);
        });
      });
})