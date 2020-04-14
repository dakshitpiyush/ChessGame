var sqares = [];
var cboard = document.getElementById('chessboard');
for (var i = 0; i < 8; i++) {
    cboard.innerHTML += "<tr id='row" + i + "'></tr>";
    for (var j = 0; j < 8; j++) {
        var sqare = i * 10 + j;
        sqares.push(sqare);
        document.getElementById('row' + i).innerHTML += '<td class="cell" id="' + sqare + '" onclick="markPossible(this)" ondrop="markPossible(this)" ondragover="event.preventDefault();"></td>';
        document.getElementById(sqare).style.backgroundColor = ((i % 2 == 0 && j % 2 == 1) || (i % 2 == 1 && j % 2 == 0)) ? "#7f5733" : "#fff1e5";
    }
}
var capable_castling = {
    white: {
        right: true,
        left: true
    },
    black: {
        right: true,
        left: true
    }
};
//setting position of troop
var ind = 0, jnd = 0;
var pos = {
    black: {
        elephant: [0, 7],
        horse: [1, 6],
        camel: [2, 5],
        queen: [3],
        king: ['4'],
        slder: [10, 11, 12, 13, 14, 15, 16, 17]
    },
    white: {
        elephant: [70, 77],
        horse: [71, 76],
        camel: [72, 75],
        queen: [73],
        king: [74],
        slder: [60, 61, 62, 63, 64, 65, 66, 67]
    }

};
//place troops in it's place
for (color in pos) {
    for (elem in pos[color]) {
        for (value in pos[color][elem]) {
            document.getElementById(pos[color][elem][value]).innerHTML = "<img class='" + color + "' name='" + elem + "' src='icons/" + elem + "_" + color + ".png' draggable='true' ondragstart='markPossible(this.parentElement)'>";
        }
    }
}
var human = "white", ai = "black";
var user = human, checkbit = false;