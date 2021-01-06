function getValue() {
    var value = 0, i;
    for (i = 0; i < 120; i++) {
        if (board[i])
            value += troop_vals[board[i].color][board[i].type];
    }
    return value;
}
var troop_vals = {};

var mesure = 0;
function donext() {
    var bestscore = -Infinity;
    var bestmove;
    for (var move of possmov) {
        doVirtual(move, user, opponent);
        var score = minmax(false, 3, opponent, user, bestscore, 10000);
        if (score > bestscore) {
            bestscore = score;
            bestmove = move;
        }
        undoVirtual(move, user, opponent);
    }
    console.log(mesure + "moves tested");
    mesure = 0;
    doActual(bestmove);
}
function minmax(ismax, depth, user, opponent, alpha, beta) {
    mesure++;
    if (depth == 0) {
        return getValue();
    }
    if (ismax) {
        var posmv = autocalculate(user, opponent);
        var bestscore = -9999, score;
        for (var move of posmv) {
            doVirtual(move, user, opponent);
            bestscore = Math.max(minmax(false, depth - 1, opponent, user, alpha, beta), bestscore);
            undoVirtual(move, user, opponent);
            alpha = Math.max(alpha, bestscore);
            if (beta <= alpha) {
                return bestscore;
            }
        }
    } else {
        var posmv = autocalculate(user, opponent);
        var bestscore = 9999, score;
        for (var move of posmv) {
            doVirtual(move, user, opponent);
            bestscore = Math.min(minmax(true, depth - 1, opponent, user, alpha, beta), bestscore);
            undoVirtual(move, user, opponent);
            beta = Math.min(beta, bestscore);
            if (beta <= alpha) {
                return bestscore;
            }
        }
    }
    return bestscore;
}