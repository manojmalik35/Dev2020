require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");
//build browser
let bldr = new swd.Builder();

//represents single tab
let driver = bldr.forBrowser("chrome").build();

let credentialsFile = process.argv[2];

//read credentials
//go to login page
//enter email, password
//login

let url, email, pwd, gcodeArr, gCode, gTextArea, gCodeEditor;
let fileWillBeReadPromise = fs.promises.readFile(credentialsFile, "utf-8");

fileWillBeReadPromise.then(function (data) {
    // console.log(data)
    let credentials = JSON.parse(data);
    url = credentials.url;
    email = credentials.email;
    pwd = credentials.pwd;

    let loginWillBeOpened = driver.get(url);
    return loginWillBeOpened;
}).then(function () {
    return driver.manage().window().maximize();
}).then(function () {//if net slow
    let waitForEveryOne = driver.manage().setTimeouts({
        implicit: 20000,
        pageLoad: 20000
    })

    return waitForEveryOne;
}).then(function () {
    let loginBoxWillBeFound = driver.findElement(swd.By.css("#input-1"));
    return loginBoxWillBeFound;
}).then(function (loginBox) {
    let emailWillBeFilled = loginBox.sendKeys(email);
    return emailWillBeFilled;
}).then(function () {
    let pBoxWillBeFound = driver.findElement(swd.By.css("#input-2"));
    return pBoxWillBeFound;
}).then(function (pBox) {
    let pwdWillBeFilled = pBox.sendKeys(pwd);
    return pwdWillBeFilled;
}).then(function () {
    let loginButtonClick = navigatorFn("button[data-analytics='LoginPassword']");
    return loginButtonClick;
}).then(function () {
    let ipButtonClick = navigatorFn("#base-card-1-link");
    return ipButtonClick;
}).then(function () {
    let wpButtonClick = navigatorFn("a[data-attr1='warmup']");
    return wpButtonClick;
}).then(function () {
    let questionsArrPromise = driver.findElements(swd.By.css(".challenge-list-item"));
    return questionsArrPromise;
}).then(function(questionsArr){
    let linkPromiseArr=[];
    for(let i = 0; i < questionsArr.length; i++){
        linkPromiseArr.push(questionsArr[i].getAttribute("href"));
    }

    return Promise.all(linkPromiseArr);
}).then(function(linkArr){

    let thenP = questionSolver(linkArr[0]);
    for(let i = 1; i < linkArr.length; i++){
        thenP = thenP.then(function(){
            console.log("Question " + i + " Solved");
            return questionSolver(linkArr[i]);
        })
    }

    return thenP;
})
    .catch(function (err) {
        console.log(err);
    })

function navigatorFn(selector) {
    return new Promise(function (resolve, reject) {
        let selectorFoundPromise = driver.findElement(swd.By.css(selector));
        selectorFoundPromise
            .then(function (element) {
                let elementClickedPromise = element.click();
                return elementClickedPromise;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    })
}

function questionSolver(question) {
    return new Promise(function (resolve, reject) {
        let qpurlPromise = driver.get(question);
        qpurlPromise.then(function () {
            let editorialPageOpened = navigatorFn("a[data-attr2='Editorial']");
            return editorialPageOpened;
        }).then(function () {
            let clickUnlockButton = navigatorFn(".ui-btn.ui-btn-normal.ui-btn-primary .ui-text");
            return clickUnlockButton;
        }).catch(function(err){
            console.log("Button not found");
        }).then(function(){
            let h3ArrPromise = driver.findElements(swd.By.css("h3"));
            let codeArrPromise = driver.findElements(swd.By.css(".highlight"));

            return Promise.all([h3ArrPromise, codeArrPromise]);
        }).then(function(combinedArr){
            let h3Arr = combinedArr[0];
            let codeArr = combinedArr[1];
            gcodeArr = codeArr;
            let h3textPromiseArr = [];
            for(let i = 0; i < h3Arr.length; i++)
                h3textPromiseArr.push(h3Arr[i].getText());

            return Promise.all(h3textPromiseArr);
        }).then(function(h3textArr){
            for(let i = 0; i < h3textArr.length; i++){
                if(h3textArr[i].includes("C++")){
                    codePromise = gcodeArr[i].getText();
                    return codePromise;
                }
            }
        }).then(function(code){
            // console.log(code);
            gCode = code;
            let problemPageOpened = navigatorFn("a[data-attr2='Problem']");
            return problemPageOpened;
        }).then(function(){
            let customInputCheckboxClicked = navigatorFn(".custom-input-checkbox");
            return customInputCheckboxClicked;
        }).then(function(){
            let textAreaPromise = driver.findElement(swd.By.css(".custominput"));
            return textAreaPromise;
        }).then(function(textArea){
            gTextArea = textArea;
            let textAreaFilledPromise = textArea.sendKeys(gCode);
            return textAreaFilledPromise;
        }).then(function(){
            let selectPromise = gTextArea.sendKeys(swd.Key.CONTROL + "a");
            return selectPromise;
        }).then(function(){
            let cutPromise = gTextArea.sendKeys(swd.Key.CONTROL + "x");
            return cutPromise;
        }).then(function(){
            let codeEditorPromise = driver.findElement(swd.By.css(".inputarea"));
            return codeEditorPromise;
        }).then(function(codeEditor){
            gCodeEditor = codeEditor;
            return codeEditor.sendKeys(swd.Key.CONTROL + "a");
        }).then(function(){
            return gCodeEditor.sendKeys(swd.Key.CONTROL + "v");
        }).then(function(){
            return navigatorFn(".hr-monaco-submit");
        })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                console.log(err.message);
                reject();
            })
    })
}