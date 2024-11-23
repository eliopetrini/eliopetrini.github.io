let state = {
    board: [
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', 'b', '', '', '', '', '' ],
    [ '', 'r', '', 'b', '', '', '' ]
    ]
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
}


function createBoardCell(value) {
    const piece =
    value === "r"
      ? elt("div", { class: "red piece" }, "")
      : value === "b"
      ? elt("div", { class: "blue piece" }, "")
      : null;
  return elt("div", { class: "field" }, ...(piece ? [piece] : []));
}