function myfn(varName) {
    console.log("I am " + varName);
}

myfn(function sayHi() {
    console.log("Inside");
})

myfn(["afjl", 2, 45, "sdfjl"])