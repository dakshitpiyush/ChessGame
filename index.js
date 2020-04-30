
//creating board

var possmov = [];
var board = [];
function update() {
    var cell = document.getElementsByTagName("td");
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        board[parseInt(cell[i].id)] = cell[i].children.length ? { type: cell[i].children[0].name, color: cell[i].children[0].className } : null;
    }
}
var kingpos = { white: 109, black: 4 };
var slder_offsets = {
    black: [15, 30, 14, 16, 1],
    white: [-15, -30, -14, -16, 6]
};
var other_offsets = {
    elephant: [15, -15, 1, -1],
    camel: [14, -14, 16, -16],
    queen: [15, 16, -15, -16, 1, -1, 14, -14],
    horse: [31, 29, -31, -29, 17, 13, -17, -13],
    king: [15, 16, -15, -16, 1, -1, 14, -14]
};
var attacks = [
    4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 4,
    0, 4, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0,
    0, 0, 4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 4, 0, 0,
    0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0,
    0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 4, 16, 2, 16, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 16, 13, 3, 13, 16, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 3, 0, 3, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 16, 13, 3, 13, 16, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 4, 16, 2, 16, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0,
    0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0,
    0, 0, 4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 4, 0, 0,
    0, 4, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0,
    4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 4
]
var attack_offsets = [
    16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 14,
    0, 16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 14, 0,
    0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0, 0, 14, 0, 0,
    0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 14, 0, 0, 0,
    0, 0, 0, 0, 16, 0, 0, 15, 0, 0, 14, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 16, 0, 15, 0, 14, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 16, 15, 14, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1,
    0, 0, 0, 0, 0, 0, -14, -15, -16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -14, 0, -15, 0, -16, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -14, 0, 0, -15, 0, 0, -16, 0, 0, 0, 0,
    0, 0, 0, -14, 0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0,
    0, 0, -14, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0,
    0, -14, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0,
    -14, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, 0, -16,

];
posattack = {
    queen: 6, elephant: 2, camel: 4, slder: 8, horse: 16, king: 1
}
movhistory = [];
function autocalculate(user, opponent) {
    function promote(from, to, troop, ec) {
        if (to < 8 || to > 104) {
            possmov.push({ from: from, to: to, troop: troop, promoteTo: "queen", ec: ec });
            possmov.push({ from: from, to: to, troop: troop, promoteTo: "horse", ec: ec });
        } else {
            possmov.push({ from: from, to: to, troop: troop, ec: ec });
        }
    }
    var possmov = [];
    var i, sqare;
    for (i = 0; i < 64; i++) {
        sqare = sqares[i];
        if (board[sqare] != null && board[sqare].color == user) {
            if (board[sqare].type == "slder") {
                var des_sqare = sqare + slder_offsets[user][0];
                // one sqare w/o capture
                if (board[des_sqare] !== undefined && board[des_sqare] == null) {
                    promote(sqare, des_sqare, null, 0);
                    //second sqare w/o capture
                    des_sqare = sqare + slder_offsets[user][1];
                    if (Math.floor(sqare / 15) == slder_offsets[user][4] && board[des_sqare] == null) {
                        possmov.push({ from: sqare, to: des_sqare, troop: board[des_sqare] });
                    }
                }
                //slder w capture
                for (var k = 2; k < 4; k++) {
                    des_sqare = sqare + slder_offsets[user][k];
                    if (board[des_sqare] && board[des_sqare].color == opponent) {
                        promote(sqare, des_sqare, board[des_sqare], ecoem(des_sqare, opponent));
                    }
                }
            } else {
                for (var k = 0; k < other_offsets[board[sqare].type].length; k++) {
                    var offset = other_offsets[board[sqare].type][k];
                    var des_sqare = sqare;
                    var em = ecoem(sqare, user), km = iskm(sqare, user);
                    while (true) {
                        des_sqare += offset;
                        if (board[des_sqare] === undefined)
                            break;
                        if (board[des_sqare] == null) {
                            possmov.push({
                                from: sqare,
                                to: des_sqare,
                                troop: null,
                                em: em,
                                km: km
                            });
                        } else {
                            if (board[des_sqare].color == user)
                                break;
                            possmov.push({
                                from: sqare,
                                to: des_sqare,
                                troop: board[des_sqare],
                                em: em,
                                km: km,
                                ec: ecoem(des_sqare, opponent)
                            });
                            break;
                        }
                        if (board[sqare].type == "king" || board[sqare].type == "horse")
                            break;
                    }
                }
            }
        }
    }
    lim_pos = [];
    var i;
    for (i = 0; i < possmov.length; i++) {
        docheck(possmov[i], user);
        if (!isCheck(kingpos[user], opponent))
            lim_pos.push(possmov[i]);
        undocheck(possmov[i], user);
    }
    if (!isCheck(kingpos[user], opponent)) {
        if (capable_castling[user] & 2) {
            var from = kingpos[user], to = kingpos[user] - 2;
            if (
                board[from - 1] == null
                && !isCheck(from - 1, opponent)
                && board[to] == null
                && !isCheck(to, opponent)
                && board[to - 1] == null
            )
                lim_pos.push({
                    from: from,
                    to: to,
                    troop: null,
                    castle: {
                        from: to - 2,
                        to: to + 1,
                        cc: capable_castling[user]
                    }
                });
        }
        if (capable_castling[user] & 1) {
            var from = kingpos[user], to = kingpos[user] + 2;
            if (
                board[from + 1] == null
                && !isCheck(from + 1, opponent)
                && board[to] == null
                && !isCheck(to, opponent)
            )
                lim_pos.push({
                    from: from,
                    to: to,
                    troop: null,
                    castle: {
                        from: to + 1,
                        to: to - 1,
                        cc: capable_castling[user]
                    }
                });
        }


    }

    return lim_pos;
}
function isCheck(king_pos, user) {
    var sqare;
    var i;
    for (i = 0; i < 64; i++) {
        sqare = sqares[i];
        if (board[sqare] != null && board[sqare].color == user) {
            var index = sqare - king_pos + 112;
            var troop = board[sqare];
            if (attacks[index] & posattack[troop.type]) {
                if (troop.type == "slder") {
                    if (index < 100) {
                        if (user == "black")
                            return true;
                    }
                    else {
                        if (user == "white")
                            return true;
                    }
                    continue;
                }
                if (troop.type == "horse" || troop.type == "king")
                    return true;

                var offset = attack_offsets[index];
                var mid_sqare = sqare + offset;
                var blocked = false;
                while (mid_sqare !== king_pos) {
                    if (board[mid_sqare] != null) {
                        blocked = true;
                        break;
                    }
                    mid_sqare += offset;
                }
                if (!blocked)
                    return true;
            }
        }
    }
    return false;
}
function swapuser() {
    var temp = opponent;
    opponent = user;
    user = temp;
}
//do virtual move
function doVirtual(move, user, opponent) {
    if (move.castle) {
        board[move.castle.to] = board[move.castle.from];
        board[move.castle.from] = null;
        kingpos[user] = move.to;
        capable_castling[user] = 0;
    } else {
        if (move.promoteTo) {
            board[move.from].type = move.promoteTo;
        } else {
            if (move.km) {
                capable_castling[user] = 0;
                kingpos[user] = move.to;
            } else {
                capable_castling[user] -= move.em ? move.em : 0
            }
        }
        capable_castling[opponent] -= move.ec ? move.ec : 0
    }
    board[move.to] = board[move.from];
    board[move.from] = null;
}
function undoVirtual(move, user, opponent) {
    board[move.from] = board[move.to];
    board[move.to] = move.troop;
    if (move.castle) {
        board[move.castle.from] = board[move.castle.to];
        board[move.castle.to] = null;
        kingpos[user] = move.from;
        capable_castling[user] = move.castle.cc;
    } else {
        if (move.promoteTo) {
            board[move.from].type = "slder";
        } else {
            if (move.km) {
                capable_castling[user] = move.km - 1;
                kingpos[user] = move.from;
            } else {
                capable_castling[user] += move.em ? move.em : 0
            }
        }
        capable_castling[opponent] += move.ec ? move.ec : 0
    }
}
function docheck(move, user) {
    board[move.to] = board[move.from];
    board[move.from] = null;
    if (move.km)
        kingpos[user] = move.to
}
function undocheck(move, user) {
    board[move.from] = board[move.to];
    board[move.to] = move.troop;
    if (move.km)
        kingpos[user] = move.from;
}
function getToArray(from) {
    var len = possmov.length, toArray = [];
    for (var i = 0; i < len; i++) {
        if (from == possmov[i].from)
            toArray.push(possmov[i].to);
    }
    return toArray;
}
function getMove(from, to) {
    var len = possmov.length;
    for (var i = 0; i < possmov.length; i++)
        if (from == possmov[i].from && to == possmov[i].to)
            return possmov[i];
}
function ecoem(sqare, user) {
    return pos[user]["elephant"].indexOf(sqare) + 1 & capable_castling[user];
}
function iskm(sqare, user) {
    if (sqare == kingpos[user])
        return capable_castling[user] + 1;
}
function result() {
    var isZeropos = !possmov.length;
    if (checkbit && isZeropos) {
        return "checkmate";
    } else if (isZeropos) {
        return "stillmate";
    } else {
        return null;
    }
}
var res = "";
async function doActual(move) {
    if (document.getElementsByClassName("check").length) {
        $('.check').remove();
        document.getElementById("results").innerHTML = "";
        document.getElementById("results").style.display = "none";
    }
    if (move.troop)
        new Audio("kill.wav").play();
    else
        new Audio("move.wav").play();
    if (move.castle) {
        document.getElementById(move.castle.to).innerHTML = document.getElementById(move.castle.from).innerHTML;
        document.getElementById(move.castle.from).innerHTML = null;
        board[move.castle.to] = board[move.castle.from];
        board[move.castle.from] = null;
        kingpos[user] = move.to;
        capable_castling[user] = 0;
    } else {
        if (move.promoteTo) {
            if (user == human) {
                var option_list = ["queen", "horse", "camel", "elephant"];
                var option_div = document.getElementById("choosee");
                for (value in option_list) {
                    option_div.innerHTML += "<input type='radio' id='" + option_list[value] + "' value='" + option_list[value] + "' name='choose_option' >";
                    option_div.innerHTML += "<label for='" + option_list[value] + "'><img src='icons/" + option_list[value] + "_" + user + ".png'></lable>";
                }
                for (sqare of sqares) {
                    document.getElementById(sqare).style.pointerEvents = "none";
                }
                let promise = new Promise((resolve, reject) => {
                    var choosee_box = document.getElementsByName("choose_option");
                    choosee_box[0].onclick = function () {
                        resolve(choosee_box[0].value);
                    }
                    choosee_box[1].onclick = function () {
                        resolve(choosee_box[1].value);
                    }
                    choosee_box[2].onclick = function () {
                        resolve(choosee_box[2].value);
                    }
                    choosee_box[3].onclick = function () {
                        resolve(choosee_box[3].value);
                    }
                });
                move.promoteTo = await promise;
                for (sqare of sqares) {
                    document.getElementById(sqare).style.pointerEvents = "auto";
                }
                document.getElementById("choosee").innerHTML = "";
            }
            document.getElementById(move.from).innerHTML = "<img class='" + user + "' name='" + move.promoteTo + "' src='icons/" + move.promoteTo + "_" + user + ".png'>"
            board[move.from].type = move.promoteTo;
        } else {
            if (move.km) {
                capable_castling[user] = 0;
                kingpos[user] = move.to;
            } else {
                capable_castling[user] -= move.em ? move.em : 0
            }
        }
        capable_castling[opponent] -= move.ec ? move.ec : 0
    }
    document.getElementById(move.to).innerHTML = document.getElementById(move.from).innerHTML;
    document.getElementById(move.from).innerHTML = null;
    board[move.to] = board[move.from];
    board[move.from] = null;
    movhistory.push(move);

    checkbit = isCheck(kingpos[opponent], user);
    swapuser();
    possmov = autocalculate(user, opponent);
    res = result();
    if (res == "checkmate") {
        document.getElementById("results").style.display = "block";
        audio = new Audio('mate.wav');
        audio.play();

        var khatra = document.createElement("div");
        khatra.classList.add("mate");
        document.getElementById(kingpos[user]).appendChild(khatra);
        document.getElementById("results").innerHTML = "CHECK-MATE";
    }
    else if (checkbit) {
        document.getElementById("results").style.display = "block";
        audio = new Audio('check.wav');
        audio.play();
        var khatra = document.createElement("div");
        khatra.classList.add("check");
        document.getElementById(kingpos[user]).appendChild(khatra);
        document.getElementById("results").innerHTML = "CHECK";
    } else if (res == "stillmate") {
        document.getElementById("results").style.display = "block";
        audio = new Audio('mate.wav');
        audio.play();
        document.getElementById("results").innerHTML = "STILL-MATE";
    }
    //document.documentElement.style.setProperty('--rot', user == "white" ? '0deg' : '180deg');
}
function undo() {
    if (document.getElementsByClassName("check").length) {
        $('.check').remove();
        document.getElementById("results").innerHTML = "";
        document.getElementById("results").style.display = "none";
    }
    var move = movhistory.pop();
    if (!move)
        return null;
    document.getElementById(move.from).innerHTML = document.getElementById(move.to).innerHTML;
    document.getElementById(move.to).innerHTML = move.troop ? "<img class='" + move.troop.color + "' name='" + move.troop.type + "' src='icons/" + move.troop.type + "_" + move.troop.color + ".png' draggable='true' ondragstart='markPossible(this.parentElement)'>" : null;
    board[move.from] = board[move.to];
    board[move.to] = move.troop;
    swapuser();
    if (move.castle) {
        document.getElementById(move.castle.from).innerHTML = document.getElementById(move.castle.to).innerHTML;
        document.getElementById(move.castle.to).innerHTML = '';
        board[move.castle.from] = board[move.castle.to];
        board[move.castle.to] = null;
        kingpos[user] = move.from;
        capable_castling[user] = move.castle.cc;
    } else {
        if (move.promoteTo) {
            document.getElementById(move.from).innerHTML = "<img class='" + user + "' name='slder' src='icons/slder_" + user + ".png'>"
            board[move.from].type = "slder";
        } else {
            if (move.km) {
                capable_castling[user] = move.km - 1;
                kingpos[user] = move.from;
            } else {
                capable_castling[user] += move.em ? move.em : 0
            }
        }
        capable_castling[opponent] += move.ec ? move.ec : 0
    }

    checkbit = isCheck(kingpos[opponent], user);
    possmov = autocalculate(user, opponent);
    if (checkbit) {
        document.getElementById("results").style.display = "block";
        audio = new Audio('check.wav');
        audio.play();
        var khatra = document.createElement("div");
        khatra.classList.add("check");
        document.getElementById(kingpos[user]).appendChild(khatra);
        document.getElementById("results").innerHTML = "CHECK";
    }
    //document.documentElement.style.setProperty('--rot', user == "white" ? '360deg' : '180deg');
    return move;
}
update();
possmov = autocalculate(user, opponent);
var currentTroop;
async function markPossible(source) {
    if (source.children.length > 0 && source.lastChild.classList[0] == "dot") {
        while (document.getElementsByClassName("dot").length > 0) {
            $('.dot').remove();
        }
        var move = getMove(currentTroop, parseInt(source.id));
        doActual(move);
        currentTroop = '';
        if (res == null && user == ai) {
            setTimeout(function () { donext() }, 0);
        }

    }
    else {
        if (document.getElementsByClassName("dot").length > 0) {
            $('.dot').remove();
        }
        currentTroop = parseInt(source.id);
        var toArray = getToArray(currentTroop);
        for (var i = 0; i < toArray.length; i++) {
            var high = document.createElement("div");
            high.classList.add("dot");
            document.getElementById(toArray[i]).appendChild(high);
        }
    }
}