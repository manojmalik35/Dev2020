let root = {
    data: "d10",
    children: [{
        data: "d20",
        children: [{
            data: "d50",
            children: []
        }, {
            data: "d60",
            children: []
        }]
    }, {
        data: "d30",
        children: []
    }, {
        data: "d40",
        children: [{
            data: "d80",
            children: []
        }]
    }]
}

function display(root){
    let r = root.data + " => ";
    for(let i = 0; i < root.children.length; i++){
        r += root.children[i].data + ", ";
    }

    console.log(r);
    for(let i = 0; i < root.children.length; i++){
        display(root.children[i]);
    }
}

display(root);
