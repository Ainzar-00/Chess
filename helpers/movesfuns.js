let alphabet=["a","b","c","d","e","f","g","h"] 

function crossMove(ranges,x,y,position){
          
            ranges.leftRow = alphabet.slice(0, x).map(el => [el, y]).reverse()


            ranges.rightRow = alphabet.slice(x + 1).map(el => [el, y])

            for (let i = 0; i < 8; i++) {
                if (8 - i > y) ranges.topCol.unshift([alphabet[x], 8 - i])
                else if (8 - i < y)ranges.bottomCol.push([alphabet[x], 8 - i])
            }
            return ranges
}

function diagonalMove(ranges,x,y){
    let plus=y
    let minus=y
     alphabet.slice(x+1).forEach(el=>{
            if(plus<8){
            plus+=1
            ranges.toprightdiag.push([el,plus])
            }
            if(minus-1>0){
                minus-=1
                ranges.bottomrightdiag.push([el,minus])
            }
        })
        plus=y
        minus=y
        alphabet.slice(0,x).reverse().forEach(el=>{
            if(plus<8){
               plus+=1
               ranges.topleftdiag.push([el,plus]) 
            }
        
            if(minus-1>0){
                minus-=1
                ranges.bottomleftdiag.push([el,minus])
            }
        })
        return ranges
}


export{crossMove,diagonalMove}