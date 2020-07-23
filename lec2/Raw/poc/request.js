let request = require('request');
let cheerio = require("cheerio");

let fs = require("fs")
let url = "https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";

console.log("Starting..........")
request(url,function(err, response, html){

    console.log("Inside..........");
    if(err === null && response.statusCode === 200){
        fs.writeFileSync("index.html", html);
        parseHTML(html);
    }else if(response.statusCode === 404){
        console.log("Page not found");
    }else{
        console.log(err);
        console.log(response.statusCode);
    }
})

console.log("Outside..........");

function parseHTML(data){
    let $ = cheerio.load(data);
    let text = $("title").text();
    console.log(text);
}