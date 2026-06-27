import { Board } from "./Models/Board.js"
import { createPieceImg } from "./UI/piecesResArrange.js"
import { Indicators } from "./UI/indicatorsfuns.js"
import {pawn,queen,rook,knight,bishop,king} from "./Models/piecesModel.js"

class chessGame{
        #board
        constructor(){
            this.#board = new Board()
        }

startStandardGame(){
    this.#board.CreateStandardBoard()
}

selectPiece(x,y){
  return this.#board.selectPiece(x,y)
}

movePieceTo(x,y){
    return this.#board.movePieceTo([x,y])
}

getMap(){
    return this.#board.map
}

isCheckMate(){
    return this.#board.checkMate
}

getPiece(x,y){
    return this.#board.map[x][y]
}

isSelected(){
    return this.#board.piece
}





















startCustomGame(){
    
const W = "white";
const B = "black";

const P = (c, pos,fM=true) => new pawn("pawn", 1, c, pos, fM);
const R = (c, pos) => new rook("rook", 5, c, pos);
const N = (c, pos) => new knight("knight", 3, c, pos);
const Bp = (c, pos) => new bishop("bishop", 3, c, pos);
const Q = (c, pos) => new queen("queen", 9, c, pos);
const K = (c, pos) => new king("king", 0, c, pos);




// const map = {
//   a: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null},
//   b: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null},
//   c: {1: null, 2: K(W, ["c",2]), 3: null, 4: Q(W, ["c",4]), 5: null, 6: R(B, ["c",6]), 7: null, 8: K(B, ["c",8])},
//   d: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null},
//   e: {1: null, 2: null, 3: null, 4:  null, 5: null, 6: null, 7: null, 8: null},
//   f: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null},
//   g: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null},
//   h: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: Bp(B, ["h",7]), 8: null}
// };

const map = {
  a: {1: R(W, ["a",1]), 2: P(W, ["a",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["a",7]), 8: R(B, ["a",8])},
  b: {1: N(W, ["b",1]), 2: P(W, ["b",2]), 3: null, 4: Q(B, ["b",4]), 5: null, 6: null, 7: P(B, ["b",7]), 8: N(B, ["b",8])},
  c: {1: Bp(W, ["c",1]), 2: P(W, ["c",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["c",7]), 8: Bp(B, ["c",8])},
  d: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: P(B, ["d",7]), 8: null},
  e: {1: K(W, ["e",1]), 2: P(W, ["e",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["e",7]), 8: K(B, ["e",8])},
  f: {1: Bp(W, ["f",1]), 2: P(W, ["f",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["f",7]), 8: Bp(B, ["f",8])},
  g: {1: N(W, ["g",1]), 2: P(W, ["g",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["g",7]), 8: N(B, ["g",8])},
  h: {1: R(W, ["h",1]), 2: P(W, ["h",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["h",7]), 8: R(B, ["h",8])}
};

// const map = {
//   a: {1: R(W, ["a",1]), 2: P(W, ["a",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["a",7]), 8: R(B, ["a",8])},
//   b: {1: N(W, ["b",1]), 2: P(W, ["b",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["b",7]), 8: N(B, ["b",8])},
//   c: {1: Bp(W, ["c",1]), 2: P(W, ["c",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["c",7]), 8: Bp(B, ["c",8])},
//   d: {1: Q(W, ["d",1]), 2: P(W, ["d",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["d",7]), 8: Q(B, ["d",8])},
//   e: {1: K(W, ["e",1]), 2: P(W, ["e",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["e",7]), 8: K(B, ["e",8])},
//   f: {1: Bp(W, ["f",1]), 2: P(W, ["f",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["f",7]), 8: Bp(B, ["f",8])},
//   g: {1: N(W, ["g",1]), 2: P(W, ["g",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["g",7]), 8: N(B, ["g",8])},
//   h: {1: R(W, ["h",1]), 2: P(W, ["h",2]), 3: null, 4: null, 5: null, 6: null, 7: P(B, ["h",7]), 8: R(B, ["h",8])}
// };




    this.#board.CreateCustomBoard(map,{"white":["e",1],"black":["e",8]})
}


}


export{chessGame}


