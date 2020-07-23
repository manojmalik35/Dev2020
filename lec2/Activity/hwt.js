//highest wicket taker

let request = require('request');
let cheerio = require("cheerio");
let fs = require("fs")
//19322 1187684

let seriesId = process.argv[2];
let scorecardId = process.argv[3];
let url = `https://www.espncricinfo.com/series/${seriesId}/scorecard/${scorecardId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`

console.log("Starting..........")
request(url,function(err, response, html){

    console.log("Inside..........");
    if(err === null && response.statusCode === 200){
        console.log("Retrievind data");
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
    
    console.log("################################")

    let bowlersArr = $('.table.bowler tbody tr');

    fs.writeFileSync("bowlers.html",bowlersArr);
    console.log(bowlersArr.length)
    console.log("################################")
}