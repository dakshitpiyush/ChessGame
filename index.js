//creating board

var possmov = [];
var board = [];
function update() {
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        board[parseInt(document.getElementsByTagName("td")[i].id)] = document.getElementsByTagName("td")[i].children.length > 0 ? { type: document.getElementsByTagName("td")[i].children[0].name, color: document.getElementsByTagName("td")[i].children[0].className } : null;

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
attacks = [
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
attack_offsets = [
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
                && isCheck(from - 1, opponent)
                && board[to] == null
                && isCheck(to, opponent)
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
                && isCheck(from + 1, opponent)
                && board[to] == null
                && isCheck(to, opponent)
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
function undo(move, user, opponent) {
    board[move.from] = board[move.to];
    board[move.to] = move.troop;
    if (move.castle) {
        board[move.castle.from] = board[move.castle.to];
        board[move.castle.to] = null;
        capabale_castling[user] = move.castle.cc;
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
function ecoem(sqare, user) {
    return pos[user]["elephant"].indexOf(sqare) + 1 & capable_castling[user];
}
function iskm(sqare, user) {
    if (sqare == kingpos[user])
        return capable_castling[user] + 1;
}
update();
possmov = autocalculate(user, opponent);
var currenttroop = '';
var cboard = document.getElementById('chessboard');
async function markPossible(source) {
    if (source.children.length > 0 && source.lastChild.classList[0] == "dot") {
        if (document.getElementsByClassName("check").length > 0) {
            $('.check').remove();
            document.getElementById("results").innerHTML = "";
            document.getElementById("results").style.display = "none";
        }
        if (source.firstChild == source.lastChild) {
            new Audio("move.wav").play();
        } else {
            new Audio("kill.wav").play();
        }

        source.innerHTML = currenttroop.innerHTML;
        currenttroop.innerHTML = '';
        var from = parseInt(currenttroop.id);
        var to = parseInt(source.id);

        while (document.getElementsByClassName("dot").length > 0) {
            $('.dot').remove();
        }
        if (source.children[0].name == "king") {
            if (from - to == 2) {
                document.getElementById(to + 1).innerHTML = document.getElementById(to - 2).innerHTML
                document.getElementById(to + 1).innerHTML = "";
            } else if (from - to == -2) {
                document.getElementById(to + 1).innerHTML = document.getElementById(to - 1).innerHTML
                document.getElementById(to + 1).innerHTML = "";
            }
        }

        if (source.children[0].name == "slder") {
            if (to < 8 || to > 67) {
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
                    document.getElementsByName("choose_option")[0].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[0].value);
                    }
                    document.getElementsByName("choose_option")[1].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[1].value);
                    }
                    document.getElementsByName("choose_option")[2].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[2].value);
                    }
                    document.getElementsByName("choose_option")[3].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[3].value);
                    }
                });
                let selection = await promise;
                for (sqare of sqares) {
                    document.getElementById(sqare).style.pointerEvents = "auto";
                }
                source.innerHTML = "<img class='" + user + "' name='" + selection + "' src='icons/" + selection + "_" + user + ".png'>"
                document.getElementById("choosee").innerHTML = "";

            }
        }

        doVirtual({ from: from, to: to });
        currenttroop = '';
        checkbit = isCheck(kingpos[opponent], user);
        swapuser();
        possmov = autocalculate(user, opponent);
        var res = result();
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
        if (user == ai) {
            document.getElementById("chessboard").style.transform = "rotate(180deg)";
            for (els in document.getElementsByClassName("cell")) {
                if (els < 64) {
                    document.getElementsByClassName("cell")[els].style.transform = "rotate(180deg)";
                }
            }
        } else {
            document.getElementById("chessboard").style.transform = "rotate(360deg)";
            for (els in document.getElementsByClassName("cell")) {
                if (els < 64) {
                    document.getElementsByClassName("cell")[els].style.transform = "rotate(0deg)";
                }
            }
        }
        if (res == null && user == ai)
            donext();

    }
    else {
        if (document.getElementsByClassName("dot").length > 0) {
            $('.dot').remove();
        }
        var toArray = getToArray(parseInt(source.id));
        currenttroop = source;
        for (var i = 0; i < toArray.length; i++) {
            var high = document.createElement("div");
            high.classList.add("dot");
            document.getElementById(toArray[i]).appendChild(high);
        }
    }
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

function doActual(move) {
    markPossible(document.getElementById(move.from));
    markPossible(document.getElementById(move.to));
}
