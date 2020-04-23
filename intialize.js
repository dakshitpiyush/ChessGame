var sqares = [
    0, 1, 2, 3, 4, 5, 6, 7,
    15, 16, 17, 18, 19, 20, 21, 22,
    30, 31, 32, 33, 34, 35, 36, 37,
    45, 46, 47, 48, 49, 50, 51, 52,
    60, 61, 62, 63, 64, 65, 66, 67,
    75, 76, 77, 78, 79, 80, 81, 82,
    90, 91, 92, 93, 94, 95, 96, 97,
    105, 106, 107, 108, 109, 110, 111, 112
];
var cboard = document.getElementById('chessboard');
for (sqare of sqares) {
    if (sqare % 15 == 0) {
        var i = sqare / 15;
        cboard.innerHTML += "<tr id='row" + i + "'></tr>";
    }
    document.getElementById('row' + i).innerHTML += '<td class="cell" id="' + sqare + '" onclick="markPossible(this)" ondrop="markPossible(this)" ondragover="event.preventDefault();"></td>';
    document.getElementById(sqare).style.backgroundColor = sqare % 2 == 1 ? "#7f5733" : "#fff1e5";
}
var capable_castling = {
    white: 3,
    black: 3
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
        slder: [15, 16, 17, 18, 19, 20, 21, 22]
    },
    white: {
        elephant: [105, 112],
        horse: [106, 111],
        camel: [107, 110],
        queen: [108],
        king: [109],
        slder: [90, 91, 92, 93, 94, 95, 96, 97]
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
var user = "white", opponent = "black";
var checkbit = false;