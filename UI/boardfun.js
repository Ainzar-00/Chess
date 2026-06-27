let alphabet=["a","b","c","d","e","f","g","h"] 

function board_s(board){
for(let i=0;i<8;i++){
for(let j=0;j<8;j++){
let square=document.createElement("div")
// square.classList.add(alphabet[j],(8-i))
square.dataset.x=alphabet[j]
square.dataset.y=(8-i)
if((i%2==0 && j%2!==0) || (i%2!==0 && j%2==0)){
square.style.backgroundColor="#769656"
board.append(square)
if(j==0){
let s=document.createElement("span")
s.style.top=5+"px"
s.style.left=5+"px"
s.textContent=8-i
s.style.color="#EEEED2"
square.append(s)
}
if(i==7){
let alph=document.createElement("span")
alph.style.bottom=5+"px"
alph.style.right=5+"px"
alph.style.color="#EEEED2"
alph.textContent=alphabet[j]
square.append(alph)
}}
else {
    square.style.backgroundColor="#EEEED2"
    board.append(square)
    if(j==0){
     let s=document.createElement("span")
     s.style.top=5+"px"
     s.style.left=5+"px"
     s.style.color="#769656"
     s.textContent=8-i
     square.append(s)
}
if(i==7){
let alph=document.createElement("span")
alph.style.bottom=5+"px"
alph.style.right=5+"px"
alph.style.color="#769656"
alph.textContent=alphabet[j]
square.append(alph)
}}}}}

export{board_s}