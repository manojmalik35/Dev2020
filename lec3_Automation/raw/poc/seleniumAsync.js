require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");

//build browser
let bldr = new swd.Builder();

//represents single tab
let driver = bldr.forBrowser("chrome").build();

let credentialsFile = process.argv[2];
let questionsFile = process.argv[3];

let questions = require(questionsFile);

async function main() {
    try {

        await loginHelper();

        let dropDown = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
        await dropDown.click();
        let adminDrop = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
        await adminDrop.click();

        // let manageChallengesTab = await driver.findElement(swd.By.css("a[href='/administration/challenges']"))
        // await manageChallengesTab.click();

        let manageTabs = await driver.findElements(swd.By.css(".administration ul li a"))
        await manageTabs[1].click();

        let challengePageLink = await driver.getCurrentUrl();
        for (let i = 0; i < questions.length; i++) {
            await createChallenge(questions[i]);
            console.log("Question " + i); 
            await driver.get(challengePageLink);
        }

    } catch (err) {
        console.log(err.message);
    }
}

main();

async function createChallenge(challenge) {
    try {
        let createChallengeButton = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
        await createChallengeButton.click();

        let challengeName = await driver.findElement(swd.By.css("#name"));
        let description = await driver.findElement(swd.By.css("#preview"));
        let problemStatementBox = await driver.findElement(swd.By.css("#problem_statement-container .CodeMirror textarea"));
        let inputFormatBox = await driver.findElement(swd.By.css("#input_format-container .CodeMirror textarea"));
        let constraintsBox = await driver.findElement(swd.By.css("#constraints-container .CodeMirror textarea"));
        let outputFormatBox = await driver.findElement(swd.By.css("#output_format-container .CodeMirror textarea"));
        let tagsBox = await driver.findElement(swd.By.css("#tags_tag"));
        let saveChangesButton = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"));

        await challengeName.sendKeys(challenge["Challenge Name"]);
        await description.sendKeys(challenge.Description);
        await sendData(problemStatementBox, challenge["Problem Statement"], "#problem_statement-container");
        await sendData(inputFormatBox, challenge["Input Format"], "#input_format-container");
        await sendData(constraintsBox, challenge["Constraints"], "#constraints-container");
        await sendData(outputFormatBox, challenge["Output Format"], "#output_format-container");
        await tagsBox.sendKeys(challenge["Tags"]);
        await tagsBox.sendKeys(swd.Key.ENTER);
        await saveChangesButton.click();

    } catch (err) {
        console.log(err.message);
    }
}

async function sendData(box, data, parentId){
    await driver.executeScript(`document.querySelector('${parentId} .CodeMirror div').style.height='10px'`);
    await box.sendKeys(data);
}

async function waitForLoader() {
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));

    await driver.wait(swd.until.elementIsNotVisible(loader));
}

async function loginHelper() {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    let url = credentials.url;
    let email = credentials.email;
    let pwd = credentials.pwd;

    await driver.get(url);
    await driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 10000
    })
    await driver.manage().window().maximize();
    let emailBox = await driver.findElement(swd.By.css("#input-1"));
    await emailBox.sendKeys(email);
    let pwdBox = await driver.findElement(swd.By.css("#input-2"));
    await pwdBox.sendKeys(pwd);
    let loginButton = await driver.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
    await loginButton.click();
    console.log("User logged in");
}