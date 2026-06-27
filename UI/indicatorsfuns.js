function Indicators(boardRes,piece,legalMoves,map){

    let type=piece.type
    let movesArray=Array()

    if(type=="pawn" || type=="knight"){
        // console.log(legalMoves)
        iteration(boardRes,legalMoves,map)
    }
    
    if(type=="bishop" || type=="queen" || type=="king"){
       let range=legalMoves

       if(type=="queen" || type=="king"){
            range=legalMoves["diagonal"]
            // console.log(range,"diagonal")
       }

       for(let g in range){
        //  console.log(range[g].length)
        if(range[g].length >= 1) {
          for(let i in range[g]){
            movesArray.push(range[g][i])
            // console.log(range[g])
          }
        }
       }

       iteration(boardRes,movesArray,map)
       movesArray=Array()
    }

    if(type=="rook" || type=="queen" || type=="king"){
        let range=legalMoves

       if(type=="queen" || type=="king"){
            range=legalMoves["cross"]
            // console.log(range)
       }
       
       for(let g in range){
        //  console.log(range)
        if(range[g].length >= 1) {
          for(let i in range[g]){
            movesArray.push(range[g][i])
            // console.log(range[g])
          }
        }
       }

       iteration(boardRes,movesArray,map)
    }

}

function iteration(boardRes,legalMoves,map){
     
     legalMoves.forEach(element => {
        let square=boardRes.querySelector(`[data-x="${element[0]}"][data-y="${element[1]}"]`)
        let piece=map[element[0]][element[1]]
        let indicator=document.createElement("div")
        indicator.className="indicator"
        if(piece!=null){
           indicator.style.position="absolute"
           indicator.style.zIndex=99
        }
        square.appendChild(indicator)
        
    });
}

export{Indicators}