let game = document.getElementById("game");
let html = document.getElementsByTagName("html")[0];

function tf(id, text){
    document.getElementById(id).textContent = text
};

function id(id){
    return document.getElementById(id)
};

function insert(id, insert){
    document.getElementById(id).insertAdjacentHTML('beforeend', insert)
};

let currState = "none";
let isStateDone = false;