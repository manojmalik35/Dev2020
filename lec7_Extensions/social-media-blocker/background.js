// console.log("I am background");

let blockedSites = [];
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.add) {
            console.log(request);
            blockedSites.push({ site: request.add, time: 10 });
            console.log(blockedSites);
        }
        // else if(request.remove){
        //     blockedSites = blockedSites.filter((site)=>{
        //         return site != request.remove;
        //     })
        //     console.log(blockedSites);
        // }
        sendResponse();
    });

async function init() {
    if (blockedSites.length > 0) {

        let tab = await getCurrentTab();
        if (tab) {
            let cTabUrl = tab.url;
            // console.log(tab.url);
            // console.log("Polling");
            for (let i = 0; i < blockedSites.length; i++) {
                let isMatched = cTabUrl.includes(blockedSites[i].site);
                if (isMatched) {
                    // chrome.browserAction.setBadgeText({text : blockedSites[i].time});
                    blockedSites[i].time--;
                    console.log("Time remaining : " + blockedSites[i].time);
                    if (blockedSites[i].time <= 0)
                        console.log("Tab closed");
                }
            }
        }
    }
}

function getCurrentTab() {
    return new Promise(function (resolve, reject) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]);
        });
    })
}

setInterval(init, 1000);