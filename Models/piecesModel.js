import {crossMove,diagonalMove} from "../helpers/movesfuns.js"
let alphabet=["a","b","c","d","e","f","g","h"] 

class piece{
    constructor(type,value,color,position){
        this.type=type
        this.value=value
        this.color=color
        this.position=position
    }

    getMoveRange(){}

    getLegalMoves(map,newposition,pieces,threats){

        if(threats?.length==2 && this.type!="king"){
             return []
        }
        

        let range=this.getMoveRange()
        let mapPiece=null;
        let newrange=range
        console.log(this,pieces)
        let myPieces=pieces.filter((p)=>{return p?.color==this.color && p!=null} )
        
        let oponnentPieces=pieces.filter((p)=>{return p?.color!=this.color && p!=null} )
        let myKing=myPieces.filter((p)=>{return p?.type=="king"})[0]
        let pinnedObject=null
        let attackedRangeObject=null


        if(threats?.length==1){
            console.log("here",this.type,threats,threats[0].getLegalMoves(map,false,pieces,[]))
            attackedRangeObject=getAttackedRange(threats[0],myKing.position)
            attackedRangeObject.attackedRange=attackedRangeObject.attackedRange.filter((p)=>{return p[0]!=myKing.position[0] || p[1]!=myKing.position[1]})
        }
    
        if(this.type!="king"){
            
            for(let oPiece of oponnentPieces){
                if(oPiece.type=="pawn" || oPiece.type=="knight") continue
                
                pinnedObject=getPinnedPiece(oPiece,myKing,this.position,map)
                if(this.type=="knight" && pinnedObject!=null){
                    return []
                }
                if(pinnedObject!=null && this.type =="pawn"){
                     console.log("pawn detected")
                     pinnedObject["pinPiece"]=oPiece
                     break
                }
                else if(pinnedObject!=null && (this.type!="pawn" && this.type!="knight")){
                    let keys=pinnedObject.keys
                    range=getRangeType(this.type)
                    if(this.type=="queen"){
                        range[keys[0]][keys[1]]=pinnedObject.attackedRange
                        range[keys[0]][keys[1]].unshift(oPiece.position)
                    }
                    else{
                         range[keys[1]]=pinnedObject.attackedRange
                         range[keys[1]].unshift(oPiece.position)
                    }
                    return range
                }
        }
        }
        
        
    
        switch (this.type) {
             
            case "pawn":
                newrange=range["normal"]
                range["normal"].forEach((el,index)=> {
                    mapPiece=map[el[0]][el[1]]
                        console.log("pawn",pinnedObject)

                    if(pinnedObject!=null && pinnedObject.keys[0]!="cross"){
                       newrange=[]
                       return
                    }
                    else if(threats?.length==1 && squareExistInRange(el,attackedRangeObject.attackedRange)){
                            console.log(true)
                    }
                    if(mapPiece!=null){
                            //has changed
                           newrange=range["normal"].slice(0,index)
                           return
                    } 
                    
                    
                });
                range["attack"].forEach((el,index)=>{
                    // console.log(el)
                    mapPiece=map[el[0]][el[1]]
                    if(mapPiece!=null){
                        let pinPiece=pinnedObject?.pinPiece
                        if(pinPiece!=null && el[0]==pinPiece.position[0] && el[1]==pinPiece.position[1]){
                            newrange.push(el)
                            return
                        }
                        else if(pinnedObject!=null){
                            return
                        }
                        else if(threats?.length==1 && squareExistInRange(threats[0],myKing.position)){
                            
                        }
                        if(newposition!=null && mapPiece.color!=this.color && newposition[0]==el[0] && newposition[1]==el[1]){
                            newrange.push(el)
                            return
                        }
                        else if(mapPiece.color!=this.color){
                           newrange.push(el)
                        }
                    }

                })
                                       
            if(newposition){
                this.firstmove=false
            } 

            // console.log(newrange)
            return newrange

            case "rook":
                // console.log(range)
                for(let i in range){
                    
                    range[i].forEach((el,index)=>{
                        mapPiece=map[el[0]][el[1]]
                        
                        if(threats?.length==1 && (squareExistInRange(el,attackedRangeObject.attackedRange) || squareExistInRange(threats[0].position,[el]))){
                            // console.log("first",(squareExistInRange(el,attackedRangeObject.attackedRange) || squareExistInRange(threats[0].position,[el])))
                             range=getRangeType("queen")
                             range[i].push(el)
                             return 
                        }

                        else if(threats?.length==1){
                            range[i]=range[i].slice(0,index)
                            return
                        }
    
                        if(mapPiece!=null && mapPiece.color==this.color){
                            newrange[i]=range[i].slice(0,index)
                            return
                        }
                        else if(mapPiece!=null && mapPiece.color!=this.color){
                            newrange[i]=range[i].slice(0,index+1)
                            return
                        }
                    })
                }

                return newrange

            case "knight":
            newrange=Array()
            for(let el of range){
            
                mapPiece=map[el[0]][el[1]]
                if(threats?.length==1 && (squareExistInRange(el,attackedRangeObject.attackedRange) || squareExistInRange(threats[0].position,[el]))){
                    newrange.push(el)
                }
                else if(threats?.length==0){
                     if( mapPiece!=null && mapPiece.color!=this.color){
                         newrange.push(el)
                     }
                
                    else if(mapPiece==null ){
                         newrange.push(el)
                    }
                }
                
            }

            // console.log(newrange,map,"range",range)

            return newrange
            
            case "bishop":
                 for(let i in range){ 
                     
                    range[i].forEach((el,index)=>{
                        // console.log(el)
                        mapPiece=map[el[0]][el[1]]
                        if(threats?.length==1 && (squareExistInRange(el,attackedRangeObject.attackedRange) || squareExistInRange(threats[0].position,[el]))){
                            // console.log("first",(squareExistInRange(el,attackedRangeObject.attackedRange) || squareExistInRange(threats[0].position,[el])))
                             range=getRangeType("bishop")
                             range[i].push(el)
                             return 
                        }

                        else if(threats?.length==1){
                            range[i]=range[i].slice(0,index)
                            return
                        }
    
                        if(threats?.length==0){
                        if(mapPiece!=null && mapPiece.color==this.color ){
                            newrange[i]=range[i].slice(0,index)
                            return
                        }
                        else if(mapPiece!=null && mapPiece.color!=this.color){
                            newrange[i]=range[i].slice(0,index+1)
                            return
                        }}
                        
                    })
                   
                }

                
            return range


            case "queen":

               for(let key in range){
                for(let subkey in range[key]){
                    range[key][subkey].forEach((el,index)=>{
                        mapPiece=map[el[0]][el[1]]
                        if(threats?.length==1 && (squareExistInRange(el,attackedRangeObject.attackedRange) || squareExistInRange(threats[0].position,[el]))){
                             range=getRangeType("queen")
                             range[key][subkey].push(el)
                             console.log(range)
                             return 
                        }
                        else if(threats?.length==1){
                            range[key][subkey]=range[key][subkey].slice(0,index)
                            return
                        }

                        if(threats?.length==0){
                        if(mapPiece!=null && mapPiece.color==this.color){
                            
                            newrange[key][subkey]=range[key][subkey].slice(0,index)
                            return
                        }
                        else if(mapPiece!=null && mapPiece.color!=this.color){
                            newrange[key][subkey]=range[key][subkey].slice(0,index+1)
                            return
                        }}
                    })
                   
                }
                }


                return range
            
            case "king":
                for(let keys in range){
                for(let i in range[keys]){
                    range[keys][i].forEach((el,index)=>{
                        mapPiece=map[el[0]][el[1]]
                        // console.log(el,threats,positionExistInOppenentRange(el,threats,false,map,null))
                        if(threats.length>=1 && positionExistInOppenentRange(el,threats,true,map,pieces)){
                            console.log("true me")
                            newrange[keys][i]=range[keys][i].slice(0,index)
                            return
                        }
                        else if(positionExistInOppenentRange(el,oponnentPieces,true,map,pieces)){
                            console.log("legal")
                             newrange[keys][i]=range[keys][i].slice(0,index)
                             return
                        }

                        if(mapPiece!=null && mapPiece.color==this.color){
                            newrange[keys][i]=range[keys][i].slice(0,index)
                            return
                        }
                        else if(mapPiece!=null && mapPiece.color!=this.color && positionExistInOppenentRange(el,oponnentPieces,false,map,pieces)){
                            newrange[keys][i]=range[keys][i].slice(0,index)
                            return
                        }
                        else if(mapPiece!=null && mapPiece.color!=this.color){
                            
                            newrange[keys][i]=range[keys][i].slice(0,index+1)
                            return
                        }
                    })
                }
                }
                
                return newrange
    
            default:
                break;
        }
    }  
    
}

class king extends piece{
    constructor(type,value,color,position){
        super(type,value,color,position)
    }

    getMoveRange(){
        let x=alphabet.indexOf(this.position[0])
        let y=parseInt(this.position[1])
        let crossrange={leftRow:[],rightRow:[],topCol:[],bottomCol:[]}
        let diagonalrange={topleftdiag:[],toprightdiag:[],bottomleftdiag:[],bottomrightdiag:[]}
        let diagonalMoves=diagonalMove(diagonalrange,x,y)
        let crossMoves=crossMove(crossrange,x,y,this.position)

        for(let diag in diagonalMoves){
                if(diagonalMoves[diag].length!=0)
                  diagonalMoves[diag]=[diagonalMoves[diag][0]]
                else diagonalMoves[diag]=[]
                
        }

        for(let axe in crossMoves){
               if(crossMoves[axe].length!=0)
                crossMoves[axe]=[crossMoves[axe][0]]
               else crossMoves[axe]=[]
               
        }
        let ranges={diagonal:diagonalMoves,cross:crossMoves}
        return ranges
    }

    flatMovesArrays(nestedArray){
            let flatArray=Array()
            for(let key in nestedArray){
                for(let subKey in nestedArray[key]){
                   nestedArray[key][subKey].forEach((p)=>{
                      flatArray.push(p)
                   })
                }
            }
            return flatArray
        }

}

class pawn extends piece{

    constructor(type,value,color,position){
        super(type,value,color,position)
        this.firstmove=true
        this.attackrange=Array()
    }
    getMoveRange(){
        let x=alphabet.indexOf(this.position[0])
        let y=parseInt(this.position[1])
        this.updateAttackrange()
        let attackrangecopy={"attack":this.attackrange.slice(0),"normal":[]}
        if(this.color=="white"){

        if(this.firstmove){   
            attackrangecopy["normal"].push([alphabet[x],String(y+2)],[alphabet[x],String(y+1)])
        }
        else{
             attackrangecopy["normal"].push([alphabet[x],String(y+1)]) 
         } 
        }
        else{
         if(this.firstmove){
                attackrangecopy["normal"].push([alphabet[x],String(y-2)],[alphabet[x],String(y-1)])
         } 
         else{
            attackrangecopy["normal"].push([alphabet[x],String(y-1)]) 
         }    
         
       }
       this.attackrange=Array()
       return attackrangecopy
    }
    updateAttackrange(){
        let x=alphabet.indexOf(this.position[0])
        let y=parseInt(this.position[1])
        if(this.color=="white"){
             if(y+1<=8){
                 if(x+1<=7) this.attackrange.push([alphabet[x+1],String(y+1)])
                 if(x-1>=0) this.attackrange.push([alphabet[x-1],String(y+1)]) 
            }
         }
        else{ 
            if(y-1>0){
                 if(x+1<=7) this.attackrange.push([alphabet[x+1],String(y-1)])
                 if(x-1>=0) this.attackrange.push([alphabet[x-1],String(y-1)])
             }
        }
    }
 
    flatMovesArrays(nestedArray){
        return nestedArray
    }

}

class rook extends piece{
        constructor(type,value,color,position){
         super(type,value,color,position)
        }
    
        getMoveRange(){

            let x=alphabet.indexOf(this.position[0])
            let y=parseInt(this.position[1])
            let ranges={leftRow:{},rightRow:{},topCol:[],bottomCol:[]}
            
            return crossMove(ranges,x,y,this.position)
            
        }

        flatMovesArrays(nestedArray){
            let flatArray=Array()
            for(let key in nestedArray){
                nestedArray[key].forEach((p)=>{
                    flatArray.push(p)
                })
                
            }
            return flatArray
        }
}

class bishop extends piece{

    constructor(type,value,color,position){
        super(type,value,color,position)
    }
    
     getMoveRange(){
        let x = alphabet.indexOf(this.position[0])
        let y = parseInt(this.position[1])
        let ranges={topleftdiag:[],toprightdiag:[],bottomleftdiag:[],bottomrightdiag:[]}
      
        return diagonalMove(ranges,x,y)
    }

    flatMovesArrays(nestedArray){
            let flatArray=Array()
            for(let key in nestedArray){
                nestedArray[key].forEach((p)=>{
                    flatArray.push(p)
                })
                
            }
             return flatArray
        }
}

class knight extends piece{
    constructor(type,value,color,position){
        super(type,value,color,position)
    }

     getMoveRange(){
let x = alphabet.indexOf(this.position[0])
let y = parseInt(this.position[1])

let bottom = y - 2
let top    = y + 2
let right  = x + 2
let left   = x - 2

let ranges = []

if (right < 8) {
    if (y + 1 <= 8) ranges.push([alphabet[right], y + 1])
    if (y - 1 > 0)  ranges.push([alphabet[right], y - 1])
}

if (left >= 0) {
    if (y + 1 <= 8) ranges.push([alphabet[left], y + 1])
    if (y - 1 > 0)  ranges.push([alphabet[left], y - 1])
}

if (top <= 8) {
    if (x + 1 < 8) ranges.push([alphabet[x + 1], top])
    if (x - 1 >= 0) ranges.push([alphabet[x - 1], top])
}

if (bottom > 0) {
    if (x + 1 < 8) ranges.push([alphabet[x + 1], bottom])
    if (x - 1 >= 0) ranges.push([alphabet[x - 1], bottom])
}
// console.log(ranges,"ranges")
return ranges

    }
    flatMovesArrays(nestedArray){
            let flatArray=Array()
                nestedArray.forEach((p)=>{
                    flatArray.push(p)
                })
                
             return flatArray
        }
}

class queen extends piece{
    constructor(type,value,color,position){
        super(type,value,color,position)
    }
 
    getMoveRange(){
        let x=alphabet.indexOf(this.position[0])
        let y=parseInt(this.position[1])
        let crossrange={leftRow:[],rightRow:[],topCol:[],bottomCol:[]}
        let diagonalrange={topleftdiag:[],toprightdiag:[],bottomleftdiag:[],bottomrightdiag:[]}
        let ranges={diagonal:diagonalMove(diagonalrange,x,y),cross:crossMove(crossrange,x,y,this.position)}
        return ranges
    }

    flatMovesArrays(nestedArray){
            let flatArray=Array()
            for(let key in nestedArray){
                for(let subKey in nestedArray[key]){
                   nestedArray[key][subKey].forEach((p)=>{
                      flatArray.push(p)
                   })
                }
            }
            return flatArray
        }

}

function getPinnedPiece(threatPiece,king,pinnedPiece,map){

    let attackedRange
    let kingPosition=king.position
    let ownPieces=Array()
    let keys=[]

    let attackedRangeObject=getAttackedRange(threatPiece,kingPosition)
    attackedRange=attackedRangeObject.attackedRange
    keys=attackedRangeObject.keys

    if(attackedRange) {
        let kingIndex=attackedRange.findIndex(i =>i[0] == kingPosition[0] && i[1] == kingPosition[1])
        attackedRange=attackedRange.slice(0,kingIndex)
        for(let square of attackedRange){
            let mapPiece=map[square[0]][square[1]]
            if(mapPiece==null) continue
            if(mapPiece.color!=king.color) return null
            else ownPieces.push(mapPiece.position)
        }
        if(ownPieces.length>1){
            return null 
        }
        else if(ownPieces.length==1 && (ownPieces[0][0]==pinnedPiece[0] && ownPieces[0][1]==pinnedPiece[1])){
            attackedRange=attackedRange.filter((p)=> p[0]!==pinnedPiece[0] || p[1]!==pinnedPiece[1])
            return {"keys":keys,"attackedRange":attackedRange}
        }
    } 
    
}

function getAttackedRange(threatPiece,kingPosition){
    let threatMovegRange=threatPiece.getMoveRange()
    let keys=[]
    let attackedRange
    for(let key in threatMovegRange){
        if(threatPiece.type=="bishop" || threatPiece.type=="rook"){
            if(squareExistInRange(kingPosition,threatMovegRange[key])){
                attackedRange=threatMovegRange[key]
                if(threatPiece.type=="bishop") keys.push("diagonal",key)
                else keys.push("cross",key)
            } 
        }
        else{
            for(let subkey in threatMovegRange[key]){
              if(squareExistInRange(kingPosition,threatMovegRange[key][subkey])){
                attackedRange=threatMovegRange[key][subkey]
                keys.push(key,subkey)
                break
              } 
        }
        }
    }
    return {"keys":keys,"attackedRange":attackedRange}

}

function createPiece(type,color,position,pawnFirstMove=true){
    switch (type) {

            case "pawn":
                return new pawn("pawn",1,color,position,pawnFirstMove)
            case "rook":
                return new rook("rook",5,color,position)   
            case "bishop":
                return new bishop("bishop",3,color,position)  
            case "knight":
                {   
                    return new knight("knight",3,color,position)}
            case "queen":
                return new queen("queen",9,color,position)
            case "king" :
                return new king("king",0,color,position)
            default:
                break;
        }

}

function squareExistInRange(square,range){
    for(let rSquare of range){
        // console.log("range",range)
        if(rSquare[0]==square[0] && rSquare[1]==square[1]) return true
    }
    return false
}

function positionExistInOppenentRange(square,pieceArray,legalMoves,map,pieces){
    let range
    // console.log("safety check",square,pieceArray)
    for(let piece of pieceArray){
        if(piece.type!="pawn" && (!legalMoves || piece.type=="king")){
            range=piece.flatMovesArrays(piece.getMoveRange()) 
        } 
        else if(piece.type!="pawn" && legalMoves){
            range=piece.flatMovesArrays(piece.getLegalMoves(map,null,pieces,[])) 
        }
        else range=piece.attackrange
        // console.log(range)
        for(let s of range){
            if(s[0]==square[0] && s[1]==square[1]) return true
        }
    }
    return false
}

function getRangeType(type){
        let crossrange={leftRow:[],rightRow:[],topCol:[],bottomCol:[]}
        let diagonalrange={topleftdiag:[],toprightdiag:[],bottomleftdiag:[],bottomrightdiag:[]}
        let fullRange={diagonal:diagonalrange,cross:crossrange}
        switch(type){
            case "king":
                return fullRange
                break
            case "queen":
                return fullRange
                break
            case "bishop":
                return diagonalrange
                break
            case "rook":
                return crossrange
                break
            default:
                break
}



         
}
export{piece,pawn,queen,rook,knight,bishop,king,createPiece}


// king:
// if ur in check and the legal range reach the king , exclude the whole moveRange in that direction even below the king (get the axis or the diagnal)
// if there is a piece and the range of other piece reach it exclud it 
// pin:
// if the moveRange differ from the legalrange in one single position and its ur piece , add a function to detect that, and if a piece return true return [] for the reques of legal moves