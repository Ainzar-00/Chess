const imgs = {
  black: {
    bishop: "SVG No shadow/b_bishop_svg_NoShadow.svg",
    king:   "SVG No shadow/b_king_svg_NoShadow.svg",
    knight: "SVG No shadow/b_knight_svg_NoShadow.svg",
    pawn:   "SVG No shadow/b_pawn_svg_NoShadow.svg",
    queen:  "SVG No shadow/b_queen_svg_NoShadow.svg",
    rook:   "SVG No shadow/b_rook_svg_NoShadow.svg"
  },
  white: {
    bishop: "SVG No shadow/w_bishop_svg_NoShadow.svg",
    king:   "SVG No shadow/w_king_svg_NoShadow.svg",
    knight: "SVG No shadow/w_knight_svg_NoShadow.svg",
    pawn:   "SVG No shadow/w_pawn_svg_NoShadow.svg",
    queen:  "SVG No shadow/w_queen_svg_NoShadow.svg",
    rook:   "SVG No shadow/w_rook_svg_NoShadow.svg"
  }
};

function standardPiecesArrangmement(board) {
  const con = board.childNodes

  for (let i = 0; i < con.length; i++) {
    const piece = document.createElement("img")

    // Black pawns
    if (i >= 8 && i <= 15) {
      piece.src = imgs["black"]["pawn"]
      piece.classList.add("black", "pawn")
      con[i].appendChild(piece)
    }

    // White pawns
    if (i >= 48 && i <= 55) {
      piece.src = imgs["white"]["pawn"]
      piece.classList.add("white", "pawn")
      con[i].appendChild(piece)
    }

    // Black rooks
    if (i == 0 || i == 7) {
      piece.src = imgs["black"]["rook"]
      piece.classList.add("black", "rook")
      con[i].appendChild(piece)
    }

    // White rooks
    if (i == 56 || i == 63) {
      piece.src = imgs["white"]["rook"]
      piece.classList.add("white", "rook")
      con[i].appendChild(piece)
    }

    // Black knights
    if (i == 1 || i == 6) {
      piece.src = imgs["black"]["knight"]
      piece.classList.add("black", "knight")
      con[i].appendChild(piece)
    }

    // White knights
    if (i == 57 || i == 62) {
      piece.src = imgs["white"]["knight"]
      piece.classList.add("white", "knight")
      con[i].appendChild(piece)
    }

    // Black bishops
    if (i == 2 || i == 5) {
      piece.src = imgs["black"]["bishop"]
      piece.classList.add("black", "bishop")
      con[i].appendChild(piece)
    }

    // White bishops
    if (i == 58 || i == 61) {
      piece.src = imgs["white"]["bishop"]
      piece.classList.add("white", "bishop")
      con[i].appendChild(piece)
    }

    // Black queen
    if (i == 3) {
      piece.src = imgs["black"]["queen"]
      piece.classList.add("black", "queen")
      con[i].appendChild(piece)
    }

    // White queen
    if (i == 59) {
      piece.src = imgs["white"]["queen"]
      piece.classList.add("white", "queen")
      con[i].appendChild(piece)
    }

    // Black king
    if (i == 4) {
      piece.src = imgs["black"]["king"]
      piece.classList.add("black", "king")
      con[i].appendChild(piece)
    }

    // White king
    if (i == 60) {
      piece.src = imgs["white"]["king"]
      piece.classList.add("white", "king")
      con[i].appendChild(piece)
    }

  }
}

function customPiecesArrangment(board,map){
  for(let key in map){
     for(let subKey in map[key]){
          let piece=map[key][subKey]
          if(piece!=null){
               const pieceRes = document.createElement("img")
               const square=board.querySelector(`[data-x="${piece.position[0]}"][data-y="${piece.position[1]}"]`)
               pieceRes.src=imgs[piece.color][piece.type]
               pieceRes.classList.add(piece.color, piece.type)
               square.appendChild(pieceRes)
          }
     }
  }
}

function createPieceImg(piece){
  let img=document.createElement("img")
  img.style.width=40+"px"
  img.style.height=40+"px"
  img.src=imgs[piece.color][piece.type]
  img.style.width
  // img.classList.add(piece.color,piece.type)
  return img
  
}

export { standardPiecesArrangmement,customPiecesArrangment ,createPieceImg}
