let puppeteer = require("puppeteer");
let fs = require("fs");

let credentialsFile = process.argv[2];
let pageName = process.argv[3];

(async function () {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized", "--disable-notifications"],
            slowMo: 100
        });

        let numberOfPages = await browser.pages();
        let tab = numberOfPages[0];

        let data = await fs.promises.readFile(credentialsFile, "utf-8");
        let credentials = JSON.parse(data);
        let url = credentials.url;
        let email = credentials.email;
        let pwd = credentials.pwd;

        await tab.goto(url, { waitUntil: "networkidle0" });
        await tab.waitForSelector("#email");
        await tab.type("#email", email, { delay: 50 });
        await tab.type("#pass", pwd, { delay: 50 });
        await navigatorFn(tab, "input[data-testid='royal_login_button']");
        console.log("User logged in");

        await tab.goto(`${url}/${pageName}/`, { waitUntil: "networkidle0", delay:2000 });
        await tab.waitForSelector("a[data-endpoint='/hindustantimes/posts/?ref=page_internal']");
        await navigatorFn(tab, "a[data-endpoint='/hindustantimes/posts/?ref=page_internal']");
        //bcoz posts pe click krne pe 2 baar url change hota h
        await tab.waitForNavigation({ waitUntil: "networkidle0" });

        await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8");
        let posts = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8");

        let likeButton = await posts[0].$("._6a-y._3l2t._18vj");
        await likeButton.click();

        

    } catch (err) {
        console.log(err.message);
    }
})();

async function navigatorFn(tab, selector) {
    await Promise.all([tab.waitForNavigation({ waitUntil: "networkidle0" }), tab.click(selector)]);
}