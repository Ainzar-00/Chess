import { board_s } from "../UI/boardfun.js"
import {piece} from "./piecesModel.js"
import {createPiece} from "./piecesModel.js"
import { standardPiecesArrangmement , customPiecesArrangment} from "../UI/piecesResArrange.js"
let alphabet=["a","b","c","d","e","f","g","h"] 

class Board{
    constructor(){
        this.map={}
        this.selected=false
        this.piece=null
        this.piecesDifferences={"white":{},"black":{}}
        this.color="white"

        this.kingIsChecked=0
        this.kingsSquares={"white":["e",1],"black":["e",8]}

        this.checkMate=false
    }
    
    CreateStandardBoard(){

        this.createStandardMap()

        for(let i in this.piecesDifferences){
            this.piecesDifferences[i]={"pawn":{"number":8,value:1},"knight":{"number":2,value:3},"bishop":{"number":2,value:3},"rook":{"number":2,value:5},"queen":{"number":1,value:9}}
        }

    }

    CreateCustomBoard(customMap,kingsPositions){
        this.map=customMap
        this.kingsSquares=kingsPositions
        this.analyseCheckState()
        console.log(this.kingIsChecked)

    }
    

    // create standard map
    // future Improvement : add custom map creation 
    // add full board validation from pawn movements to kings existance ...

    createStandardMap(){  
        let piecesSequence=["rook","knight","bishop","queen","king","bishop","knight","rook"]

        alphabet.forEach(alp=>{
            this.map[alp]={}
        })
        
        for(let i=0;i<8;i++){
           let y=i+1
           for(let j=0;j<8;j++){
            
              if(i==0){
                this.map[alphabet[j]][y]=createPiece(piecesSequence[j],"white",[alphabet[j],y])
              }
              else if(i==1){
                   this.map[alphabet[j]][y]=createPiece("pawn","white",[alphabet[j],y])
              }
              else if(i==6){
                    this.map[alphabet[j]][y]=createPiece("pawn","black",[alphabet[j],y])
              }
              else if(i==7){
                this.map[alphabet[j]][y]=createPiece(piecesSequence[j],"black",[alphabet[j],y])
              }
              else{
                  this.map[alphabet[j]][y]=null
              }
           }
        }

    

    }

    selectPiece(x,y){
        let selectedPiece=this.map[x][y]
        if(selectedPiece!=null && selectedPiece.color==this.color){
            this.selected=true
            this.piece=selectedPiece
            return this.piece.getLegalMoves(this.map,null,this.getPieces(),this.analyseCheckState())
        }
        return null
    }

    movePieceTo(newposition){
       
       if(!this.movementVerification(newposition)){
            return false
       }
      
      let x=this.piece.position[0]
      let y=this.piece.position[1]

      this.capturePiece(newposition)
      
      this.map[x][y]=null
      this.piece.position=newposition
      this.map[newposition[0]][newposition[1]]=this.piece
    
      if(this.piece.type=="king"){
         this.kingsSquares[this.color]=newposition
      }

      if(this.color=="white") this.color="black" 
      else this.color="white"

      this.piece=null
      this.selected=false

      //checks detection after color switch
      this.analyseCheckState()
      console.log(this.kingIsChecked)

      return true 
    }


    movementVerification(newPosition){
        let legalMoves=this.piece.getLegalMoves(this.map,newPosition,this.getPieces(),this.analyseCheckState())
        if(this.piece.type!="pawn") legalMoves=this.piece.flatMovesArrays(legalMoves)

        if(legalMoves==[]){
            return false
        }
        
     
        for(let el of legalMoves){
            if(newPosition[0]==el[0] && newPosition[1]==el[1]){
                return true
            }
        }
        return false
    }

    capturePiece(newPosition){
        let takedPiece=this.map[newPosition[0]][newPosition[1]]
        if(takedPiece!=null && takedPiece.color!=this.color){
        let pieceType=this.piecesDifferences[this.piece.color][takedPiece.type]
        if(pieceType){
            this.piecesDifferences[this.piece.color][takedPiece.type]["number"]+=1
        }
        else{
             pieceType={}
             pieceType["number"]=1
             pieceType["value"]=takedPiece.value
             this.piecesDifferences[this.piece.color][takedPiece.type]=pieceType
      }
        }
    }
                             
    isCheckMate(){

    }

    analyseCheckState(){
        let kingPosition=this.kingsSquares[this.color].join("")
        let pieces=this.getPieces().filter((p)=>{return p?.color!=this.color && p!=null})
        let legalMoves=[]
        let checksCounts=0
        let threats=[]
        for(let piece of pieces){

            if(piece.type=="pawn") legalMoves=piece.attackrange
            else legalMoves=piece.flatMovesArrays(piece.getLegalMoves(this.map,null,this.getPieces(),[]))

            legalMoves.forEach((p)=>{
                if(p[0]==kingPosition[0] && p[1]==kingPosition[1]){
                    checksCounts+=1
                    threats.push(this.map[piece.position[0]][piece.position[1]])
                } 
            })
        }
        this.kingIsChecked=checksCounts 
        return threats
    }    
         
    getValuesDiffernces(){
        let whitePoints=0
        let blackPoints=0
        for(let color in this.piecesDifferences){
            for(let el in this.piecesDifferences[color]){
                if(color=="white")  whitePoints+=this.piecesDifferences[color][el]["value"] * this.piecesDifferences[color][el]["number"]
                else blackPoints+=this.piecesDifferences[color][el]["value"] * this.piecesDifferences[color][el]["number"]
            }
        }
        return [whitePoints,blackPoints]
    }
  
    getPieces(){
        let pieces=[]
        for(let alph in this.map){
          for(let nb in this.map[alph]){
             pieces.push(this.map[alph][nb])
          }
        }
        return pieces
    }

}

export{Board}