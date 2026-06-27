import { chessGame } from "./mainGame.js"
import {board_s} from "./UI/boardfun.js"
import { standardPiecesArrangmement,createPieceImg } from "./UI/piecesResArrange.js"
import { Indicators } from "./UI/indicatorsfuns.js"
let boa=document.getElementById("board")

board_s(boa)
standardPiecesArrangmement(boa)

let squares=boa.querySelectorAll("div")
let btn=document.getElementById("reversebtn")
let rotation=0

let game=new chessGame()
// game.startStandardGame()

game.startCustomGame()
updateBoard(game.getMap())

// console.log(game.getMap())

squares.forEach(element => {
    element.addEventListener("click",()=>{
    let x=element.dataset.x
    let y=parseInt(element.dataset.y)
    let aPieceIsSelected=game.isSelected()
    // console.log(aPieceIsSelected)
    if(!aPieceIsSelected || (aPieceIsSelected && game.getPiece(x,y)?.color==aPieceIsSelected?.color) ) {
        let legalMoves=game.selectPiece(x,y)
        if(legalMoves==[] || legalMoves==null){
            console.log("Illegal Move")
            return 
        } 
        showLegalMoves(legalMoves,game.getPiece(x,y))
    }
    
    else{
        let validity=game.movePieceTo(x,y)
        if(validity){
            updateBoard(game.getMap())
            // updatePiecesAdvantage()
        }
        else{
            console.log("Illegal Move")
        }
    }

    if(game.isCheckMate()){
        alert("Checkmate")
    }

    })
})

function updateBoard(map){
    // console.log(map)
    for(let x in map){
        
       for(let y in map[x]){
           let piece=game.getPiece(x,y)
           let resSquare=document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
           let img=resSquare.querySelector("img")
           
           if(piece==null && img!=null){
              img.remove()
           }
           else if(piece!=null && img==null){
                resSquare.appendChild(createPieceImg(piece))
           }
        
           else if(piece!=null && img!=null && (piece.type!=img.classList[1] || piece.color!=img.classList[0])){

                resSquare.appendChild(createPieceImg(piece))
                img.remove()
                
           }
       }
    }

    emptyIndicators()
    
    btn.click()
}

function emptyIndicators(){
    let indicators=document.querySelectorAll("div.indicator")
    if(indicators!=null){
    indicators.forEach(element => {
        element.remove()
    });
    }
}

function showLegalMoves(legalMoves,piece){
    
    emptyIndicators()
    Indicators(boa,piece,legalMoves,game.getMap())
}

function updatePiecesAdvantage(takedPiece,piecesDifference){
    let Whitecontainer=document.getElementById("black_lost_ps")
    let blackcontainer=document.getElementById("white_lost_ps")
    let whiteSpan=document.querySelector("#white_situation span")
    let blackSpan=document.querySelector("#black_situation span")
    let groupe
    let difference=piecesDifference[0]-piecesDifference[1]
    
    if(difference==0){
       whiteSpan.textContent=""
       blackSpan.textContent=""
    }
    else if(difference<0){
        whiteSpan.textContent=""
        blackSpan.textContent="+"+(-difference)
    }
    else{
        whiteSpan.textContent="+"+difference
        blackSpan.textContent=""
    }
    
    if(takedPiece.color=="white"){
        groupe=blackcontainer.querySelector(`.${takedPiece.type}`)
        let img=createPieceImg(takedPiece)
         img.style.position="absolute"
        if(groupe===null){
            let div=document.createElement("div")
            div.className=takedPiece.type
            div.appendChild(img)
            div.style.position="relative"
            blackcontainer.appendChild(div)
            
        }
        else{
             let piecenbs=groupe.childNodes.length
             groupe.style.width=15*(piecenbs)+"px"
             if(piecenbs==1){
                img.style.left=10+"px"
                groupe.style.width=32+"px"
             }
             else{
                 img.style.left=piecenbs*10+"px"
             }
             groupe.appendChild(img)
        }
    }
    else{
        groupe=Whitecontainer.querySelector(`.${takedPiece.type}`)
        let img1=createPieceImg(takedPiece.type)
        img1.style.position="absolute"
        if(groupe===null){
            let div=document.createElement("div")
            div.className=takedPiece.type
            div.style.position="relative"
            
            
            div.appendChild(img1)
            Whitecontainer.appendChild(div)
        }
        else{
             let piecenbs=groupe.childNodes.length
            //  Whitecontainer.style.width=16+parseInt(getComputedStyle(Whitecontainer).width)*(piecenbs)+"px"
             groupe.style.width=15*(piecenbs)+"px"
        

             if(piecenbs==1){
                img1.style.left=10+"px"
                groupe.style.width=32+"px"
             }
             else{
                 img1.style.left=piecenbs*10+"px"
             }
             
             console.log((piecenbs))
             groupe.appendChild(img1)
        }
    }
}


btn.addEventListener("click",()=>{
    if(rotation==0)  rotation=180 
    else rotation=0     
    boa.style.transform = `rotate(${rotation}deg)`;
    boa.querySelectorAll("div img").forEach(img => {
        img.style.transform = `rotate(${-rotation}deg)`;
    });
    
})
