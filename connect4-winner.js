function connect4Winner(player, board) {
    let winner = false

    //check horizontal wins
 
    board.forEach(row => {
      let tokenCount = 0  
      row.forEach(cellValue => {
        if (cellValue == player) {
            tokenCount++
        } else {
            tokenCount = 0
        }
        if (tokenCount == 4) {
            winner = true
        }
      })
    })    

    //check vertical wins

    board[0].forEach((col, colIndex) => {
        let tokenCount = 0  
        board.forEach((row) => {
            if (row[colIndex] == player) {
                tokenCount++
            } else {
                tokenCount = 0
            }
            if (tokenCount == 4) {
                winner = true
            }
        })    
    })


    //check diagonal

    for (let b = 0; b<6; b++) {
        board[b].forEach((col, colIndex) => {
            let tokenCount = 0  
            board.slice(b).forEach((row, rowIndex) => {
                if (row[colIndex] == player) {
                    tokenCount++
                } else {
                    tokenCount = 0
                }
                if (tokenCount == 4) {
                    winner = true
                }
                colIndex++
            })    
        })
    }

    reversedBoard = board.map(row => row.reverse());

    for (let b = 0; b<6; b++) {
        reversedBoard[b].forEach((col, colIndex) => {
            let tokenCount = 0  
            reversedBoard.slice(b).forEach((row, rowIndex) => {
                if (row[colIndex] == player) {
                    tokenCount++
                } else {
                    tokenCount = 0
                }
                if (tokenCount == 4) {
                    winner = true
                }
                colIndex++
            })    
        })
    }

    return winner
}

