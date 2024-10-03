const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener ('click', () =>{
        nav.classList.add('active');
    }) 
}

if (close) {
    close.addEventListener ('click', () =>{
        nav.classList.remove('active');
    }) 
}

//contact//
var textArea = document.querySelector("#textarea");
var textAreaUnder150 = textArea.slice(0, 150)

if (textArea = 150) {
    alert("Text above 150")
}
// end contact//

var MainImg = document.getElementById('MainImg');
var smallimg = document.getElementsByClassName('.small-img');

smallimg[0].onClick = function(){
    MainImg.src = smallimg[0].src;
}

smallimg[1].onClick = function(){
    MainImg.src = smallimg[1].src;
}

smallimg[2].onClick = function(){
    MainImg.src = smallimg[2].src;
}

smallimg[3].onClick = function(){
    MainImg.src = smallimg[3].src;
}

var textArea = document.querySelector("#textarea");
var textAreaUnder150 = textArea.slice(0, 150)

if (textArea = 150) {
    alert("Text above 150")
}
