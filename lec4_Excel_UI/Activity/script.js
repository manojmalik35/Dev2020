const $ = require("jquery");
const fs = require("fs");
const dialog = require("electron").remote.dialog;

$(document).ready(function () {
    let db;
    let lsc;//last selected cell
    $(".grid .cell").on("keydown", function () {
        let height = $(this).height();

        let rowId = $(this).attr("row-id");
        let leftColCells = $(".left-col .cell");
        let myCell = leftColCells[rowId];
        $(myCell).css("height", height+2);
    })

    $(".menu").on("click", function () {
        let optionName = $(this).attr("id");
        $(".menu-options").removeClass("active");
        $(`#${optionName}-options`).addClass("active");
    })

    $(".content").on("scroll", function () {
        let verticalScroll = $(this).scrollTop();
        let horizontalScroll = $(this).scrollLeft();
        // console.log(verticalScroll + " " + horizontalScroll);
        $(".top-row, .top-left-cell").css("top", verticalScroll);
        $(".left-col, .top-left-cell").css("left", horizontalScroll);
    })

    $("#font-family").on("change", function () {
        let { row, col } = getRC(lsc);
        let val = $(this).val();
        $(lsc).css("font-family", val);
        db[row][col].fontFamily = val;
    })

    $("#font-size").on("change", function () {
        let { row, col } = getRC(lsc);
        let val = $(this).val();
        $(lsc).css("font-size", val + "px");
        db[row][col].fontSize = val;

        let height = $(lsc).height();
        let leftColCells = $(".left-col .cell");
        let myCell = leftColCells[row];
        $(myCell).css("height", height+2);
    })

    $("#bold").on("click", function () {
        $(this).toggleClass("active");
        let { row, col } = getRC(lsc);
        if (db[row][col].bold)
            $(lsc).css("font-weight", "normal");
        else
            $(lsc).css("font-weight", "bold");
        db[row][col].bold = !db[row][col].bold;

        let height = $(lsc).height();
        let leftColCells = $(".left-col .cell");
        let myCell = leftColCells[row];
        $(myCell).css("height", height + 2);
    })

    $("#italic").on("click", function () {
        $(this).toggleClass("active");
        let { row, col } = getRC(lsc);
        if (db[row][col].italic)
            $(lsc).css("font-style", "normal");
        else
            $(lsc).css("font-style", "italic");
        db[row][col].italic = !db[row][col].italic;
    })

    $("#underline").on("click", function () {
        $(this).toggleClass("active");
        let { row, col } = getRC(lsc);
        if (db[row][col].underline)
            $(lsc).css("text-decoration", "none");
        else
            $(lsc).css("text-decoration", "underline");
        db[row][col].underline = !db[row][col].underline;
    })

    $("#bcolor").on("change", function(){
        let { row, col } = getRC(lsc);
        let val = $(this).val();
        if (db[row][col].bcolor == val)
            return;
        else
            $(lsc).css("background-color", val);
        db[row][col].bcolor = val;
    })

    $("#fcolor").on("change", function(){
        let { row, col } = getRC(lsc);
        let val = $(this).val();
        if (db[row][col].fcolor == val)
            return;
        else
            $(lsc).css("color", val);
        db[row][col].fcolor = val;
    })

    $("#left").on("click", function(){
        $(".text-align").removeClass("active");
        $(this).addClass("active");
        let { row, col } = getRC(lsc);
        if (db[row][col].alignment == "left")
            return;
        else
            $(lsc).css("text-align", "left");
        db[row][col].alignment = "left";
    })

    $("#center").on("click", function(){
        $(".text-align").removeClass("active");
        $(this).addClass("active");
        let { row, col } = getRC(lsc);
        if (db[row][col].alignment == "center")
            return;
        else
            $(lsc).css("text-align", "center");
        db[row][col].alignment = "center";
    })

    $("#right").on("click", function(){
        $(".text-align").removeClass("active");
        $(this).addClass("active");
        let { row, col } = getRC(lsc);
        if (db[row][col].alignment == "right")
            return;
        else
            $(lsc).css("text-align", "right");
        db[row][col].alignment = "right";
    })

    $(".grid .cell").on("click", function () {
        let { row, col } = getRC(this);
        $("#address-input").val(String.fromCharCode(col + 65) + (row + 1));
        lsc = this;
        let cellObj = db[row][col];
        if (cellObj.bold)
            $("#bold").addClass("active");
        else
            $("#bold").removeClass("active");

        if (cellObj.italic)
            $("#italic").addClass("active");
        else
            $("#italic").removeClass("active");

        if (cellObj.underline)
            $("#underline").addClass("active");
        else
            $("#underline").removeClass("active");

        $("#font-family").val(cellObj.fontFamily);
        $("#font-size").val(cellObj.fontSize);
        $("#fcolor").val(cellObj.fcolor);
        $("#bcolor").val(cellObj.bcolor);
        $(".text-align").removeClass("active");
        if(cellObj.alignment == "left")
            $("#left").addClass("active");
        else if(cellObj.alignment == "center")
            $("#center").addClass("active");
        else
            $("#right").addClass("active");
    });

    $("#new").on("click", function () {
        db = [];
        let rows = $(".grid .row");
        for (let i = 0; i < rows.length; i++) {
            let row = [];
            let cols = $(rows[i]).find(".cell");
            for (let j = 0; j < cols.length; j++) {
                let cell = {
                    value: "",
                    formula: "",
                    children: [],
                    fontFamily: "arial",
                    fontSize: 12,
                    bold: false,
                    italic: false,
                    underline: false,
                    fcolor: "#000000",
                    bcolor: "#55bb55",
                    alignment: "left"
                };
                $(cols[j]).html("");
                $(cols[j]).css("font-family", cell.fontFamily);
                $(cols[j]).css("font-size", cell.fontSize + "px");
                $(cols[j]).css("font-weight", cell.bold ? "bold" : "normal");
                $(cols[j]).css("font-style", cell.italic ? "italic" : "normal");
                $(cols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                $(cols[j]).css("background-color", cell.bcolor);
                $(cols[j]).css("color", cell.fcolor);
                $(cols[j]).css("text-align", cell.alignment);

                row.push(cell);
            }
            db.push(row);
        }

        $("#bcolor").val("#55bb55");
        let allCells = $(".grid .cell");
        $(allCells[0]).trigger("click");
    });

    //Save
    $("#save").on("click", function () {
        let sdb = dialog.showSaveDialogSync();
        let data = JSON.stringify(db);
        fs.writeFileSync(sdb, data);
        console.log("File saved to DB");
    });

    //Open
    $("#open").on("click", async function () {
        let sdb = await dialog.showOpenDialog();
        let bufferData = fs.readFileSync(sdb.filePaths[0]);
        db = JSON.parse(bufferData);

        let rows = $(".grid .row");
        for (let i = 0; i < rows.length; i++) {
            let cols = $(rows[i]).find(".cell");
            for (let j = 0; j < cols.length; j++){
                let cellObj = db[i][j];
                $(cols[j]).html(cellObj.value);
                $(cols[j]).css("font-family", cellObj.fontFamily);
                $(cols[j]).css("font-size", cellObj.fontSize + "px");
                $(cols[j]).css("font-weight", cellObj.bold ? "bold" : "normal");
                $(cols[j]).css("font-style", cellObj.italic ? "italic" : "normal");
                $(cols[j]).css("text-decoration", cellObj.underline ? "underline" : "none");
                $(cols[j]).css("background-color", cellObj.bcolor);
                $(cols[j]).css("color", cellObj.fcolor);
                $(cols[j]).css("text-align", cellObj.alignment);
            }
        }

        console.log("File Opened");
    });

    //update
    $(".grid .cell").on("blur", function () {
        let { row, col } = getRC(this);
        let cellObj = db[row][col];
        let val = $(this).html();

        if (cellObj.value === val) {
            // console.log("Same value");
            return;
        }

        if (cellObj.formula) {
            removeFormula(cellObj.formula, row, col);
            cellObj.formula = "";
        }

        updateCell(cellObj, row, col, val);
    });

    $("#formula-input").on("blur", function () {
        let cell = $("#address-input").val();
        let { row, col } = getRCFromAdd(cell);

        let formula = $(this).val();
        let cellObj = db[row][col];
        if (cellObj.formula == formula)
            return;

        if (cellObj.formula)
            removeFormula(cellObj.formula, row, col);

        cellObj.formula = formula;
        addChildren(formula, row, col);
        let rval = evaluateFormula(formula);
        if (rval)
            updateCell(cellObj, row, col, rval);

    });

    function addChildren(formula, rowId, colId) {
        let fComps = formula.split(" ");
        for (let i = 0; i < fComps.length; i++) {
            let asci = fComps[i].charCodeAt(0);
            if (asci >= 65 && asci <= 90) {
                let { row, col } = getRCFromAdd(fComps[i]);
                db[row][col].children.push({
                    row: rowId,
                    col: colId
                });
            }
        }
    }

    function evaluateFormula(formula) {
        let fComps = formula.split(" ");
        for (let i = 0; i < fComps.length; i++) {
            let asci = fComps[i].charCodeAt(0);
            if (asci >= 65 && asci <= 90) {
                let { row, col } = getRCFromAdd(fComps[i]);
                let val = db[row][col].value;//parent object
                formula = formula.replace(fComps[i], val);
            }
        }

        let rVal = eval(formula);
        return rVal;
    }

    function updateCell(cellObj, row, col, rval) {
        cellObj.value = rval;
        $(`.grid .cell[row-id=${row}][col-id=${col}]`).html(rval);
        for (let i = 0; i < cellObj.children.length; i++) {
            let obj = cellObj.children[i];
            let childObj = db[obj.row][obj.col];
            let childVal = evaluateFormula(childObj.formula, obj.row, obj.col);
            updateCell(childObj, obj.row, obj.col, childVal);
        }
    }

    function removeFormula(formula, rowId, colId) {
        let fComps = formula.split(" ");
        for (let i = 0; i < fComps.length; i++) {
            let asci = fComps[i].charCodeAt(0);
            if (asci >= 65 && asci <= 90) {
                let { row, col } = getRCFromAdd(fComps[i]);
                let parentObj = db[row][col];
                parentObj.children = parentObj.children.filter(function (obj) {
                    return obj.row != rowId || obj.col != colId;
                })
            }
        }
    }

    function getRC(element) {
        let row = Number($(element).attr("row-id"));
        let col = Number($(element).attr("col-id"));
        return { row, col };
    }

    function getRCFromAdd(add) {
        let col = Number(add.charCodeAt(0)) - 65;
        let row = Number(add.substring(1)) - 1;
        return { row, col };
    }

    function init() {
        $("#file").trigger("click");
        $("#new").trigger("click");
    }

    init();

})