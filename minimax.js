function getValue() {
    var value = 0, i, sqare;
    for (i = 0; i < 120; i++) {
        if (board[i])
            value += troop_vals[board[i].color][board[i].type];
    }
    return value;
}
var troop_vals = {
    black: {
        king: 90, queen: 9, elephant: 5, camel: 3, horse: 3, slder: 1
    },
    white: {
        king: -90, queen: -9, elephant: -5, camel: -3, horse: -3, slder: -1
    }
};
var mesure = 0;
function donext() {
    var bestscore = -Infinity;
    var bestmove;
    for (var move of possmov) {
        doVirtual(move, user, opponent);
        var score = minmax(false, 3, opponent, user);
        if (score > bestscore) {
            bestscore = score;
            bestmove = move;
        }
        //console.log(move);
        //console.log(score);
        undoVirtual(move, user, opponent);
    }
    console.log(mesure + "moves tested");
    mesure = 0;
    doActual(bestmove);
}
function minmax(ismax, depth, user, opponent) {
    mesure++;
    if (depth == 0) {
        return getValue();
    }
    if (ismax) {
        var posmv = autocalculate(user, opponent);
        var bestscore = -9999, score;
        for (var move of posmv) {
            doVirtual(move, user, opponent);
            score = minmax(false, depth - 1, opponent, user);
            undoVirtual(move, user, opponent);
            //console.log(move);
            //console.log(score);
            bestscore = Math.max(score, bestscore);
        }
    } else {
        var posmv = autocalculate(user, opponent);
        var bestscore = 9999, score;
        for (var move of posmv) {
            doVirtual(move, user, opponent);
            score = minmax(true, depth - 1, opponent, user);
            undoVirtual(move, user, opponent);
            //console.log(move);
            //console.log(score);
            bestscore = Math.min(score, bestscore);
        }
    }
    return bestscore;
}

