let puppeteer = require("puppeteer");
let fs = require("fs");

let credentialsFile = process.argv[2];

(async function () {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        //creates an empty page
        // let page = await browser.newPage();
        // await page.goto("https://www.google.com");

        //return array of pages
        let numberOfPages = await browser.pages();
        let tab = numberOfPages[0];

        await loginHelper(tab);
        await tab.waitForSelector("a[data-analytics='NavBarProfileDropDown']");
        await tab.click("a[data-analytics='NavBarProfileDropDown']");
        await tab.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']", { visible: true });
        await navigationHelper(tab, "a[data-analytics='NavBarProfileDropDownAdministration']");
        await tab.waitForSelector("a[href='/administration/challenges']")
        await tab.click("a[href='/administration/challenges']");

        await handleSinglePage(tab, browser);
        
    } catch (err) {
        console.log(err.message);
    }
})();

async function handleSinglePage(tab, browser) {
    try {
        await tab.waitForSelector(".backbone.block-center");
        let questions = await tab.$$(".backbone.block-center");
        let questionSolvedArr = [];
        for (let i = 0; i < questions.length; i++) {

            let href = await tab.evaluate(function (question) {
                return question.getAttribute("href");
            }, questions[i]);

            let completeHref = "https://www.hackerrank.com" + href;
            let ntab = await browser.newPage();
            //parallely each question
            let questionWillBeSolvedPromise = solveOneQuestion(completeHref, ntab);
            questionSolvedArr.push(questionWillBeSolvedPromise);
        }

        await Promise.all(questionSolvedArr);
        console.log("completed questions of current Page");

        //find next button from pagination
        let pages = await tab.$$(".pagination ul li");
        let nextBtn = pages[pages.length - 2];
        let classOfButton = await tab.evaluate(function(li){
            return li.getAttribute("class");
        },nextBtn);

        if(classOfButton === "disabled")
            return;
        else{
            await Promise.all([nextBtn.click(), tab.waitForNavigation({waitUntil:"networkidle0"})]);
            await handleSinglePage(tab, browser);
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function solveOneQuestion(href, ntab) {
    try {
        await ntab.goto(href, {
            waitUntil: "networkidle0"
        });

        await ntab.waitForSelector("li[data-tab='moderators']");
        await navigationHelper(ntab, "li[data-tab='moderators']");
        await ntab.waitForSelector("#moderator");
        await ntab.type("#moderator", "vejohom272");
        await ntab.keyboard.press("Enter");

        await ntab.waitForSelector(".save-challenge.btn.btn-green");
        await ntab.click(".save-challenge.btn.btn-green");
        await ntab.close();
    } catch (err) {
        console.log(err.message)
    }
}

async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle0"
    }), tab.click(selector)]);
}

async function loginHelper(tab) {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    let url = credentials.url;
    let email = credentials.email;
    let pwd = credentials.pwd;

    await tab.goto(url, {
        waitUntil: "networkidle0"
    });

    //wait for element
    await tab.waitForSelector("#input-1");
    await tab.type("#input-1", email, { delay: 50 });
    await tab.waitForSelector("#input-2");
    await tab.type("#input-2", pwd, { delay: 50 });

    await tab.waitForSelector("button[data-analytics='LoginPassword']");
    await navigationHelper(tab, "button[data-analytics='LoginPassword']");
}


