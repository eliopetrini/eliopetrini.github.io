let state = {
    board: [
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ]
    ],
    activeColor: "r"
   }




function elt (type, attrs, ...children) {
    let node = document.createElement(type)
    Object.keys(attrs).forEach(key => {
    node.setAttribute(key, attrs[key])
    })
    for (let child of children) {
    if (typeof child != "string") node.appendChild(child)
    else node.appendChild(document.createTextNode(child))
    }
    return node
}

function showBoard() {
    const boardContainer = document.querySelector(".board");
    boardContainer.innerHTML = "";
    state.board.forEach(row => {
        row.reverse()
      row.forEach(cellValue => {
        boardContainer.appendChild(createBoardCell(cellValue));
      });
    });
    updateCurrentPlayer()
}


function createBoardCell(value) {
    const piece =
    value === "r"
      ? elt("div", { class: "red piece" }, "")
      : value === "b"
      ? elt("div", { class: "blue piece" }, "")
      : null;
    
    let returnNode = elt("div", { class: "field" }, ...(piece ? [piece] : []))

    if (piece == null) {
        function handleCellClick(event) {
            //need to find which column i'm at
            const cells = Array.from(document.querySelector(".board").children)
            const index = cells.indexOf(event.target)
            const column = 6-index%7
            let updatedeCell = setPieceOnCell(returnNode, column);
            updatedeCell.removeEventListener("mousedown", handleCellClick);
        }
        returnNode.addEventListener("mousedown", handleCellClick)
    }    
    return returnNode;
}

function setPieceOnCell(returnNode,column) {
    let currentColor = state.activeColor
    let piece
    if (currentColor === "r") {
        piece = elt("div", { class: "red piece" }, "")
        state.activeColor = "b"
    } else if (currentColor === "b") {
        piece = elt("div", { class: "blue piece" }, "")
        state.activeColor = "r"
    }
    updateCurrentPlayer()  
    let cellToBeUpdated = findNextFreeCellInColumn(returnNode, column, currentColor)
    cellToBeUpdated.appendChild(piece)
    return cellToBeUpdated
}

function findNextFreeCellInColumn(cell, column, currentColor) {
    let cellToBeUpdated
    const cells = Array.from(document.querySelector(".board").children)
    for (let row = state.board.length-1; row >= 0; row--) {
       if (state.board[row][column] == "") {
            state.board[row][column] = currentColor
            let cellDivIndex = (row)*7+(6-column)
            cellToBeUpdated = cells[cellDivIndex]
            break;
       }
    }
    return cellToBeUpdated
}

function resetBoard() {
    state.board = Array(6).fill('').map(el => Array(7).fill(''))
    showBoard()
}

function updateCurrentPlayer() {
    if (state.activeColor === "r") {
        document.querySelector(".whosturn").innerHTML = "Red player's turn"
    } else {
        document.querySelector(".whosturn").innerHTML = "Blue player's turn"
    }

}