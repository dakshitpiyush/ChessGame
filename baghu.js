function getValue() {
    var value = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j].length > 0) {
                value += troop_vals[board[i][j][0].getAttribute("class")][board[i][j][0].getAttribute("name")];
            }
        }
    }
    return value;
}
var troop_vals = {
    "black": {
        "king": 90, "queen": 9, "elephant": 5, "camel": 3, "horse": 3, "slder": 1
    },
    "white": {
        "king": -90, "queen": -9, "elephant": -5, "camel": -3, "horse": -3, "slder": -1
    }
};

var empty = document.getElementById("empty").children;
function donext() {
    let bestscore = -Infinity;
    var mov = { sr: "", de: "" };
    for (sour in possmov) {
        let sr_j = sour % 10;
        let sr_i = (sour - sr_j) / 10;
        if (possmov[sour].length > 0) {
            for (dests in possmov[sour]) {
                let de_j = possmov[sour][dests] % 10;
                let de_i = (possmov[sour][dests] - de_j) / 10;
                //let old_capcas = capable_castling;
                if (board[sr_i][sr_j][0].getAttribute("name") == "king") {
                    capable_castling[user]["right"] = false;
                    capable_castling[user]["left"] = false;
                }
                if (board[sr_i][sr_j][0].getAttribute("name") == "elephant") {
                    if (sr_i == capable_castling[user]["i"] && sr_j == 0) {
                        capable_castling[user]["left"] = false;
                    } else if (sr_i == capable_castling[user]["i"] && sr_j == 7) {
                        capable_castling[user]["rigth"] = false;
                    }
                }
                var temp = board[de_i][de_j];
                board[de_i][de_j] = board[sr_i][sr_j];
                board[sr_i][sr_j] = empty;
                swapuser();
                let score = minmax(false, 0);
                swapuser();
                if (score > bestscore) {
                    bestscore = score;
                    mov["sr"] = sr_i + "" + sr_j;
                    mov["de"] = de_i + "" + de_j;
                }
                board[sr_i][sr_j] = board[de_i][de_j];
                board[de_i][de_j] = temp;
                //capable_castling = old_capcas;
            }
        }
    }
    document.getElementById(mov["de"]).innerHTML = document.getElementById(mov["sr"]).innerHTML;
    document.getElementById(mov["sr"]).innerHTML = "";
    update();
    swapuser();
    possmov = getfilter(autocalculate());
}

function minmax(ismax, depth) {
    if (depth >= 3) {
        console.log(getValue());
        return getValue();
    }
    if (ismax) {
        let posmv = getfilter(autocalculate());
        let bestscore = -Infinity;
        let sur;
        for (sur in posmv) {
            let sir_j = sur % 10;
            let sir_i = (sur - sir_j) / 10;
            if (posmv[sur].length > 0) {
                let dests;
                for (dests in posmv[sur]) {
                    let de_j = posmv[sur][dests] % 10;
                    let de_i = (posmv[sur][dests] - de_j) / 10;
                    //let old_capcas = capable_castling;
                    if (board[sir_i][sir_j][0].getAttribute("name") == "king") {
                        capable_castling[user]["right"] = false;
                        capable_castling[user]["left"] = false;
                    }
                    if (board[sir_i][sir_j][0].getAttribute("name") == "elephant") {
                        if (sir_i == capable_castling[user]["i"] && sir_j == 0) {
                            capable_castling[user]["left"] = false;
                        } else if (sir_i == capable_castling[user]["i"] && sir_j == 7) {
                            capable_castling[user]["rigth"] = false;
                        }
                    }
                    var temp = board[de_i][de_j];
                    board[de_i][de_j] = board[sir_i][sir_j];
                    board[sir_i][sir_j] = empty;
                    swapuser();
                    let score = minmax(false, depth + 1);
                    swapuser();
                    bestscore = Math.max(bestscore, score);
                    board[sir_i][sir_j] = board[de_i][de_j];
                    board[de_i][de_j] = temp;
                    //capable_castling = old_capcas;
                }
            }
        }
        return bestscore;
    } else {
        let posmv = getfilter(autocalculate());
        let bestscore = Infinity;
        let sur;
        for (sur in posmv) {
            let sir_j = sur % 10;
            let sir_i = (sur - sir_j) / 10;
            if (posmv[sur].length > 0) {
                let dests;
                for (dests in posmv[sur]) {
                    let de_j = posmv[sur][dests] % 10;
                    let de_i = (posmv[sur][dests] - de_j) / 10;
                    //let old_capcas = capable_castling;
                    if (board[sir_i][sir_j][0].getAttribute("name") == "king") {
                        capable_castling[user]["right"] = false;
                        capable_castling[user]["left"] = false;
                    }
                    if (board[sir_i][sir_j][0].getAttribute("name") == "elephant") {
                        if (sir_i == capable_castling[user]["i"] && sir_j == 0) {
                            capable_castling[user]["left"] = false;
                        } else if (sir_i == capable_castling[user]["i"] && sir_j == 7) {
                            capable_castling[user]["rigth"] = false;
                        }
                    }
                    var temp = board[de_i][de_j];
                    board[de_i][de_j] = board[sir_i][sir_j];
                    board[sir_i][sir_j] = empty;
                    swapuser();
                    let score = minmax(true, depth + 1);
                    swapuser();
                    bestscore = Math.min(bestscore, score);
                    board[sir_i][sir_j] = board[de_i][de_j];
                    board[de_i][de_j] = temp;
                    //capable_castling = old_capcas;
                }
            }
        }
        return bestscore;
    }
}