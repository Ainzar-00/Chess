
// // function timer(){
    
// // }
let span=document.querySelector("#whiteTimer span")

let start;
let duration=10
let u=setInterval(() => {

    
    duration--
    if(duration==0){
        clearInterval(u)
    }
    let secondes=duration%60
    
    if(secondes<10){
        span.textContent=Math.floor(duration/60)+":"+"0"+secondes
    }
    else{
        span.textContent=Math.floor(duration/60)+":"+""+secondes
    }
    
}, 1000);

